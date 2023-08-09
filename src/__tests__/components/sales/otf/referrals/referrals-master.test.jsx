import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ReferralsMaster } from '@components/Sales/OTF/Referrals/ReferralsMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';


const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn()
    }
    return <ReferralsMaster form={myFormMock}  {...props} />;
};

const formActionType = {
    addMode: false,
    editMode: true,
    viewMode: true
}

const formActionTypeAdd = {
    addMode: false,
    editMode: true,
    viewMode: false
}

const tableData = [{
    cpd: null,
    customerName: "DMA  Test",
    customerType: "IND1",
    mobileNumber: "345435",
    model: "3234",
    orderStatus: "23",
    otfDate: "null",
    otfNumber: "OTF1690455272392",
    userProfilePicDocId: "test",
}, {
    cpd: null,
    customerName: "DMA  Test",
    customerType: "IND1",
    mobileNumber: "345435",
    model: "3234",
    orderStatus: "23",
    otfDate: "null",
    otfNumber: "OTF1690455272392",
    userProfilePicDocId: "test",
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

const typeData = [{
    ACCDNTL_APPROVAL: [{
        id: "test",
        key: "RJRCCM",
        parentKey: "ACCDNTL_APPROVAL",
        value: "Rejected by RCCM/DY.RCCM/ ME RCCM"
    }]
}, {
    ACC_ALLOW: [{
        id: "test1",
        key: "RJRCCM",
        parentKey: "ACCDNTL_APPROVAL",
        value: "Rejected by RCCM/DY.RCCM/ ME RCCM"
    }]
}]

const sectionName = {
    REFERRALS: {
        displayOnList: true,
        id: 8,
        title: "Referrals"
    },
    OTF_DETAILS: {
        displayOnList: true,
        id: 34,
        title: "test"
    }

}
const referralData = {
    chassisNumber: "",
    customerId: "CUS1687411157049",
    customerName: "Rahul kumar Singh",
    customerType: "IND",
    dob: "1997-12-20",
    emailId: "abc@gmail12.com",
    id: "c4ceb756-e6f2-4b02-83cc-4df6b3f6e684",
    mobileNumber: "9931000000",
    otfNumber: "OTF24A000691",
    referralId: "RFL1689598496089",
    registrationNumber: "",
}


const selectedOrder = {
    cpd: null,
    customerName: "Kalyan  Test",
    customerType: "IND",
    mobileNumber: "8097666574",
    model: "THRNMM8395642778",
    orderStatus: "test",
    otfDate: "null",
    otfNumber: "OTF1690454941421",
    userProfilePicDocId: ""
}

const buttonData = {
    allotBtn: true,
    cancelBtn: true,
    cancelOTFBtn: true,
    changeHistory: true,
    closeBtn: false,
    deliveryNote: false,
    editBtn: false,
    formBtnActive: true,
    invoiceBtn: false,
    saveAndNewBtn: false,
    saveAndNewBtnClicked: false,
    saveBtn: true,
    transferOTFBtn: true,
    unAllotBtn: false,
}

const filterString = { searchType: 'test', searchParam: 'test' }
const props = {
    selectedOrderId: 'selectedOrderId',
    setFilterString: jest.fn(),
    handleButtonClick: jest.fn(),
    fetchList: jest.fn(),
    onErrorAction: jest.fn(),
    filterString: filterString,
    listShowLoading: true,
    section: { id: 8, title: 'Referrals', displayOnList: true },
    otfData: otfData,
    typeData: typeData,
    onCloseAction: jest.fn(),
    selectedOrder: selectedOrder,
    sectionName: sectionName,
    referralData: referralData,
    setViewFormData: jest.fn(),
    onSuccessAction: jest.fn(),
    onFinish: jest.fn(),
    onSuccess: jest.fn(),
    ADD_ACTION: "add",
    CANCEL_ACTION: "cancel_otf",
    EDIT_ACTION: "edit",
    NEXT_ACTION: "next",
    VIEW_ACTION: "view"
}

const searchParams = [
    {
        key: 'pageNumber',
        title: 'Value',
        value: 1,
        canRemove: true,
        filter: false,
    },
    {
        key: 'pageSize',
        title: 'Value',
        value: 1000,
        canRemove: true,
        filter: false,
    },
];

describe('OTF referrals master render', () => {
    const isDataLoaded = true;
    const mockStore = createMockStore({
        auth: { userId: '1234' },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData },
            OTF: {
                Referrals: { isLoaded: isDataLoaded, isLoading: false, data: referralData, filter: filterString },
            },
        },
        customer: {
            customerDetail: { isLoaded: false, isLoading: false, data: [] },
        },
    });

    it('should render referrals view details', () => {
        const { getByRole } = customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    setFormData={jest.fn()}
                    {...props}
                    formActionType={formActionType}
                    showGlobalNotification={jest.fn()}
                    handleFormValueChange={jest.fn()}
                    onFinishFailed={jest.fn()}
                    onError={jest.fn()}
                    onSuccess={jest.fn()}
                    fetchCustomerList={jest.fn()}
                />
            </Provider>
        );

        const referralId = getByRole('columnheader', { name: 'Referral ID' });
        expect(referralId).toBeTruthy();

        const regNumber = getByRole('columnheader', { name: 'Registration Number' });
        expect(regNumber).toBeTruthy();

        const chassisNo = getByRole('columnheader', { name: 'Chassis Number' });
        expect(chassisNo).toBeTruthy();

        const customerId = getByRole('columnheader', { name: 'Customer ID' });
        expect(customerId).toBeTruthy();

        const customerType = getByRole('columnheader', { name: 'Customer Type' });
        expect(customerType).toBeTruthy();

        const customerName = getByRole('columnheader', { name: 'Customer Name' });
        expect(customerName).toBeTruthy();

        const mobileNo = getByRole('columnheader', { name: 'Mobile Number' });
        expect(mobileNo).toBeTruthy();

        const emailId = getByRole('columnheader', { name: 'Email ID' });
        expect(emailId).toBeTruthy();

        const dob = getByRole('columnheader', { name: 'Date of Birth' });
        expect(dob).toBeTruthy();
    })

    it('should render referrals add edit form', () => {
        const { getByRole } = customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    setFormData={jest.fn()}
                    {...props}
                    formActionType={formActionTypeAdd}
                    handleFormValueChange={jest.fn()}
                    fetchCustomerList={jest.fn()}
                    extraParams={searchParams}
                    onFinishFailed={jest.fn()}
                    onError={jest.fn()}
                    onSuccess={jest.fn()}
                    buttonData={buttonData}
                    showGlobalNotification={jest.fn()}
                />
            </Provider>
        );

        const customerType = getByRole("combobox", { name: 'Customer Type', exact: false });
        fireEvent.change(customerType, { target: { value: 'testType' } });

        const vehicleReg = getByRole("textbox", { name: 'Vehicle Registration Number', exact: false });
        fireEvent.change(vehicleReg, { target: { value: 'reg' } });

        const chassisNo = getByRole("textbox", { name: 'Chassis Number', exact: false });
        fireEvent.change(chassisNo, { target: { value: 'make' } });

        const customerCode = getByRole("textbox", { name: 'Customer Code', exact: false });
        fireEvent.change(customerCode, { target: { value: 'tseCode' } });

        const customerName = getByRole("textbox", { name: 'Customer Name', exact: false });
        fireEvent.change(customerName, { target: { value: 'test' } });

        const mobileNo = getByRole("textbox", { name: 'Mobile Number', exact: false });
        fireEvent.change(mobileNo, { target: { value: '199999999' } });

        const emailId = getByRole("textbox", { name: 'Email Id', exact: false });
        fireEvent.change(emailId, { target: { value: 'test@gmail.com' } });

        const dob = getByRole("textbox", { name: 'Date of Birth', exact: false });
        fireEvent.change(dob, { target: { value: 'make' } });

        const searchBtn = getByRole("button", { name: 'search', exact: false });
        fireEvent.click(searchBtn);

        const searchImg = getByRole("img", { name: 'search', exact: false });
        fireEvent.click(searchImg);

        const calendar = getByRole("img", { name: 'calendar', exact: false });
        fireEvent.click(calendar);
    })
})