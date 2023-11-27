import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { OtfDetailsMaster } from 'components/Sales/Common/OtfDetails/OtfDetailsMaster';
import customRender from '@utils/test-utils';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';

jest.mock('store/actions/data/otf/otf', () => ({
    otfDataActions: {},
}));

beforeEach(() => {
    jest.clearAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myMoock = {
        ...form,
        validateFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
    };
    return <OtfDetailsMaster form={myMoock} {...props} />;
};

const props = {
    formActionType: { addMode: false, editMode: false, viewMode: true },
    listConsultantShowLoading: jest.fn(),
    showGlobalNotification: jest.fn(),
    section: { displayOnList: true, id: 1, title: 'Booking Details' },
    fetchOTFDetail: jest.fn(),
    listShowLoading: jest.fn(),
    isDataLoaded: true,
    otfData: { bookingAmount: 1220000, cpd: null, custExpectedDeliveryDate: '2023-07-31', customerType: 'IND', deliveryAt: 'OFC', exchange: null, financeArrangedBy: 'DEL', id: 'b6ca071c-476b-42e1-95bf-5fa52ced42b1', initialPromiseDeliveryDate: '2023-07-04', loyaltyScheme: null, mitraName: null, mitraType: null, mobileNumber: '8096377837', modeOfPAyment: 'card', otfDate: null, otfNumber: 'OTF1690806304088', placeOfRegistration: '', priceType: 'I/C', referral: 'N', saleConsultant: 'WUGST', saleType: 'WUGST', specialRequest: '', userProfilePicDocId: '' },
    saveData: { bookingAmount: 1220000, cpd: null, custExpectedDeliveryDate: '2023-07-31', customerType: 'IND', deliveryAt: 'OFC', exchange: null, financeArrangedBy: 'DEL', id: 'b6ca071c-476b-42e1-95bf-5fa52ced42b1', initialPromiseDeliveryDate: '2023-07-04', loyaltyScheme: null, mitraName: null, mitraType: null, mobileNumber: '8096377837', modeOfPAyment: 'card', otfDate: null, otfNumber: 'OTF1690806304088', placeOfRegistration: '', priceType: 'I/C', referral: 'N', saleConsultant: 'WUGST', saleType: 'WUGST', specialRequest: '', userProfilePicDocId: '' },
    isLoading: false,
    selectedOrderId: 'OTF1690806304088',
    handleFormValueChange: jest.fn(),
    fetchSalesConsultant: jest.fn(),
    salesConsultantLov: { key: 'G3N21109', parentKey: 'GTA01', value: 'AJIT KUMAR SINGH' },
    isSalesConsultantDataLoaded: true,
    NEXT_ACTION: jest.fn(),
    handleButtonClick: jest.fn(),
};

describe('AddEdit Component render', () => {
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
    it('should render addedit page', async () => {
        customRender(<OtfDetailsMaster {...props} typeData={('SALE_TYP', 'PRC_TYP')} buttonData={defaultBtnVisiblity} setWorkFlowDetails={jest.fn()} />);
    });

    it('should render text components', async () => {
        customRender(<OtfDetailsMaster {...props} typeData={('SALE_TYP', 'PRC_TYP')} setWorkFlowDetails={jest.fn()} />);
        const otfDetails = screen.getByText('Booking Details');
        expect(otfDetails).toBeTruthy();

        const booked = screen.getByText('Booked');
        expect(booked).toBeTruthy();

        const alloted = screen.getByText('Allotted');
        expect(alloted).toBeTruthy();
    });

    it('should render text', async () => {
        customRender(<OtfDetailsMaster {...props} typeData={('SALE_TYP', 'PRC_TYP')} buttonData={defaultBtnVisiblity} setWorkFlowDetails={jest.fn()} />);
        const editBtn = screen.getByRole('button', { name: 'Change History' });
        fireEvent.click(editBtn);
        expect(editBtn).toBeTruthy();

        const initialDate = screen.getByRole('columnheader', { name: 'Initial Promise Delivery Date' });
        expect(initialDate).toBeTruthy();

        const expectedDate = screen.getByRole('columnheader', { name: 'Cust. Expected Delivery Date' });
        expect(expectedDate).toBeTruthy();

        const bookingAmt = screen.getByRole('columnheader', { name: 'Booking Amount' });
        expect(bookingAmt).toBeTruthy();

        const saleConsultant = screen.getByRole('columnheader', { name: 'Sales Consultant' });
        expect(saleConsultant).toBeTruthy();

        const specialReq = screen.getByRole('columnheader', { name: 'Special Request' });
        expect(specialReq).toBeTruthy();

        const placeOf = screen.getByRole('columnheader', { name: 'Place Of Registration' });
        expect(placeOf).toBeTruthy();

        const deliveryAt = screen.getByRole('columnheader', { name: 'Delivery At' });
        expect(deliveryAt).toBeTruthy();

        const referal = screen.getByRole('columnheader', { name: 'Referral Scheme' });
        expect(referal).toBeTruthy();

        const mitraType = screen.getByRole('columnheader', { name: 'Influencer/Mitra Type' });
        expect(mitraType).toBeTruthy();

        const mitraName = screen.getByRole('columnheader', { name: 'Influencer/Mitra Name' });
        expect(mitraName).toBeTruthy();

        const modeOf = screen.getByRole('columnheader', { name: 'Mode Of Payment' });
        expect(modeOf).toBeTruthy();

        const loyalty = screen.getByRole('columnheader', { name: 'Loyalty Scheme' });
        expect(loyalty).toBeTruthy();
    });

    it('should render buttons', async () => {
        customRender(<OtfDetailsMaster {...props} typeData={('SALE_TYP', 'PRC_TYP')} buttonData={defaultBtnVisiblity} setWorkFlowDetails={jest.fn()} />);
        const editBtn = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);

        const cancel = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancel);

        const close = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(close);

        const invoice = screen.getByRole('button', { name: 'Invoice' });
        fireEvent.click(invoice);

        const cancelOtf = screen.getByRole('button', { name: 'Cancel Booking' });
        fireEvent.click(cancelOtf);

        const transfer = screen.getByRole('button', { name: 'Transfer Booking' });
        fireEvent.click(transfer);

        const unAllot = screen.getByRole('button', { name: 'Un-Allot' });
        fireEvent.click(unAllot);
    });

    it('cancel button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                OTF: {
                    OtfSearchList: { isDetailLoaded: true, detailData: { loyaltyScheme: true } },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <OtfDetailsMaster {...props} typeData="SALE_TYP" buttonData={defaultBtnVisiblity} onCloseAction={jest.fn()} setWorkFlowDetails={jest.fn()} />
            </Provider>
        );

        const cancelBtn = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(cancelBtn);
    });

    it('should validate fields on finish', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                OTF: {
                    OtfSearchList: { isDetailLoaded: true, detailData: { exchange: true } },
                },
            },
        });

        const saveData = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <OtfDetailsMaster {...props} typeData="SALE_TYP" buttonData={defaultBtnVisiblity} setButtonData={jest.fn()} saveData={saveData} setWorkFlowDetails={jest.fn()} />
            </Provider>
        );
        const addBtn = screen.getByRole('button', { name: 'Edit', exact: false });
        fireEvent.click(addBtn);

        const saveBtn = screen.getByRole('button', { name: 'Save & Next', exact: false });
        fireEvent.click(saveBtn);

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });

        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();
    });
});

describe('AddEdit Component render when viewmode is false', () => {
    const formActionType = { addMode: false, editMode: true, viewMode: false };
    it('should render addedit page', async () => {
        customRender(<FormWrapper {...formActionType} typeData={('SALE_TYP', 'PRC_TYP')} setWorkFlowDetails={jest.fn()} />);

        const Switch = screen.getByRole('switch', { name: /Loyalty Scheme/i });
        fireEvent.click(Switch);
        expect(Switch).toBeChecked();

        const Switch2 = screen.getByRole('switch', { name: /Referral/i });
        fireEvent.click(Switch2);
        expect(Switch2).toBeChecked();
    });
});
