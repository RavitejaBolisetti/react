import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { render, screen } from '@testing-library/react';
import { CustomerMainConatiner } from 'components/common/CustomerMaster/CustomerMainConatiner';
import { LeftSidebar } from 'components/common/CustomerMaster/LeftSidebar';
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
    };
    return <CustomerMainConatiner form={myFormMock} {...props} />;
};

describe('Customer Main Container component', () => {
    it('should render the customer main container component', () => {
        customRender(<CustomerMainConatiner isVisible={true} resetViewData={jest.fn()} {...props} />);
    });

    it('should render the IndivisualCustomerDetailMaster component', () => {
        customRender(<FormWrapper isVisible={true} customerType={'IND'} currentSection={1} {...props} />);
    });

    it('should render the IndividualProfileMaster component', () => {
        customRender(<CustomerMainConatiner isVisible={true} customerType={'IND'} currentSection={2} {...props} />);
    });

    it('should render the IndividualAddressMaster component', () => {
        customRender(<CustomerMainConatiner isVisible={true} customerType={'IND'} currentSection={3} {...props} />);
    });

    it('should render the IndividualContactMaster component', () => {
        customRender(<CustomerMainConatiner isVisible={true} customerType={'IND'} currentSection={4} {...props} />);
    });

    it('should render the IndividualFamilyDetailMaster component', () => {
        customRender(<CustomerMainConatiner isVisible={true} customerType={'IND'} currentSection={5} {...props} />);
    });

    it('should render the IndividualAccountRelatedMaster component', () => {
        customRender(<CustomerMainConatiner isVisible={true} customerType={'IND'} currentSection={6} {...props} />);
    });

    it('should render the IndividualSupportingDocument component', () => {
        customRender(<CustomerMainConatiner isVisible={true} customerType={'IND'} currentSection={7} {...props} />);
    });

    it('should return empty individual', () => {
        customRender(<CustomerMainConatiner isVisible={true} customerType={'IND'} currentSection={0} {...props} />);
    });

    it('should render the CorporateCustomerDetailMaster component', () => {
        customRender(<CustomerMainConatiner isVisible={true} customerType={'CRP'} currentSection={1} {...props} />);
    });

    it('should render the CorporateCompanyProfileMaster component', () => {
        customRender(<CustomerMainConatiner isVisible={true} customerType={'CRP'} currentSection={2} {...props} />);
    });

    it('should render the CorporateCompanyAddressMaster component', () => {
        customRender(<CustomerMainConatiner isVisible={true} customerType={'CRP'} currentSection={3} {...props} />);
    });

    it('should render the CorporateContactMaster component', () => {
        customRender(<CustomerMainConatiner isVisible={true} customerType={'CRP'} currentSection={4} {...props} />);
    });

    it('should render the CorporateAccountRelatedMaster component', () => {
        customRender(<CustomerMainConatiner isVisible={true} customerType={'CRP'} currentSection={5} {...props} />);
    });

    it('should render the corporate IndividualSupportingDocument component', () => {
        customRender(<CustomerMainConatiner isVisible={true} customerType={'CRP'} currentSection={6} {...props} />);
    });

    it('should return empty corporate', () => {
        customRender(<CustomerMainConatiner isVisible={true} customerType={'CRP'} currentSection={0} {...props} />);
    });
});
