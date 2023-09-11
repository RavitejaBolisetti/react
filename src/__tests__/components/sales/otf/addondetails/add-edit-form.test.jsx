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
        const collapse=screen.getAllByRole('img', { name: 'plus', exact: false });
        fireEvent.click(collapse[0]);
        fireEvent.click(collapse[1]);
        fireEvent.click(collapse[2]);
        fireEvent.click(collapse[3]);
        fireEvent.click(collapse[4]);
        const plusAdd=screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(plusAdd);
    });

    
});