import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, render } from '@testing-library/react';
import { AddEditForm } from 'components/Sales/OTF/AddOnDetails/AddEditForm';
import { Form } from 'antd';
afterEach(() => {
    jest.restoreAllMocks();
  }); 
const FormWrapper = (props) => {
    const [accessoryForm] = Form.useForm();
    const [shieldForm]=Form.useForm();
    const [rsaForm] = Form.useForm();
    const [amcForm] = Form.useForm();
    const [fmsForm] = Form.useForm();
    return <AddEditForm accessoryForm={accessoryForm} rsaForm={rsaForm} amcForm={amcForm} fmsForm={fmsForm} shieldForm={shieldForm} {...props} />
}

describe('Add Edit Form Component', () => {
    it('should render add edit form components', () => {
        customRender(<AddEditForm setformDataSetter={jest.fn()} />);
    });

    it('collapse should work', () => {
        const formData = {
            shield: true
        };

        render(<FormWrapper handleCollapse={jest.fn()} formData={formData} setformDataSetter={jest.fn()} />)
        const plusShield=screen.getByRole('button', { name: 'plus Shield', exact: false });
        fireEvent.click(plusShield);
        const plusRSA=screen.getByRole('button', { name: 'plus RSA', exact: false });
        fireEvent.click(plusRSA);
        const plusAMC=screen.getByRole('button', { name: 'plus AMC', exact: false });
        fireEvent.click(plusAMC);
        const plusFMS=screen.getByRole('button', { name: 'plus FMS', exact: false });
        fireEvent.click(plusFMS);
        const plusAccessories=screen.getByRole('button', { name: 'plus Accessories Information plus Add', exact: false });
        fireEvent.click(plusAccessories);
        const plusAdd=screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(plusAdd);
    });

    
});