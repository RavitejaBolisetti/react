import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { OTFMainConatiner } from '@components/Sales/OTF/OTFMainConatiner';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <OTFMainConatiner form={form} {...props} />
}
afterEach(() => {
    jest.restoreAllMocks();
  });
describe("OtfMaster component render",()=>{

    it("should render OtfMaster component",()=>{
        customRender(<OTFMainConatiner isVisible={true} />);
    });

    it("should render Otf details master component",()=>{
        const typeData={
            SALE_TYP: ["Diwali", "Holi"]
        }
        const currentSection=1;
        customRender(<OTFMainConatiner typeData={typeData} isVisible={true} currentSection={currentSection}/>);
    });

    it("should render customer details component",()=>{
        const currentSection=2;
        customRender(<OTFMainConatiner isVisible={true} currentSection={currentSection}/>);
    });

    it("should render vehicle details component",()=>{
        const typeData={
            VEHCL_TYPE: [{name: 'Car'}]
        }
        const currentSection=3;
        customRender(<OTFMainConatiner typeData={typeData} isVisible={true} currentSection={currentSection}/>);
    });

    it("should render scheme and offer details component",()=>{
        const currentSection=4;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection}/>);
    });

    it("should render insurance details component",()=>{
        const currentSection=5;
        customRender(<OTFMainConatiner handleFormValueChange={jest.fn()} isVisible={true} currentSection={currentSection}/>);
    });

    it("should render finance details component",()=>{
        const currentSection=6;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection}/>);
    });

    it("should render exchange vehicle component",()=>{
        const currentSection=7;
        customRender(<OTFMainConatiner isVisible={true} currentSection={currentSection}/>);
    });

    it("should render referrals component",()=>{
        const currentSection=8;
        customRender(<FormWrapper handleFormValueChange={jest.fn()} isVisible={true} currentSection={currentSection}/>);
    });

    it("should render loyalty scheme component",()=>{
        const currentSection=9;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection}/>);
    });

    it("should render invoice information component",()=>{
        const currentSection=10;
        customRender(<OTFMainConatiner isVisible={true} currentSection={currentSection}/>);
    });

    it("should render add on details component",()=>{
        const currentSection=11;
        customRender(<OTFMainConatiner isVisible={true} currentSection={currentSection}/>);
    });

    it("should render thank you page component",()=>{
        const currentSection=12;
        customRender(<OTFMainConatiner isVisible={true} currentSection={currentSection}/>);
    });

});
