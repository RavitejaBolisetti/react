import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { TransferMaster } from '@components/Sales/OTF/OTFTransfer/TransferMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';
afterEach(() => {
    jest.restoreAllMocks();
  }); 
beforeEach(() => {
    jest.clearAllMocks()
})

const FormWrapper = (props) => {
    const [otfTransferForm] = Form.useForm();
    const myFormMock = {
        ...otfTransferForm,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn()
    }
    return <TransferMaster form={myFormMock}  {...props} />;
};

const data = [
    {
        cpd: null,
        customerName: "Kalyan  Test1",
        customerType: "IND",
        mobileNumber: "8097976574",
        model: "THRNMM8395642778",
        orderStatus: "B",
        otfDate: "null",
        otfNumber: "OTF1690455272392",
        userProfilePicDocId: "",
    },
    {
        cpd: null,
        customerName: "Kalyan  Test",
        customerType: "IND",
        mobileNumber: "8097976574",
        model: "THRNMM8395642778",
        orderStatus: "B",
        otfDate: "null",
        otfNumber: "OTF16904552723922",
        userProfilePicDocId: "",
    },
    {
        cpd: null,
        customerName: "Kalyan  Test",
        customerType: "IND",
        mobileNumber: "8097976574",
        model: "THRNMM8395642778",
        orderStatus: "B",
        otfDate: "null",
        otfNumber: "OTF169045527239283",
        userProfilePicDocId: "",
    }
]

const typeData = [{
    id: "testId",
    key: "Opt1",
    parentKey: "TRNSFER_REASON",
    value: "Customer Request"
},
{
    id: "testId",
    key: "Opt1",
    parentKey: "TRNSFER_REASON",
    value: "Customer Request"
}]

const otfData = {
    bookingAmount: 200,
    cpd: null,
    custExpectedDeliveryDate: "2023-07-27",
    customerType: "IND",
    deliveryAt: "HOM",
    exchange: 1,
    financeArrangedBy: "SLF",
    id: "testid",
    initialPromiseDeliveryDate: "2023-01-04",
    loyaltyScheme: 0,
    mitraName: null,
    mitraType: null,
    mobileNumber: "8096377837",
    modeOfPAyment: "card",
    otfDate: null,
    otfNumber: "OTF1690806304088",
    placeOfRegistration: "Delhi",
    priceType: "INDV",
    referral: "Y",
    saleConsultant: "Mahatma Gandhi",
    saleType: "IGST",
    specialRequest: "No",
    userProfilePicDocId: ""
}

const dealerLocations = [
    {
        locationId: 1,
        dealerLocationName: 'testdealer'
    },
    {
        locationId: 2,
        dealerLocationName: 'testdealer2'
    },
    {
        locationId: 3,
        dealerLocationName: 'testdealer12'
    }
]

const salesConsultantLov = [
    {
        key: 1,
        value: 'test'
    }, {
        key: 2,
        value: 'test1'
    }, {
        key: 3,
        value: 'test1'
    }
]

const props = {
    otfData: otfData,
    selectedOrder: "",
    fetchSalesConsultant: jest.fn(),
    listConsultantShowLoading: true,
    fetchDealerLocations: jest.fn(),
    dealerLocations: dealerLocations,
    locationDataLoding: true,
    userId: 213,
    reset: jest.fn(),
    titleOverride: 'title',
    salesConsultantLov: salesConsultantLov,
    setIsLoading: false
}



describe('OTF transfer master render', () => {

    const mockStore = createMockStore({
        auth: { userId: 132, accessToken: "tetsT", token: "testToken" },
        data: {
            ApplicationMaster: { dealerLocations: dealerLocations },
            ConfigurableParameterEditing: { filteredListData: typeData },
            OTF: {
                salesConsultantLov: { isLoaded: false, salesConsultantLov: salesConsultantLov },
            },
        },
    });


    it('should render transfer master add edit form', () => {
        const { getByRole } = customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    {...props}
                    salesConsultantLov={salesConsultantLov}
                    isVisible={true}
                    onFinishOTFTansfer={jest.fn()}
                    handleButtonClick={jest.fn()}
                    handleOtfTransferLocationChange={jest.fn()}
                />
            </Provider>
        );

        const close = getByRole("button", { name: 'Close', exact: false });
        fireEvent.click(close);

        const cancel = getByRole("button", { name: 'Cancel', exact: false });
        fireEvent.click(cancel);

        const transferOtf = getByRole("button", { name: 'Transfer OTF', exact: false });
        fireEvent.click(transferOtf);

        const closeImg = getByRole("img", { name: 'close', exact: false });
        expect(closeImg).toBeTruthy();

        const otfNo = getByRole("columnheader", { name: 'OTF No.', exact: false });
        expect(otfNo).toBeTruthy();

        const otfDate = getByRole("columnheader", { name: 'OTF Date', exact: false });
        expect(otfDate).toBeTruthy();

        const customerName = getByRole("columnheader", { name: 'Customer Name', exact: false });
        expect(customerName).toBeTruthy();

        const mobileNo = getByRole("columnheader", { name: 'Mobile No.', exact: false });
        expect(mobileNo).toBeTruthy();

        const model = getByRole("columnheader", { name: 'Model', exact: false });
        expect(model).toBeTruthy();

        const order = getByRole("columnheader", { name: 'Order Status', exact: false });
        expect(order).toBeTruthy();

        const tranLocation = getByRole("combobox", { name: 'Transfer To Location', exact: false });
        fireEvent.change(tranLocation, { target: { value: 'noida' } });

        const sales = getByRole("combobox", { name: 'Sales Consultant', exact: false });
        fireEvent.change(sales, { target: { value: 'noida' } });

        const reason = getByRole("combobox", { name: 'Reason For Transfer', exact: false });
        fireEvent.change(reason, { target: { value: 'noida' } });

    })
})