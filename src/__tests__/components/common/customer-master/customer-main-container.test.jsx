import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { CustomerMainConatiner } from 'components/common/CustomerMaster/CustomerMainConatiner';
import { Form } from 'antd';

const props = {
    formActionType: { addMode: true },
    resetViewData: jest.fn(),
};

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('components/common/CustomerMaster/LeftSidebar', () => {
    return {
        __esModule: true,
        LeftSidebar: () => null,
    };
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        getFieldValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <CustomerMainConatiner form={myFormMock} {...props} />;
};

describe('Customer Main Container component', () => {
    it('should render the customer main container component', () => {
        customRender(<FormWrapper isVisible={true} resetViewData={jest.fn()} {...props} />);
    });

    it('should render the IndivisualCustomerDetailMaster component', () => {
        customRender(<FormWrapper isVisible={true} customerType={'IND'} currentSection={1} {...props} />);
    });

    it('should render the IndividualProfileMaster component', () => {
        customRender(<FormWrapper isVisible={true} customerType={'IND'} currentSection={2} {...props} />);
    });

    it('should render the IndividualAddressMaster component', () => {
        customRender(<FormWrapper isVisible={true} customerType={'IND'} currentSection={3} {...props} />);
    });

    it('should render the IndividualContactMaster component', () => {
        customRender(<FormWrapper isVisible={true} customerType={'IND'} currentSection={4} {...props} />);
    });

    it('should render the IndividualFamilyDetailMaster component', () => {
        customRender(<FormWrapper isVisible={true} customerType={'IND'} currentSection={5} {...props} />);
    });

    it('should render the IndividualAccountRelatedMaster component', () => {
        customRender(<CustomerMainConatiner isVisible={true} customerType={'IND'} currentSection={6} {...props} />);
    });

    it('should render the IndividualSupportingDocument component', () => {
        customRender(<FormWrapper isVisible={true} customerType={'IND'} currentSection={7} {...props} />);
    });

    it('should return empty individual', () => {
        customRender(<FormWrapper isVisible={true} customerType={'IND'} currentSection={0} {...props} />);
    });

    it('should render the CorporateCustomerDetailMaster component', () => {
        customRender(<FormWrapper isVisible={true} customerType={'CRP'} currentSection={1} {...props} />);
    });

    it('should render the CorporateCompanyProfileMaster component', () => {
        customRender(<FormWrapper isVisible={true} customerType={'CRP'} currentSection={2} {...props} />);
    });

    it('should render the CorporateCompanyAddressMaster component', () => {
        customRender(<FormWrapper isVisible={true} customerType={'CRP'} currentSection={3} {...props} />);
    });

    it('should render the CorporateContactMaster component', () => {
        customRender(<FormWrapper isVisible={true} customerType={'CRP'} currentSection={4} {...props} />);
    });

    it('should render the CorporateAccountRelatedMaster component', () => {
        customRender(<FormWrapper isVisible={true} customerType={'CRP'} currentSection={5} {...props} />);
    });

    it('should render the corporate IndividualSupportingDocument component', () => {
        customRender(<FormWrapper isVisible={true} customerType={'CRP'} currentSection={6} {...props} />);
    });

    it('should return empty corporate', () => {
        customRender(<FormWrapper isVisible={true} customerType={'CRP'} currentSection={0} {...props} />);
    });
});
