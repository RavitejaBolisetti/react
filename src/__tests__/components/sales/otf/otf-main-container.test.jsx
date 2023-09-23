import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { OTFMainConatiner } from '@components/Sales/OTF/OTFMainConatiner';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        getFieldValue: jest.fn(),
        setFieldsValue: jest.fn(),
    };
    return <OTFMainConatiner form={myFormMock} {...props} />;
};
afterEach(() => {
    jest.restoreAllMocks();
});
describe('OtfMaster component render', () => {
    it('should render OtfMaster component', () => {
        customRender(<FormWrapper isVisible={true} handleFormValueChange={jest.fn()} />);
    });

    it('should render Otf details master component', () => {
        const typeData = {
            SALE_TYP: ['Diwali', 'Holi'],
        };
        const currentSection = 1;
        customRender(<FormWrapper typeData={typeData} isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} />);
    });

    it('should render customer details component', () => {
        const currentSection = 2;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} />);
    });

    it('should render vehicle details component', () => {
        const typeData = {
            VEHCL_TYPE: [{ name: 'Car' }],
        };
        const currentSection = 3;
        customRender(<FormWrapper typeData={typeData} isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} />);
    });

    it('should render scheme and offer details component', () => {
        const currentSection = 4;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} />);
    });

    it('should render insurance details component', () => {
        const currentSection = 5;
        customRender(<FormWrapper handleFormValueChange={jest.fn()} isVisible={true} currentSection={currentSection} />);
    });

    it('should render finance details component', () => {
        const currentSection = 6;
        const typeData={
            FNC_ARNGD: [{name: 'Kai'}]
        }
        customRender(<FormWrapper isVisible={true} typeData={typeData} currentSection={currentSection} handleFormValueChange={jest.fn()} />);
    });

    it('should render exchange vehicle component', () => {
        const currentSection = 7;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} />);
    });

    it('should render referrals component', () => {
        const currentSection = 8;
        customRender(<FormWrapper handleFormValueChange={jest.fn()} isVisible={true} currentSection={currentSection} />);
    });

    it('should render loyalty scheme component', () => {
        const currentSection = 9;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} />);
    });

    it('should render invoice information component', () => {
        const currentSection = 10;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} />);
    });

    it('should render add on details component', () => {
        const currentSection = 11;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} />);
    });

    it('should render thank you page component', () => {
        const currentSection = 12;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} />);
    });
});
