import React from 'react';
import customRender from '@utils/test-utils';
import { CompanyProfileMaster } from '@components/common/CustomerMaster/CorporateCustomer/CompanyProfile/CompanyProfileMaster';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();



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
        onChange: jest.fn(),
        onCloseAction: jest.fn(),
        downloadFileFromList: jest.fn(),
        fetchViewDocument: jest.fn(),
    }
    it('should render company profile master view mode', async () => {
        customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    {...props}
                    formActionType={formActionType}
                    onChange={jest.fn()}
                    newActivekeys={[{ id: 1, value: 'test' }]}
                    setactiveKey={jest.fn()}
                />
            </Provider>
        );

        const plusMinus = screen.getAllByRole('button');
        await act(async () => {
            user.click(plusMinus[0]);
            expect(screen.getByText('Company Information')).toBeInTheDocument()
        });


        await act(async () => {
            user.click(plusMinus[1]);
            expect(screen.getByText('Key Account Details')).toBeInTheDocument()
        });


    });
});

describe('CompanyProfileBase Component', () => {
    it('renders in view mode true', () => {
        const mockCustomerData = {
            companyName: "Test Company",
            corporateCategory: "B",
            corporateCode: null,
            corporateName: "AS56",
            corporateType: "LIS",
            corporateTypeName: "Listed",
            customerId: "CUS1687596360129",
            customerType: "CRP",
            customerTypeName: "CORPORATE",
            membershipType: "PL",
            membershipTypeName: "Platinum",
            mobileNumber: "7687686987",
            parentCompanyCode: "Par0000006",
            parentCompanyName: null,
        };

        const mockViewDocumentData = {
            docId: 'DOC456',
            fileName: 'document.pdf',
            base64: 'mockBase64Data',
        };
        const mockStore = {
            auth: {
                userId: 'user123',
            },
            data: {
                ConfigurableParameterEditing: {
                    filteredListData: [],
                },
                CustomerMaster: {
                    CompanyProfile: {
                        isLoaded: true,
                        data: mockCustomerData,
                    },
                    ViewDocument: {
                        isLoaded: true,
                        data: mockViewDocumentData,
                    },
                },
            },
            common: {
                LeftSideBar: {
                    collapsed: true,
                },
            },
        };
        customRender(<CompanyProfileMaster setButtonData={jest.fn()} handleFormValueChange={jest.fn()}/>, {
            initialState: mockStore,
        });
        const viewDetailTitle = screen.getByText('Company Information');
        expect(viewDetailTitle).toBeInTheDocument();
    });
});
describe('CompanyProfileMaster Component', () => {
    const mockCustomerData = {
        companyName: "Test Company",
        corporateCategory: "B",
        corporateCode: null,
        corporateName: "AS56",
        corporateType: "LIS",
        corporateTypeName: "Listed",
        customerId: "CUS1687596360129",
        customerType: "CRP",
        customerTypeName: "CORPORATE",
        membershipType: "PL",
        membershipTypeName: "Platinum",
        mobileNumber: "7687686987",
        parentCompanyCode: "Par0000006",
        parentCompanyName: null,
    };

    const mockViewDocumentData = {
        docId: 'DOC456',
        fileName: 'document.pdf',
        base64: 'mockBase64Data',
    };
    const mockStore = {
        auth: {
            userId: 'user123',
        },
        data: {
            ConfigurableParameterEditing: {
                filteredListData: [],
            },
            CustomerMaster: {
                CompanyProfile: {
                    isLoaded: false,
                    data: mockCustomerData,
                },
                ViewDocument: {
                    isLoaded: false,
                    data: mockViewDocumentData,
                },
            },
        },
        common: {
            LeftSideBar: {
                collapsed: true,
            },
        },
    };
    const formActionType = {
        viewMode: false
    }
    it('renders in view mode false', () => {
        customRender(<CompanyProfileMaster formActionType={formActionType} saveButtonName={"Save & Next"} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />, {
            initialState: mockStore,
        });

        const pan = screen.getByRole("textbox", { name: 'PAN', exact: false });
        user.type(pan, { target: { value: 'TESTDMSPAN' } });

        const gstin = screen.getByRole("textbox", { name: 'GSTIN', exact: false });
        user.type(gstin, { target: { value: 'TESTDMSGSTIN' } });

        const accoutNo = screen.getByRole("textbox", { name: 'Account Code', exact: false });
        user.type(accoutNo, { target: { value: '01234567890' } });

        const accoutName = screen.getByRole("textbox", { name: 'Account Name', exact: false });
        user.type(accoutName, { target: { value: 'TestDMS' } });

        const accountSegment = screen.getByRole("textbox", { name: 'Account Segment', exact: false });
        user.type(accountSegment, { target: { value: 'TestDMS' } });

        const accountClient = screen.getByRole("textbox", { name: 'Account Client Name', exact: false });
        user.type(accountClient, { target: { value: 'TestDMS' } });

        const accountMapping = screen.getByRole("textbox", { name: 'Account Mapping Date', exact: false });
        user.type(accountMapping, { target: { value: 'TestDMS' } });

        const categorization = screen.getByRole("combobox", { name: 'Usage/Application Categorization', exact: false });
        user.type(categorization, { target: { key: 'test', value: 'test' } });

        expect(categorization).toBeInTheDocument();

        const subCategorization = screen.getByRole("combobox", { name: 'Usage/Application Sub-Category', exact: false });
        user.type(subCategorization, { target: { value: 'TestDMS' } });

        const cust = screen.getByRole("combobox", { name: 'Customer Category', exact: false });
        user.type(cust, { target: { value: 'TestDMS' } });

    });
});

// eslint-disable-next-line jest/no-identical-title
// describe('CompanyProfileMaster Component', () => {
//         const mockCustomerData = {
//             companyName:"Test Company",
//             corporateCategory: "B",
//             corporateCode: null,
//             corporateName: "AS56",
//             corporateType: "LIS",
//             corporateTypeName: "Listed",
//             customerId: "CUS1687596360129",
//             customerType: "CRP",
//             customerTypeName: "CORPORATE",
//             membershipType: "PL",
//             membershipTypeName: "Platinum",
//             mobileNumber: "7687686987",
//             parentCompanyCode: "Par0000006",
//             parentCompanyName: null,
//         };
//         const mockViewDocumentData = {
//             docId: 'DOC456',
//             fileName: 'document.pdf',
//             base64: 'mockBase64Data',
//         };
//         const mockStore = {
//             auth: {
//                 userId: 'user123',
//             },
//             data: {
//                 ConfigurableParameterEditing: {
//                     filteredListData: [],
//                 },
//                 CustomerMaster: {
//                     CompanyProfile: {
//                         isLoaded: false,
//                         data: mockCustomerData,
//                     },
//                     ViewDocument: {
//                         isLoaded: false,
//                         data: mockViewDocumentData,
//                     },
//                 },
//             },
//             common: {
//                 LeftSideBar: {
//                     collapsed: true,
//                 },
//             },
//         };
//         const formActionType = {
//             viewMode: false
//         }
//         const mockShowGlobalNotification = jest.fn();
//         // Mock the form values
//         const formValues = {
//             customerConsent: false,
//         };
//         it('renders in view mode false', () => {
//             customRender(<CompanyProfileMaster showGlobalNotification={mockShowGlobalNotification} formActionType={formActionType} saveButtonName={"Save & Next"} />, {
//             initialState: mockStore,
//             });
//             fireEvent.submit(screen.getByRole('form'), { target: { elements: formValues } });
//             expect(mockShowGlobalNotification).toHaveBeenCalledWith({
//                 notificationType: 'error',
//                 title: 'Error',
//                 message: 'Please accept consent.',
//                 placement: 'bottomRight',
//               });
//         });
//     });
