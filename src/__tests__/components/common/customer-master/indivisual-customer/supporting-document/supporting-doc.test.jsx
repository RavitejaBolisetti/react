import '@testing-library/jest-dom/extend-expect';

import customRender from '@utils/test-utils';
import { Form } from 'antd';

import { IndividualSupportingDocumentMaster } from '@components/common/CustomerMaster/IndividualCustomer/SupportingDocument/SupportingDocument';

beforeEach(() => {
    jest.clearAllMocks();
});
const props = {
    formActionType: { viewMode: true },
};

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <IndividualSupportingDocumentMaster form={myFormMock} {...props} />;
};
describe('Common component', () => {
    it('should render the common contact component', () => {
        customRender(<FormWrapper isVisible={true} {...props} />);
    });

    it('should render the component when viewmode is false', () => {
        const formActionType = { viewMode: false };
        customRender(<FormWrapper isVisible={true} formActionType={formActionType} />);
    });
});
