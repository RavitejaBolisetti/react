import React from 'react';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import { VehicleInvoiceMainConatiner } from '@components/Sales/VehicleInvoiceGeneration/VehicleInvoiceMainConatiner';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <VehicleInvoiceMainConatiner form={myFormMock} {...props} />;
};

const FormWrapper2 = (props) => {
    const [CustomerForm] = Form.useForm();
    const myFormMock = {
        ...CustomerForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <VehicleInvoiceMainConatiner CustomerForm={myFormMock} {...props} />;
};

describe('Inovice Generation Main Cotainer component render', () => {
    it('should render main container component', () => {
        customRender(<FormWrapper2 isVisible={true} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('should render invoice details component', () => {
        const currentSection = 1;
        customRender(<FormWrapper2 isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('should render vehicle details component', () => {
        const currentSection = 2;
        customRender(<FormWrapper formActionType={{viewMode: false}} isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} typeData={'FNC_ARNGD'} />);
    });
    it('should render vehicle details component 1', () => {
        const currentSection = 3;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('should render vehicle details component 2', () => {
        const currentSection = 4;
        customRender(<FormWrapper typeData={'FNC_ARNGD'} isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('should render vehicle details component 3', () => {
        const currentSection = 5;
        const typeData={ FNC_ARNGD: [{ name: 'Kai' }] }
        customRender(<FormWrapper isVisible={true} typeData={typeData} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('should render vehicle details component 4', () => {
        const currentSection = 6;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('should render vehicle details component 5', () => {
        const currentSection = 7;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('should render vehicle details component 6', () => {
        const currentSection = 8;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
});
