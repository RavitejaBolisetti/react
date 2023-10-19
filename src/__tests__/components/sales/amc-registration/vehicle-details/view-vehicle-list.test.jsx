import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import ViewVehicleList from '@components/Sales/AMCRegistration/VehicleDetails/ViewVehicleList';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [contactform] = Form.useForm();
    const myForm = {
        ...contactform,
        getFieldValue: jest.fn(),
        resetFields: jest.fn(),
        setFieldsValue: jest.fn(),
    };
    return <ViewVehicleList contactform={myForm} {...props} />;
};

afterEach(() => {
    jest.restoreAllMocks();
});

describe('View vehicle list Components', () => {
    it('Should render View vehicle list basic render', () => {
        const contactData = [{ key: 1, value: 'test' }];
        customRender(<FormWrapper contactData={contactData} styles={jest.fn()} setContactData={jest.fn()} setEditingData={jest.fn()}/>);

        const plus = screen.getByRole('img', { name: "plus" })
        fireEvent.click(plus)
        
        const remove = screen.getByRole('button', { name: "Remove" });
        fireEvent.click(remove)
    });
});
