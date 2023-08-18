import React from 'react';
import customRender from '@utils/test-utils';
import { CompanyProfileMaster } from '@components/common/CustomerMaster/CorporateCustomer/CompanyProfile/CompanyProfileMaster';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { ViewDetail } from '@components/common/CustomerMaster/CorporateCustomer/CompanyProfile/ViewDetail'; // Assuming this is the correct import path
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
        onChange:jest.fn(),
        onCloseAction:jest.fn(),
        downloadFileFromList:jest.fn(),
        fetchViewDocument:jest.fn(),
        newActivekeys:jest.fn(),
    }
    it('should render company profile master view mode', async () => {
         customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    {...props}
                    formActionType={formActionType}
                />
            </Provider>
        );

        const compImfo = screen.getByRole('button', { name: 'minus Company Information', exact: false });
        await act(async()=>{
            fireEvent.click(compImfo);
            await screen.findByText("PAN");
        });
        const keyAccount = screen.getByRole('button', { name: 'minus Key Account Details', exact: false });
        await act(async()=>{
            fireEvent.click(keyAccount);
            await screen.findByText("Account Code");
        });
    });
});

describe('CompanyProfileBase Component', () => {
    it('renders in view mode true', () => {
        const mockCustomerData = {
            companyName:"Test Company",
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
      customRender(<CompanyProfileMaster />, {
        initialState: mockStore,
      });
       const viewDetailTitle = screen.getByText('Company Information');
       expect(viewDetailTitle).toBeInTheDocument();
    });
});
describe('CompanyProfileMaster Component', () => {
    const mockCustomerData = {
        companyName:"Test Company",
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
        customRender(<CompanyProfileMaster formActionType={formActionType} saveButtonName={"Save & Next"}/>, {
        initialState: mockStore,
        });

        const pan = screen.getByRole("textbox", { name: 'PAN', exact: false });
        fireEvent.change(pan, { target: { value: 'TESTDMSPAN' } });

        const gstin = screen.getByRole("textbox", { name: 'GSTIN', exact: false });
        fireEvent.change(gstin, { target: { value: 'TESTDMSGSTIN' } });

        const accoutNo = screen.getByRole("textbox", { name: 'Account Code', exact: false });
        fireEvent.change(accoutNo, { target: { value: '01234567890' } });

        const accoutName = screen.getByRole("textbox", { name: 'Account Name', exact: false });
        fireEvent.change(accoutName, { target: { value: 'TestDMS' } });

        const accountSegment = screen.getByRole("textbox", { name: 'Account Segment', exact: false });
        fireEvent.change(accountSegment, { target: { value: 'TestDMS' } });

        const accountClient = screen.getByRole("textbox", { name: 'Account Client Name', exact: false });
        fireEvent.change(accountClient, { target: { value: 'TestDMS' } });

        const accountMapping = screen.getByRole("textbox", { name: 'Account Mapping Date', exact: false });
        fireEvent.change(accountMapping, { target: { value: 'TestDMS' } });

        const categorization = screen.getByRole("combobox", { name: 'Usage/Application Categorization', exact: false });
        fireEvent.change(categorization, { target: { key: 'test', value: 'test' } });

        expect(categorization).toBeInTheDocument();

        const subCategorization = screen.getByRole("combobox", { name: 'Usage/Application Sub-Category', exact: false });
        fireEvent.change(subCategorization, { target: { value: 'TestDMS' } });

        const cust = screen.getByRole("combobox", { name: 'Customer Category', exact: false });
        fireEvent.change(cust, { target: { value: 'TestDMS' } });

    });
 });
// eslint-disable-next-line jest/no-identical-title
describe('CompanyProfileMaster Component', () => {
        const mockCustomerData = {
            companyName:"Test Company",
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
        const mockShowGlobalNotification = jest.fn();
        // Mock the form values
        const formValues = {
            customerConsent: false, 
        };
        it('renders in view mode false', () => {
            customRender(<CompanyProfileMaster showGlobalNotification={mockShowGlobalNotification} formActionType={formActionType} saveButtonName={"Save & Next"} />, {
            initialState: mockStore,
            });
            fireEvent.submit(screen.getByRole('form'), { target: { elements: formValues } });
            expect(mockShowGlobalNotification).toHaveBeenCalledWith({
                notificationType: 'error',
                title: 'Error',
                message: 'Please accept consent.',
                placement: 'bottomRight',
              });
        });
    });


// describe('ViewDetailMain Component', () => {
//   const mockFormData = {
//     panNumber: '123456',
//     gstinNumber: 'ABC123',
//     applicationCategorization: 'APP_CAT_1',
//     applicationSubCategory: 'APP_SUB_CAT_1',
//     customerCategory: 'CUS_CAT_1',
//     businessDetails: 'Some details',
//     // ... other properties
//   };

//   const mockAppCategoryData = {
//     APP_CAT: ['APP_CAT_1', 'APP_CAT_2'],
//     // ... other categories
//   };

//   const mockProps = {
//     formData: mockFormData,
//     isLoading: false,
//     appCategoryData: mockAppCategoryData,
//   };

//   it('expands and collapses panel when clicked', () => {
//     const { getByText, queryByText } = customRender(<ViewDetail {...mockProps} />);
//     const panelHeader = getByText('Company Information');
    
//     // Panel should be collapsed initially
//     expect(queryByText('PAN')).toBeNull();

//     // Click on the panel header to expand
//     fireEvent.click(panelHeader);
    
//     // Panel content should be visible
//     expect(getByText('PAN')).toBeInTheDocument();
    
//     // Click again to collapse
//     fireEvent.click(panelHeader);

//     expect(queryByText('PAN')).toBeNull();
//   });

// });
