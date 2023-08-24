import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import FinananceDetailsMaster from '@components/Sales/OTF/FinananceDetails/FinananceDetailsMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <FinananceDetailsMaster form={form} {...props} />;
};

const props = {
    saveData: jest.fn(),
    resetData: jest.fn(),
    fetchList: jest.fn(),
    listShowLoading: jest.fn(),
    financeData: { branch: 'Ram', doDate: null, doNumber: null, doReceived: '9001', emi: 981, fileNumber: 'a1mN0000004R5nJIAS', financeDone: 'Deal', financier: null, financierCode: 'Ram', id: '3c2078d1-eedd-463a-b104-1bff2208a31f', loanAmount: 2000.9, otfNumber: 'OTF1690455272392' },
    isFinanceLovDataLoaded: true,
    setFormActionType: jest.fn(),
    isFinanceLovLoading: undefined,
    FinanceLovData: {
        key: 'FI002',
        parentKey: null,
        value: 'HDFC',
    },
    fetchFinanceLovList: jest.fn(),
    listFinanceLovShowLoading: jest.fn(),
    section: { displayOnList: true, id: 6, title: 'Finance Details' },
    isLoading: false,
    handleFormValueChange: jest.fn(),
    handleButtonClick: jest.fn(),
    NEXT_ACTION: jest.fn(),
};

describe('OTF finance view Details render', () => {
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

    it('finance form input should work', () => {
        const prop2 = { formActionType: { viewMode: false } };
        customRender(<FormWrapper setFormData={jest.fn} {...prop2} />);

        const bookedScreen = screen.getByText('Booked');
        expect(bookedScreen).toBeTruthy();

        const allotedScreen = screen.getByText('Allotted');
        expect(allotedScreen).toBeTruthy();

        const comboBox1 = screen.getByRole('combobox', { name: 'Financier' });
        expect(comboBox1).toBeTruthy();

        const comboBox2 = screen.getByRole('combobox', { name: 'D.O. Received' });
        expect(comboBox2).toBeTruthy();

        const branch = screen.getByRole('textbox', { name: 'Branch' });
        fireEvent.change(branch, { target: { value: 'delhi' } });
        expect(branch).toBeTruthy();

        const fileNo = screen.getByRole('textbox', { name: 'File Number' });
        fireEvent.change(fileNo, { target: { value: 'F0101' } });
        expect(fileNo).toBeTruthy();

        const loanAmt = screen.getByRole('textbox', { name: 'Loan Amount' });
        fireEvent.change(loanAmt, { target: { value: '12' } });
        expect(loanAmt).toBeTruthy();

        const emi = screen.getByRole('textbox', { name: 'EMI' });
        fireEvent.change(emi, { target: { value: '121' } });
        expect(emi).toBeTruthy();
    });
    it('should render when view mode is true', async () => {
        const prop2 = { formActionType: { viewMode: true } };
        customRender(<FormWrapper setFormData={jest.fn} {...prop2} />);
    });

    it('cancel button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} buttonData={defaultBtnVisiblity} onCloseAction={jest.fn()} />
            </Provider>
        );

        const cancelBtn = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(cancelBtn);
    });

    it('save button should work with on finish', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} buttonData={defaultBtnVisiblity} setButtonData={jest.fn()} onCloseAction={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFieldsChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
            </Provider>
        );
        const addBtn = screen.getByRole('textbox', { name: 'EMI', exact: false });
        fireEvent.change(addBtn, { target: { value: '1221' } });

        const saveBtn = screen.getByRole('button', { name: 'Save & Next', exact: false });
        fireEvent.click(saveBtn);
    });
});
