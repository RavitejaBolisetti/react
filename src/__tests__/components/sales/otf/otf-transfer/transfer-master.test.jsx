/* eslint-disable jest/no-mocks-import */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { TransferMaster } from '@components/Sales/OTF/OTFTransfer/TransferMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [otfTransferForm] = Form.useForm();
    const myFormMock = {
        ...otfTransferForm,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
    };
    return <TransferMaster form={myFormMock} {...props} />;
};

const typeData = [
    {
        id: 'testId',
        key: 'Opt1',
        parentKey: 'TRNSFER_REASON',
        value: 'Customer Request',
    },
    {
        id: 'testId',
        key: 'Opt1',
        parentKey: 'TRNSFER_REASON',
        value: 'Customer Request',
    },
];

const otfData = {
    bookingAmount: 200,
    cpd: null,
    custExpectedDeliveryDate: '2023-07-27',
    customerType: 'IND',
    deliveryAt: 'HOM',
    exchange: 1,
    financeArrangedBy: 'SLF',
    id: 'testid',
    initialPromiseDeliveryDate: '2023-01-04',
    loyaltyScheme: 0,
    mitraName: null,
    mitraType: null,
    mobileNumber: '8096377837',
    modeOfPAyment: 'card',
    otfDate: null,
    otfNumber: 'OTF1690806304088',
    placeOfRegistration: 'Delhi',
    priceType: 'INDV',
    referral: 'Y',
    saleConsultant: 'Mahatma Gandhi',
    saleType: 'IGST',
    specialRequest: 'No',
    userProfilePicDocId: '',
};

const dealerLocations = [
    {
        locationId: 1,
        dealerLocationName: 'testdealer',
    },
    {
        locationId: 22,
        dealerLocationName: 'testdealer2',
    },
    {
        locationId: 32,
        dealerLocationName: 'testdealer12',
    },
];

const salesConsultantLov = [
    {
        key: 1,
        value: 'test',
    },
    {
        key: 2,
        value: 'test1',
    },
    {
        key: 3,
        value: 'test1',
    },
];

const props = {
    otfData: otfData,
    selectedOrder: '',
    fetchSalesConsultant: jest.fn(),
    listConsultantShowLoading: true,
    fetchDealerLocations: jest.fn(),
    dealerLocations: dealerLocations,
    locationDataLoding: true,
    userId: 213,
    reset: jest.fn(),
    titleOverride: 'title',
    salesConsultantLov: salesConsultantLov,
    setIsLoading: false,
};

describe('Booking transfer master render', () => {
    const mockStore = createMockStore({
        auth: { userId: 132, accessToken: 'tetsT', token: 'testToken' },
        data: {
            ApplicationMaster: { dealerLocations: dealerLocations },
            ConfigurableParameterEditing: { filteredListData: typeData },
            OTF: {
                salesConsultantLov: { isLoaded: false, salesConsultantLov: salesConsultantLov },
            },
        },
    });

    it('should render transfer master add edit form', async () => {
        const { container } = customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} salesConsultantLov={salesConsultantLov} isVisible={true} onFinishOTFTansfer={jest.fn()} handleButtonClick={jest.fn()} handleOtfTransferLocationChange={jest.fn()} />
            </Provider>
        );

        const close = screen.getByRole('button', { name: 'Close', exact: false });

        fireEvent.click(close);

        const cancel = screen.getByRole('button', { name: 'Cancel', exact: false });

        fireEvent.click(cancel);

        const transferBooking = screen.getByRole('button', { name: 'Transfer Booking', exact: false });

        fireEvent.click(transferOtf);

        const closeImg = screen.getByRole('img', { name: 'close', exact: false });
        expect(closeImg).toBeTruthy();

        const otfNo = screen.getByRole('columnheader', { name: 'Booking No.', exact: false });
        expect(otfNo).toBeTruthy();

        const otfDate = screen.getByRole('columnheader', { name: 'Booking Date', exact: false });
        expect(otfDate).toBeTruthy();

        const customerName = screen.getByRole('columnheader', { name: 'Customer Name', exact: false });
        expect(customerName).toBeTruthy();

        const mobileNo = screen.getByRole('columnheader', { name: 'Mobile No.', exact: false });
        expect(mobileNo).toBeTruthy();

        const model = screen.getByRole('columnheader', { name: 'Model', exact: false });
        expect(model).toBeTruthy();

        const order = screen.getByRole('columnheader', { name: 'Order Status', exact: false });
        expect(order).toBeTruthy();
    });
});
