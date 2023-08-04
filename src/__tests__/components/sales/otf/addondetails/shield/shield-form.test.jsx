import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, logRoles } from '@testing-library/react';
import ShieldForm from 'components/Sales/OTF/AddOnDetails/Shield/ShieldForm';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [shieldForm]=Form.useForm();
    return <ShieldForm shieldForm={shieldForm} {...props} />
}

describe('Shield Form Component', () => {
    it('should render shield form component', () => {
        customRender(<FormWrapper />);
    });

    it('shield form input should work', () => {
        customRender(<FormWrapper setformDataSetter={jest.fn}/>);
        const shieldInput=screen.getByRole('textbox', { name: 'Shield'});
        fireEvent.change(shieldInput, { target: { value: 'Test' }})
    });
});
