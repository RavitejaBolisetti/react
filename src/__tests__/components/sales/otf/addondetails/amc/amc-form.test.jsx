import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import AMCForm from 'components/Sales/OTF/AddOnDetails/AMC/AMCForm';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [amcForm] = Form.useForm();
    return <AMCForm amcForm={amcForm} {...props} />;
};

describe('AMC Form Component', () => {
    it('should render amc form component', () => {
        customRender(<AMCForm />);
    });

    it('amc form input should work', () => {
        customRender(<FormWrapper setformDataSetter={jest.fn} setFormDataSetter={jest.fn()} />);
        const amcInput = screen.getByRole('textbox', { name: 'AMC' });
        fireEvent.change(amcInput, { target: { value: 'Test' } });
    });
});
