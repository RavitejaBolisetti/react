import React from 'react';
import customRender from '@utils/test-utils';
import { CompanyProfileMaster } from '@components/common/CustomerMaster/CorporateCustomer/CompanyProfile/CompanyProfileMaster';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

beforeEach(() => {
    jest.clearAllMocks()
})


const FormWrapper = (props) => {
    const [form, formData] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        resetData: jest.fn()
    }
    return <CompanyProfileMaster form={myFormMock} formData={formData}  {...props} />;
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

const buttonData = {
    cancelBtn: false,
    changeHistory: true,
    closeBtn: true,
    editBtn: true,
    formBtnActive: false,
    nextBtn: true,
    saveAndNewBtn: false,
    saveAndNewBtnClicked: false,
    saveBtn: false
}

const defaultBtnVisiblity = {
    cancelBtn: false,
    changeHistory: true,
    closeBtn: false,
    editBtn: false,
    formBtnActive: false,
    saveAndNewBtn: false,
    saveAndNewBtnClicked: false,
    saveBtn: false
}

const selectedCustomer = {
    chassisNumber: null,
    customerId: "CUS1687368732514",
    customerName: "Company1",
    customerType: "CRP",
    customerTypeName: "CORPORATE",
    dateOfBirth: null,
    emailId: "raj.singh@gmail.com",
    membershipType: "Gold",
    membershipTypeName: null,
    mobileNumber: "6713405120",
    profilePicDocId: null,
    registrationNumber: null
}

const props = {
    isVisible: true,
    showGlobalNotification: jest.fn(),
    buttonData: buttonData,
    setButtonData: jest.fn(),
    handleButtonClick: jest.fn(),
    defaultBtnVisiblity: defaultBtnVisiblity,
    selectedCustomer: selectedCustomer,
    selectedCustomerId: "CUS1687368732514",
    isViewDataLoaded: true,
    handleFormValueChange: jest.fn(),
    handleOnClick: jest.fn(),
}

const customerProfileData = {
    applicationCategorization: "APP2",
    applicationSubCategory: "APP_SUB_1",
    authorityDetails: {
        companyName: "Comp1",
        customerId: "CUS1687368732514",
        id: "088496d8-0934-4816-aa77-bd3ec596768a",
        personName: "Person",
        postion: null,
        remarks: null
    },
    businessDetails: null,
    customerCategory: "CUS_CAT_2",
    customerConsent: "true",
    customerFormDocId: "68cd7db2-1e99-415f-a429-8ffd25bc9b9a",
    customerId: "CUS1687368732514",
    facebookLink: null,
    gstinNumber: "22QWERT1234N1ZA",
    id: "cb01bc6b-51f0-416d-901f-a67e42c3d03d",
    keyAccountDetails: { id: '088496d8-0934-4816-aa77-bd3ec596768a', customerId: 'CUS1687368732514', accountCode: null, accountName: null, accountSegment: null, customerId: "CUS1687368732514", id: "088496d8-0934-4816-aa77-bd3ec596768a" },
    keyRouteDetails: null,
    m1mmfsl: null,
    majorRouteDetails: null,
    panNumber: "QWERT1234N",
    twitterLink: null,
    vechileDeploymentDetails: null,
}

const viewDocument = {
    base64: "djgah",
    docId: "shjg",
    docType: "png",
    fileName: "Sasdcreenshot (6)-1690294063743.png"
}

const appCategoryData = {
    APP_CAT: [
        {
            id: "test",
            key: "APP2",
            parentKey: "APP_CAT",
            value: "APP CAT 2"
        },
        {
            id: "test1",
            key: "APP23",
            parentKey: "APP_CAT",
            value: "APP CAT 3"
        }
    ],
    APP_SUB_CAT: [{
        id: "test",
        key: "APP2",
        parentKey: "APP_CAT",
        value: "APP CAT 2"
    },
    {
        id: "test1",
        key: "APP23",
        parentKey: "APP_CAT",
        value: "APP CAT 3"
    }],
    CUS_CAT: [{
        id: "test",
        key: "APP2",
        parentKey: "APP_CAT",
        value: "APP CAT 2"
    },
    {
        id: "test1",
        key: "APP23",
        parentKey: "APP_CAT",
        value: "APP CAT 3"
    }]
}


describe('CompanyProfileMaster', () => {
    const mockStore = createMockStore({
        auth: { userId: '1234' },
        data: {
            ConfigurableParameterEditing: { filteredListData: [] },
            CustomerMaster: {
                CompanyProfile: { isLoaded: false, data: customerProfileData },
                ViewDocument: { isLoaded: false, data: viewDocument },
            },
        },
    });
    it('should render company profile master view mode', async () => {
        const { getByRole } = customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    {...props}
                    formActionType={formActionType}
                    onChange={jest.fn()}
                    onCloseAction={jest.fn()}
                    downloadFileFromList={jest.fn()}
                    fetchViewDocument={jest.fn()}
                    newActivekeys={jest.fn()}
                />
            </Provider>
        )

        const compImfo = getByRole('button', { name: 'minus Company Information', exact: false });
        fireEvent.click(compImfo);

        const socialProfile = getByRole('button', { name: 'plus Social Profiles', exact: false });
        fireEvent.click(socialProfile);

        const accountDetails = getByRole('button', { name: 'plus Key Account Details', exact: false });
        fireEvent.click(accountDetails);

        const authorityDetails = getByRole('button', { name: 'plus Authority Details(Who Knows Whom)', exact: false });
        fireEvent.click(authorityDetails);

        const uploadCust = getByRole('button', { name: 'plus Upload Customer Form', exact: false });
        fireEvent.click(uploadCust);

        const close = getByRole('button', { name: 'Close', exact: false });
        fireEvent.click(close);

        const viewHistory = getByRole('button', { name: 'View History', exact: false });
        fireEvent.click(viewHistory);

        const edit = getByRole('button', { name: 'Edit', exact: false });
        fireEvent.click(edit);

        const next = getByRole('button', { name: 'Next', exact: false });
        fireEvent.click(next);

        const plus = getByRole('img', { name: 'plus', exact: false });
        expect(plus).toBeTruthy();
    });

    it('should render company profile master add edit mode', async () => {
        const mockedOnChange = jest.fn();

        const mockedOptions = [
            { key: 'APP2', value: 'mocked-option-1' },
            { key: 'APP22', value: 'mocked-option-2' },
        ];
        const { getByRole } = customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    {...props}
                    formActionType={formActionTypeAdd}
                    onChange={jest.fn()}
                    onFinish={jest.fn()}
                    appCategoryData={appCategoryData}
                    handleCategoryChange={jest.fn()}
                    handleAppSubCategoryChange={mockedOnChange}
                    setAppCustomerCategory={jest.fn()}
                    setAppSubCategory={jest.fn()}
                    setCustomerCategory={jest.fn()}
                    fileList={jest.fn()}
                    setFileList={jest.fn()}
                    uploadedFile={jest.fn()}
                    onFinishFailed={jest.fn()}
                    onCloseAction={jest.fn()}
                    handleAppCategoryChange={jest.fn()}
                    downloadFileFromList={jest.fn()}
                    customerCategory={"CUS_CAT_2"}
                    option={mockedOptions}
                    newActivekeys={jest.fn()}
                />
            </Provider>
        )

        const pan = getByRole("textbox", { name: 'PAN', exact: false });
        fireEvent.change(pan, { target: { value: 'TESTDMSPAN' } });

        const gstin = getByRole("textbox", { name: 'GSTIN', exact: false });
        fireEvent.change(gstin, { target: { value: 'TESTDMSGSTIN' } });

        const m1mmfsl = getByRole("textbox", { name: 'M1-MMFSL', exact: false });
        fireEvent.change(m1mmfsl, { target: { value: 'TESTM1-MMFSL' } });

        const fbLink = getByRole("textbox", { name: 'Facebook Link', exact: false });
        fireEvent.change(fbLink, { target: { value: 'https://facebook.com' } });

        const twitterLink = getByRole("textbox", { name: 'Twitter Link', exact: false });
        fireEvent.change(twitterLink, { target: { value: 'https://twitter.com' } });

        const accoutNo = getByRole("textbox", { name: 'Account Code', exact: false });
        fireEvent.change(accoutNo, { target: { value: '01234567890' } });

        const accoutName = getByRole("textbox", { name: 'Account Name', exact: false });
        fireEvent.change(accoutName, { target: { value: 'TestDMS' } });

        const accountSegment = getByRole("textbox", { name: 'Account Segment', exact: false });
        fireEvent.change(accountSegment, { target: { value: 'TestDMS' } });

        const accountClient = getByRole("textbox", { name: 'Account Client Name', exact: false });
        fireEvent.change(accountClient, { target: { value: 'TestDMS' } });

        const accountMapping = getByRole("textbox", { name: 'Account Mapping Date', exact: false });
        fireEvent.change(accountMapping, { target: { value: 'TestDMS' } });

        const nameOfPerson = getByRole("textbox", { name: 'Name Of Person', exact: false });
        fireEvent.change(nameOfPerson, { target: { value: 'TestDMS' } });

        const position = getByRole("textbox", { name: 'Position', exact: false });
        fireEvent.change(position, { target: { value: 'TestDMS' } });

        const companyName = getByRole("textbox", { name: 'Company Name', exact: false });
        fireEvent.change(companyName, { target: { value: 'TestDMS' } });

        const remarks = getByRole("textbox", { name: 'Remarks', exact: false });
        fireEvent.change(remarks, { target: { value: 'TestDMS' } });

        const categorization = getByRole("combobox", { name: 'Usage/Application Categorization', exact: false });
        fireEvent.change(categorization, { target: { key: 'test', value: 'test' } });
        expect(categorization).toBeInTheDocument();
        // expect(mockedOnChange).toHaveBeenCalledWith({ key: 'APP20', value: 'mocked-option-1' });


        const subCategorization = getByRole("combobox", { name: 'Usage/Application Sub-Category', exact: false });
        fireEvent.change(subCategorization, { target: { value: 'TestDMS' } });

        const cust = getByRole("combobox", { name: 'Customer Category', exact: false });
        fireEvent.change(cust, { target: { value: 'TestDMS' } });

        const checkBox = getByRole("checkbox", { name: 'I Consent to share my details with Mahindra & Mahindra.', exact: false });
        fireEvent.change(checkBox, { target: { value: 'TestDMS' } });

        const uploadFile = getByRole("button", { name: 'Upload File', exact: false });
        fireEvent.click(uploadFile);

        const close = getByRole("button", { name: 'Close', exact: false });
        fireEvent.click(close);

        const viewHistory = getByRole("button", { name: 'View History', exact: false });
        fireEvent.click(viewHistory);

        const edit = getByRole('button', { name: 'Edit', exact: false });
        fireEvent.click(edit);

        const next = getByRole('button', { name: 'Next', exact: false });
        fireEvent.click(next);

    })
});

