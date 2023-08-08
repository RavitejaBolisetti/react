import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, logRoles } from '@testing-library/react';
import RSAForm from 'components/Sales/OTF/AddOnDetails/RSA/RSAForm';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [rsaForm] = Form.useForm();
    return <RSAForm rsaForm={rsaForm} {...props} />
}

describe('RSA Form Component', () => {
    it('should render rsa form component', () => {
        customRender(<RSAForm />);
    });

    it('rsa form input should work', () => {
        customRender(<FormWrapper setformDataSetter={jest.fn}/>);
        const rsaInput=screen.getByRole('textbox', { name: 'RSA'});
        fireEvent.change(rsaInput, { target: { value: 'Test' }})
    });
});
