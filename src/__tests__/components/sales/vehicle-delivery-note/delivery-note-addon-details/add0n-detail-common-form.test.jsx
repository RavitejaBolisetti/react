import '@testing-library/jest-dom/extend-expect';
import CommonForm from '@components/Sales/VehicleDeliveryNote/AddOnDetails/CommonForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [shieldForm] = Form.useForm();
    const myFormMock = {
        ...shieldForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <CommonForm shieldForm={myFormMock} {...props} />;
};

const typeData = {
    DLVR_SALE_TYP: [
        { key: '1', value: 'Finance Option 1' },
        { key: '2', value: 'Finance Option 2' },
    ],
};

describe('AddOn Detail Common Form components', () => {
    it('should render components', () => {
        customRender(<FormWrapper typeData={typeData} openAccordian={'AMC'} />);
    });
});
