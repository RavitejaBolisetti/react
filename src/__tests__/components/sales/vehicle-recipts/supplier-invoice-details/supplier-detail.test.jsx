import '@testing-library/jest-dom/extend-expect';
import { SupplierInvoiceDetailsMaster } from '@components/Sales/VehicleReceipt/SupplierInvoiceDetail/SupplierInvoiceMaster';
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
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <SupplierInvoiceDetailsMaster form={myFormMock} {...props} />;
};

describe('Term Condition Manufacturer supplier invoice master components', () => {
    it('should render components', () => {
        customRender(<FormWrapper setButtonData={jest.fn()} />);
    });

    it('should render components when vieMode is true', () => {
        const props = { formActionType: { viewMode: true } };
        customRender(<SupplierInvoiceDetailsMaster setButtonData={jest.fn()} {...props} />);
    });
});
