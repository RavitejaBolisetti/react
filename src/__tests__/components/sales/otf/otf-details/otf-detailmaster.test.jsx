import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { OtfDetailsMaster } from '@components/Sales/OTF/OtfDetails/OtfDetailsMaster';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

beforeEach(() => {
    jest.clearAllMocks();
});

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
        customRender(<OtfDetailsMaster {...props} typeData={('SALE_TYP', 'PRC_TYP')} buttonData={defaultBtnVisiblity} />);
    });

    it('should render text components', async () => {
        customRender(<OtfDetailsMaster {...props} typeData={('SALE_TYP', 'PRC_TYP')} />);
        const otfDetails = screen.getByText('Booking Details');
        expect(otfDetails).toBeTruthy();

        const booked = screen.getByText('Booked');
        expect(booked).toBeTruthy();

        const alloted = screen.getByText('Allotted');
        expect(alloted).toBeTruthy();
    });

    it('should render text', async () => {
        customRender(<OtfDetailsMaster {...props} typeData={('SALE_TYP', 'PRC_TYP')} buttonData={defaultBtnVisiblity} />);
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

        const referal = screen.getByRole('columnheader', { name: 'Referral' });
        expect(referal).toBeTruthy();

        const mitraType = screen.getByRole('columnheader', { name: 'Influencer/Mitra Type' });
        expect(mitraType).toBeTruthy();

        const mitraName = screen.getByRole('columnheader', { name: 'Influencer/Mitra Name' });
        expect(mitraName).toBeTruthy();

        const modeOf = screen.getByRole('columnheader', { name: 'Mode Of Payment' });
        expect(modeOf).toBeTruthy();

        const loyalty = screen.getByRole('columnheader', { name: 'Loyality Scheme' });
        expect(loyalty).toBeTruthy();
    });

    it('should render buttons', async () => {
        customRender(<OtfDetailsMaster {...props} typeData={('SALE_TYP', 'PRC_TYP')} buttonData={defaultBtnVisiblity} />);
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
        });
        customRender(
            <Provider store={mockStore}>
                <OtfDetailsMaster {...props} typeData="SALE_TYP" buttonData={defaultBtnVisiblity} onCloseAction={jest.fn()} />
            </Provider>
        );

        const cancelBtn = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(cancelBtn);
    });

    it('should validate fields on finish failed', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <OtfDetailsMaster {...props} typeData="SALE_TYP" buttonData={defaultBtnVisiblity} setButtonData={jest.fn()} onCloseAction={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFieldsChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
            </Provider>
        );
        const addBtn = screen.getByRole('button', { name: 'Edit', exact: false });
        fireEvent.click(addBtn);

        const saveBtn = screen.getByRole('button', { name: 'Save & Next', exact: false });
        fireEvent.click(saveBtn);
    });

    it('save button should work with on finish', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <OtfDetailsMaster {...props} typeData="SALE_TYP" buttonData={defaultBtnVisiblity} setButtonData={jest.fn()} onCloseAction={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFieldsChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
            </Provider>
        );
        const addBtn = screen.getByRole('button', { name: 'Edit', exact: false });
        fireEvent.click(addBtn);

        const disableChecked = screen.getByRole('columnheader', { name: 'Loyality Scheme', exact: false });
        expect(disableChecked).not.toBeDisabled();
        const saveBtn = screen.getByRole('button', { name: 'Save & Next', exact: false });
        fireEvent.click(saveBtn);
    });
});

describe('AddEdit Component render when viewmode is false', () => {
    const formActionType = { addMode: false, editMode: false, viewMode: false };
    it('should render addedit page', async () => {
        customRender(<OtfDetailsMaster {...formActionType} typeData={('SALE_TYP', 'PRC_TYP')} />);
    });
});
