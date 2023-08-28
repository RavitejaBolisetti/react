import React from 'react';
import customRender from '@utils/test-utils';
import { CustomerDetailMaster } from '@components/common/CustomerMaster/CorporateCustomer/CustomerDetail/CustomerDetailMaster';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

beforeEach(() => {
    jest.clearAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
    };
    return <CustomerDetailMaster form={myFormMock} {...props} />;
};

const buttonData = {
    cancelBtn: false,
    changeHistory: true,
    closeBtn: true,
    editBtn: true,
    formBtnActive: false,
    nextBtn: true,
    saveAndNewBtn: false,
    saveAndNewBtnClicked: false,
    saveBtn: false,
};

const props = {
    styles: jest.fn(),
    isLoading: false,
    buttonData: buttonData,
    showGlobalNotification: jest.fn(),
    fetchList: jest.fn(),
    onSuccessAction: jest.fn(),
    onFinish: jest.fn(),
    fetchCustomerParentCompanyList: jest.fn(),
    onError: jest.fn(),
    listShowLoading: jest.fn(),
    isDataLoaded: true,
    setFormData: jest.fn(),
    setRefershData: jest.fn(),
    customerDetailsData: [
        { id: 252, value: 'test2' },
        { id: 25, value: 'test' },
    ],
};

const formActionType = {
    addMode: false,
    editMode: true,
    viewMode: true,
};
const formActionTypeAdd = {
    addMode: false,
    editMode: true,
    viewMode: false,
};

const dcorporateLovData = [
    {
        key: 'test',
        parentKey: null,
        value: 'AZX Corporate',
    },
    {
        key: 'test1',
        parentKey: null,
        value: 'AZX Corporate',
    },
    {
        key: 'test2',
        parentKey: null,
        value: 'AZX Corporate',
    },
];

describe('customer details master', () => {
    const mockStore = createMockStore({
        auth: { userId: '1234' },
        data: {
            CustomerMaster: {
                CustomerDetails: {
                    isLoaded: false,
                    isLoading: false,
                    data: [
                        { id: 123, value: 'testDMS' },
                        { id: 32, value: 'testDMS' },
                    ],
                },
                Corporate: { isFilteredListLoaded: false, isLoading: false, filteredListData: dcorporateLovData },
                CustomerParentCompany: {
                    isLoaded: false,
                    isCustomerParentCompanyLoading: false,
                    data: [
                        { id: 123, value: 'testDMS' },
                        { id: 1313, value: 'testDMS' },
                    ],
                },
            },
            ConfigurableParameterEditing: {
                filteredListData: [
                    { id: 123, value: 'testDMS' },
                    { id: 321, value: 'testDMS' },
                ],
            },
        },
    });
    it('should render customer details View details', async () => {
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} formActionType={formActionType} handleButtonClick={jest.fn()} onHandleSelect={jest.fn()} validateParentCode={jest.fn()} />
            </Provider>
        );

        const close = screen.getByRole('button', { name: 'Close', exact: false });
        fireEvent.click(close);

        const viewHistory = screen.getByRole('button', { name: 'View History', exact: false });
        fireEvent.click(viewHistory);

        const edit = screen.getByRole('button', { name: 'Edit', exact: false });
        fireEvent.click(edit);

        const next = screen.getByRole('button', { name: 'Next', exact: false });
        fireEvent.click(next);
    });

    it('should render customer details add edit form', async () => {
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} formActionType={formActionTypeAdd} handleCorporateChange={jest.fn()} validateParentCode={jest.fn()} handleButtonClick={jest.fn()} setCorporateType={jest.fn()} onHandleSelect={jest.fn()} />
            </Provider>
        );

        const mobileNo = screen.getByRole('textbox', { name: 'Mobile Number', exact: false });
        fireEvent.change(mobileNo, { target: { value: '01999284948' } });

        const companyName = screen.getByRole('textbox', { name: 'Company Name', exact: false });
        fireEvent.change(companyName, { target: { value: 'test company' } });

        const parentCompanyCode = screen.getByRole('textbox', { name: 'Parent Company Code', exact: false });
        fireEvent.change(parentCompanyCode, { target: { value: '87387' } });

        const parentCompanyName = screen.getByRole('textbox', { name: 'Parent Company Name', exact: false });
        fireEvent.change(parentCompanyName, { target: { value: 'parent company test' } });

        // const customerType = screen.getByRole("combobox", { name: 'Customer Type', exact: false });
        // fireEvent.change(customerType, { target: { value: 'test' } });

        const corporateType = screen.getByRole('combobox', { name: 'Corporate Type', exact: false });
        fireEvent.change(corporateType, { target: { value: 'test' } });

        const corporateName = screen.getByRole('combobox', { name: 'Corporate Name', exact: false });
        fireEvent.change(corporateName, { target: { value: 'test' } });

        const corporateCategory = screen.getByRole('combobox', { name: 'Corporate Category', exact: false });
        fireEvent.change(corporateCategory, { target: { value: 'test' } });

        const close = screen.getByRole('button', { name: 'Close', exact: false });
        fireEvent.click(close);

        const viewHistory = screen.getByRole('button', { name: 'View History', exact: false });
        fireEvent.click(viewHistory);

        const edit = screen.getByRole('button', { name: 'Edit', exact: false });
        fireEvent.click(edit);

        const next = screen.getByRole('button', { name: 'Next', exact: false });
        fireEvent.click(next);
    });
});
