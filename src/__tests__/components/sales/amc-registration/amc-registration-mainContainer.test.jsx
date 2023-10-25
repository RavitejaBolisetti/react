import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import {AMCRegistrationMainContainer} from '@components/Sales/AMCRegistration/AMCRegistrationMainContainer';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [registrationForm, customerForm] = Form.useForm();
    const myForm = {
        ...registrationForm,
        ...customerForm,
        getFieldValue: jest.fn(),
        resetFields: jest.fn(),
        setFieldsValue: jest.fn().mockReturnValue('saleType'),
    };
    return <AMCRegistrationMainContainer registrationForm={myForm} customerForm={myForm} {...props} />;
};

describe('Amc registration main container Components', () => {
    it('Should render Amc registration main container basic render', () => {
        customRender(<FormWrapper isVisible={true} fetchSchemeList={jest.fn()} currentSection={"1"} />);

        const plus = screen.getAllByRole('img', { name: "plus" })
        fireEvent.click(plus[0])
    });

});
