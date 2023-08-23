import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen, act, getAllByRole } from '@testing-library/react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';
import { AddEditForm } from 'components/common/CustomerMaster/IndividualCustomer/FamilyDetail/AddEditForm';


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
    return <AddEditForm form={myFormMock} {...props} />;
}

describe('Family Detail Add edit form component', () => {

    it("should render the edit form components", () => {
        const props = {
            isViewModeVisible: false,
            VIEW_ACTION: false,
            showForm: false,
        }
        const familyDetailList = [{ id: 1, value: 'test', mnmCustomer: "Yes", firstName: "test", middleName: "test" },
        { id: 2, value: 'test', mnmCustomer: "No", firstName: "last", middleName: "test" }]

        customRender(<FormWrapper
            {...props}
            familyDetailList={familyDetailList}
            onEdit={jest.fn()}
            setEditedMode={jest.fn()}
            setInitialVal={jest.fn()}
            setEditedValues={jest.fn()}
            onCollapseChange={jest.fn()}
            setShowForm={jest.fn()}
            setCustomerType={jest.fn()}
        />);

        const edit = screen.getAllByRole('button', { name: "Edit" });
        fireEvent.click(edit[0]);
        fireEvent.click(edit[1]);
    })


    it("should render the edit true and form container components", () => {
        const props = {
            isViewModeVisible: false,
            VIEW_ACTION: false,
            showForm: false,
            editedMode: true
        }
        const familyDetailList = [{ id: 1, value: 'test', mnmCustomer: "Yes", firstName: "test", middleName: "test" },
        { id: 2, value: 'test', mnmCustomer: "No", firstName: "last", middleName: "test" }]

        customRender(<FormWrapper
            {...props}
            familyDetailList={familyDetailList}
            onEdit={jest.fn()}
            setEditedMode={jest.fn()}
            setInitialVal={jest.fn()}
            setEditedValues={jest.fn()}
            onCollapseChange={jest.fn()}
            setShowForm={jest.fn()}
            setCustomerType={jest.fn()}
            setactiveKey={jest.fn()}
        />);

        const imgPlus = screen.getAllByRole('img');
        fireEvent.click(imgPlus[0]);
        fireEvent.click(imgPlus[1]);
        fireEvent.click(imgPlus[2]);
    })
})