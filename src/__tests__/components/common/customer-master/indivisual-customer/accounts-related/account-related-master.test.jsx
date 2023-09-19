import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { AccountRelatedMaster } from '@components/common/CustomerMaster/IndividualCustomer/AccountRelated/AccountRelatedMaster';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('store/actions/data/customerMaster/indivisualAccountRelated', () => ({
    indivisualAccountsRelatedDataActions: {},
}));

const props = {
    formActionType: { addMode: false, editMode: true, viewMode: false },
    selectedCustomerId: 'CUS1687508619061',
    handleButtonClick: jest.fn(),
    NEXT_ACTION: jest.fn(),
    onCloseAction: jest.fn(),
    saveButtonName: 'Save & Next',
    isLoadingOnSave: 'undefined',
    handleButtonClick: jest.fn(),
    resetData: jest.fn(),
    isLastSection: false,
    isLoading: false,
    isDataLoaded: false,
    saveData: jest.fn(),
    listShowLoading: jest.fn(),
    fetchList: jest.fn(),
    userId: '123',
    section: { enableOnAdd: false, id: 5, title: 'Account Related' },

    accountData: { creditAmount: 11, creditDays: 11, customerCreditId: '1b27160e-856d-4e45-8036-39847206bf1b', customerId: 'CUS1694080366163', labourDiscount: 11, outstandingAmount: 11, partsDiscount: 11, remarks: '', vipDealerInd: true },

    record: { chassisNumber: null, customerId: 'CUS1687368732514', customerName: 'Company1', customerType: 'CRP', customerTypeName: 'CORPORATE', dateOfBirth: null, emailId: 'abhishek@gm.co', membershipType: 'SL', membershipTypeName: 'Silver', mobileNumber: '9778675564', profilePicDocId: null, registrationNumber: null },
};

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <AccountRelatedMaster form={form} {...props} />;
};

describe('AccountRelated Master  Component', () => {
    const defaultBtnVisiblity = {
        editBtn: true,
        saveBtn: true,
        cancelBtn: true,
        saveAndNewBtn: true,
        saveAndNewBtnClicked: true,
        closeBtn: true,
        formBtnActive: true,
        cancelOTFBtn: true,
        transferOTFBtn: true,
        allotBtn: true,
        unAllotBtn: true,
        invoiceBtn: true,
        deliveryNote: true,
        changeHistory: true,
    };
    it('should render AccountRelated Master ', async () => {
        customRender(<FormWrapper {...props} />);
    });

    it('should render Label Text', async () => {
        customRender(<FormWrapper {...props} onError={jest.fn()} showGlobalNotification={jest.fn()} />);

        const renderText = screen.getByText('Account Related');
        expect(renderText).toBeTruthy();

        const creditText = screen.getByText('Credit Limit');
        expect(creditText).toBeTruthy();

        const limitDays = screen.getByText('Credit Limit Days');
        expect(limitDays).toBeTruthy();

        const outstandingText = screen.getByText('Outstanding Amount');
        expect(outstandingText).toBeTruthy();

        const partDiscount = screen.getByText('Parts Discount %');
        expect(partDiscount).toBeTruthy();

        const labourDiscount = screen.getByText('Labour Discount %');
        expect(labourDiscount).toBeTruthy();

        const remarks = screen.getByText('Remarks');
        expect(remarks).toBeTruthy();
    });
    it('cancel button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} buttonData={defaultBtnVisiblity} showGlobalNotification={jest.fn()} onError={jest.fn()} onCloseAction={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );

        const cancelBtn = screen.getByRole('button', { name: /close/i });
        fireEvent.click(cancelBtn);
    });
    it('save button should work with on finish', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} onSuccessAction={jest.fn()} showGlobalNotification={jest.fn()} onError={jest.fn()} buttonData={defaultBtnVisiblity} onCloseAction={jest.fn()} resetData={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFieldsChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
            </Provider>
        );
        const laborDisc = screen.getByRole('textbox', { name: /labour discount %/i });
        fireEvent.change(laborDisc, { target: { value: '1221' } });

        const saveBtn = screen.getByRole('button', { name: 'loading Save & Next', exact: false });
        fireEvent.click(saveBtn);
    });

    it('should validate fields on finish failed', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} buttonData={defaultBtnVisiblity} showGlobalNotification={jest.fn()} onError={jest.fn()} onCloseAction={jest.fn()} resetData={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFieldsChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
            </Provider>
        );
        const addBtn = screen.getByRole('button', { name: 'Edit', exact: false });
        fireEvent.click(addBtn);

        const exchangeValue = screen.getByRole('textbox', { name: 'Labour Discount %', exact: false });
        fireEvent.change(exchangeValue, { target: { value: '2020-05-24' } });
        fireEvent.click(exchangeValue);

        const saveBtn = screen.getByRole('button', { name: 'loading Save & Next', exact: false });
        fireEvent.click(saveBtn);
    });

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CustomerMaster: {
                    IndivisualAccounts: { isLoaded: true, data: [{ creditAmount: 11, creditDays: 11, customerCreditId: '1b27160e-856d-4e45-8036-39847206bf1b', customerId: 'CUS1694080366163', labourDiscount: 11, outstandingAmount: 11, partsDiscount: 11, remarks: '', vipDealerInd: true }] },
                },
            },
        });

        const saveData = jest.fn();
        const res = { data: [{ customerId: 'CUS1694080366163' }] };

        customRender(
            <Provider store={mockStore}>
                <FormWrapper saveData={saveData} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={defaultBtnVisiblity} setButtonData={jest.fn()} />
            </Provider>
        );

        const editBtn = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);

        const status = screen.getByRole('textbox', { name: /Credit Limit Days/i });
        fireEvent.change(status, { target: { value: '121' } });

        const saveBtn = screen.getByRole('button', { name: /Save & Next/i });
        fireEvent.click(saveBtn);

        await waitFor(() => expect(saveData).toHaveBeenCalled());
        saveData.mock.calls[0][0].onSuccess(res);
    });
});

describe('Component render when viewmode is true', () => {
    it('should render addedit page', async () => {
        const props = { formActionType: { viewMode: true } };
        customRender(<AccountRelatedMaster {...props} resetData={jest.fn()} />);
    });
});
