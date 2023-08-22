import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, render } from '@testing-library/react';
import { ViewDetail } from 'components/Sales/OTF/AddOnDetails/ViewDetail';
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
    return <ViewDetail accessoryForm={accessoryForm} rsaForm={rsaForm} amcForm={amcForm} fmsForm={fmsForm} shieldForm={shieldForm} {...props} />
}
describe('View Detail Component', () => {

    const styles={
        viewDrawerContainer:''
    }

    it('should render view detail components', () => {
        const formData={
            partDetailsResponses: [{
                partDescription: '',
                partNumber: '',
                requiredQuantity: '',
                type: '',
                mrp: '',
                sellingPrice: '',
            }]
        }

        render(<FormWrapper styles={styles} formData={formData} handleCollapses={jest.fn()} handleCollapse={jest.fn()} />)
        const plusShield=screen.getByRole('button', { name: /plus Shield/i });
        fireEvent.click(plusShield);
        const plusRSA=screen.getByRole('button', { name: /plus RSA/i });
        fireEvent.click(plusRSA);
        const plusAMC=screen.getByRole('button', { name: /plus AMC/i  });
        fireEvent.click(plusAMC);
        const plusFMS=screen.getByRole('button', { name: /plus FMS/i });
        fireEvent.click(plusFMS);
        const plusAccessories=screen.getByRole('button', { name: /plus Accessories Information/i });
        fireEvent.click(plusAccessories);
        const plusAccessoriesInner=screen.getByRole('button', { name: /NA | NA Required Quantity: NA/i });
        fireEvent.click(plusAccessoriesInner);
    });
});