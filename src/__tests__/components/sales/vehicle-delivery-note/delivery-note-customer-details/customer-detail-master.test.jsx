import '@testing-library/jest-dom/extend-expect';
import { CustomerDetailsMaster } from '@components/Sales/VehicleDeliveryNote/CustomerDetails/CustomerDetailsMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    };
    return <CustomerDetailsMaster form={myFormMock} {...props} />;
};

describe('Customer Detail Master components', () => {

    it('should render components', () => {
        customRender(<FormWrapper />);
    });

    it('should render components when view mode is true', () => {
        const formActionType = { viewMode: true };
        customRender(<FormWrapper formActionType={formActionType} />);
    });
    
});
