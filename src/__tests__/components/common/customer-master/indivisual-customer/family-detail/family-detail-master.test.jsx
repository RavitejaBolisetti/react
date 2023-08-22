import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen, act } from '@testing-library/react';
import { FamilyDetailMaster } from 'components/common/CustomerMaster/IndividualCustomer/FamilyDetail/FamilyDetailMaster';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';
import { AddEditForm } from 'components/common/CustomerMaster/IndividualCustomer/FamilyDetail/AddEditForm';
import { FormContainer } from 'components/common/CustomerMaster/IndividualCustomer/FamilyDetail/FormContainer';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        resetData: jest.fn(),
        validateFields: jest.fn()
    }
    return <FamilyDetailMaster form={myFormMock} {...props} />;
};

const FormWrapperAddEdit = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        resetData: jest.fn(),
        validateFields: jest.fn()
    }
    return <AddEditForm form={myFormMock} {...props} />;
};

const FormWrapperContainer = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        resetData: jest.fn(),
        validateFields: jest.fn()
    }
    return <FormContainer form={myFormMock} {...props} />;
};


describe('Family Detail Master component', () => {

    it('should render the family detail master component', () => {
        customRender(<FamilyDetailMaster />);
    });


    it("should render the family detail master no data component", async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CustomerMaster: {
                    FamilyDetails: {
                        isLoaded: false, isLoading: false, data: []
                    }
                }
            }
        });

        const props = {
            isVisible: true,
            setButtonData: jest.fn(),
            isViewModeVisible: false,
            showForm: true,
            editedMode: false,
            selectedCustomerId: 'testid'
        }

        customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    {...props}
                    onCancel={jest.fn()}
                    onSave={jest.fn()}
                    onSearch={jest.fn()}
                    onFinishFailed={jest.fn()}
                    onFinish={jest.fn()}
                    handleFormValueChange={jest.fn()}
                    onCollapseChange={jest.fn()}
                    addFunction={jest.fn()}
                    handleButtonClick={jest.fn()}
                />
            </Provider>
        );

        const plusAdd = screen.getByRole('button', { name: 'plus Add' });

        fireEvent.click(plusAdd);


        const save = screen.getByRole('button', { name: 'Save' });

        fireEvent.click(save);


        const cancel = screen.getByRole('button', { name: 'Cancel' });

        fireEvent.click(cancel);


        const plusImg = screen.getByRole('img', { name: 'plus' });
        expect(plusImg).toBeInTheDocument();

    })


    it("should render the family detail master click add button component", async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CustomerMaster: {
                    FamilyDetails: {
                        isLoaded: true, data: [{ id: 1, value: 'test' }, { id: 2, value: 'test3' }, { id: 3, value: 'test2' }]
                    },
                    FamilyDetailSearch: { isLoading: true, data: [{ id: 2, value: 'test3' }] },
                }
            }
        });

        const props = {
            isVisible: true,
            setButtonData: jest.fn(),
            isViewModeVisible: false,
            editedMode: true,
            setFamilyDetailsList: jest.fn(),
            selectedCustomerId: 'testid',
            listFamilyDetailsShowLoading: jest.fn(),
            listShowLoading: jest.fn(),
            familyDetailList: [{ id: 1, value: 'test', mnmCustomer: "Yes", firstName: "test", middleName: "test" }, { id: 2, value: 'test1', mnmCustomer: "No" }, { id: 3, value: 'test2' }],
            familyData: [{ id: 1, value: 'test' }, { id: 2, value: 'test1' }, { id: 3, value: 'test2' }],
            relationData: [{
                id: "testId",
                key: "F",
                parentKey: "FAMLY_RELTN",
                value: "Father"
            }, {
                id: "testId1",
                key: "F2",
                parentKey: "FAMLY_RELTN",
                value: "Father"
            }]
        }

        customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    {...props}
                    onErrorAction={jest.fn()}
                    addFunction={jest.fn()}
                    onCancel={jest.fn()}
                    onSave={jest.fn()}
                    onSearch={jest.fn()}
                    onFinishFailed={jest.fn()}
                    onFinish={jest.fn()}
                    handleFormValueChange={jest.fn()}
                    onCollapseChange={jest.fn()}
                    handleButtonClick={jest.fn()}
                    onChange={jest.fn()}
                    setactiveKey={jest.fn()}
                    VIEW_ACTION={false}
                    showForm={false}
                    onDateChange={jest.fn()}
                    getRelationCode={jest.fn()}
                />
            </Provider>
        );

        const plusAdd = screen.getAllByRole('button');
        fireEvent.click(plusAdd[0]);
        expect(screen.getByText('Add')).toBeInTheDocument()

        const customerId = screen.getByRole("textbox", { name: 'Customer Id', exact: false });
        fireEvent.change(customerId, { target: { value: '1324' } });

        const customerName = screen.getByRole("textbox", { name: 'Customer Name', exact: false });
        fireEvent.change(customerName, { target: { value: '1324' } });

        const dob = screen.getByRole("textbox", { name: 'Date of Birth', exact: false });
        fireEvent.change(dob, { target: { value: '25' } });

        const age = screen.getByRole("textbox", { name: 'Age', exact: false });
        fireEvent.change(age, { target: { value: '25' } });

        const remarks = screen.getByRole("textbox", { name: 'Remark', exact: false });
        fireEvent.change(remarks, { target: { value: '25' } });

        const customer = screen.getByRole("combobox", { name: 'M&M Customer', exact: false });
        fireEvent.change(customer, { target: { value: 'Yes' } });

        const relationship = screen.getByRole("combobox", { name: 'Relationship', exact: false });
        fireEvent.change(relationship, { target: { value: '25' } });

    })

    it("should render the family detail master view component", async () => {


        const props = {
            isVisible: true,
            setButtonData: jest.fn(),
            isViewModeVisible: true,
            setFamilyDetailsList: jest.fn(),
            selectedCustomerId: 'testid',
            listFamilyDetailsShowLoading: jest.fn(),
            listShowLoading: jest.fn(),

        }

        customRender(
            <AddEditForm
                {...props}
                mnmCustomer={"Yes"}
            />
        );


        const mnmCustomer = screen.getByRole('columnheader', { name: 'M&M Customer' });
        expect(mnmCustomer).toBeInTheDocument();

        const customerName = screen.getByRole('columnheader', { name: 'Customer Name' });
        expect(customerName).toBeInTheDocument();

        const relationship = screen.getByRole('columnheader', { name: 'Relationship' });
        expect(relationship).toBeInTheDocument();

        const dob = screen.getByRole('columnheader', { name: 'Date of Birth' });
        expect(dob).toBeInTheDocument();

        const age = screen.getByRole('columnheader', { name: 'Age' });
        expect(age).toBeInTheDocument();

        const remark = screen.getByRole('columnheader', { name: 'Remark' });
        expect(remark).toBeInTheDocument();
    })


    it('should select  M&M customer', async () => {

        const type = [
            { name: 'Yes', key: 'Yes', value: 'Yes' },
            { name: 'No', key: 'No', value: 'No' },
        ];

        const relationData = [{
            id: "testId",
            key: "F",
            parentKey: "FAMLY_RELTN",
            value: "Father"
        }, {
            id: "testId1",
            key: "F2",
            parentKey: "FAMLY_RELTN",
            value: "Father"
        }]


        customRender(<FormWrapperContainer
            editedMode={false}
            showForm={true}
            type={type}
            relationData={relationData}
            onChange={jest.fn()}
            getRelationCode={jest.fn()}
            onCancel={jest.fn()}
            onSave={jest.fn()}
            relationCustomerId={"test"}
            editedId={"test"}
            id={"testid"}
            customerId={"test"}
            onDateChange={jest.fn()}
            customerType={"Yes"}
            onFinishFailed={jest.fn()}
            setFamilyDetailsList={jest.fn()}
        />);



        const customer = screen.getByRole('combobox', { name: 'M&M Customer' });
        fireEvent.change(customer, { target: { value: "No" } });
        act(() => {

            fireEvent.change(customer, { target: { value: 'Yes' } });

            const kai = screen.getByText('M&M Customer');

            fireEvent.click(kai);

        });


        const relationship = screen.getByRole('combobox', { name: 'Relationship' });
        fireEvent.change(relationship, { target: { value: "Father" } });
        act(() => {
            fireEvent.change(customer, { target: { value: 'MOTHER' } });

            const kai1 = screen.getByText('Relationship');

            fireEvent.click(kai1);

        });

        const cancel = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancel);

        const save = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(save);

    });

    it('should select customer type no', async () => {
        
        const type = [
            { name: 'Yes', key: 'Yes', value: 'Yes' },
            { name: 'No', key: 'No', value: 'No' },
        ];

        const relationData = [{
            id: "testId",
            key: "F",
            parentKey: "FAMLY_RELTN",
            value: "Father"
        }, {
            id: "testId1",
            key: "F2",
            parentKey: "FAMLY_RELTN",
            value: "Father"
        }]


        customRender(<FormWrapperContainer
            editedMode={false}
            showForm={true}
            type={type}
            relationData={relationData}
            onChange={jest.fn()}
            getRelationCode={jest.fn()}
            onCancel={jest.fn()}
            onSave={jest.fn()}
            relationCustomerId={"test"}
            editedId={"test"}
            id={"testid"}
            customerId={"test"}
            onDateChange={jest.fn()}
            customerType={"No"}
        />);



        const customer = screen.getByRole('combobox', { name: 'M&M Customer' });
        fireEvent.change(customer, { target: { value: "No" } });
        act(() => {

            fireEvent.change(customer, { target: { value: 'Yes' } });

            const kai = screen.getByText('M&M Customer');

            fireEvent.click(kai);

        });


        const relationship = screen.getByRole('combobox', { name: 'Relationship' });
        fireEvent.change(relationship, { target: { value: "Father" } });
        act(() => {
            fireEvent.change(customer, { target: { value: 'MOTHER' } });

            const kai1 = screen.getByText('Relationship');

            fireEvent.click(kai1);

        });

        const cancel = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancel);

        const save = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(save);
    });

    it('should add edit mode true and showform mode false', async () => {

        customRender(<FormWrapperAddEdit
            editedMode={true}
            showForm={false}
            onEdit={jest.fn()}
            VIEW_ACTION={false}
            disabled={true}
            onCollapseChange={jest.fn()}
        />);
    });
})