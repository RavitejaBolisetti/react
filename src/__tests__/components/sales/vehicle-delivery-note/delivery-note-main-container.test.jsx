import React from 'react';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import { VehicleDeliveryNoteMainConatiner } from '@components/Sales/VehicleDeliveryNote/VehicleDeliveryNoteMainConatiner';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <VehicleDeliveryNoteMainConatiner form={myFormMock} {...props} />;
};

const typeData = {
    DLVR_NT_STS: [
        { key: '1', value: 'Finance Option 1' },
        { key: '2', value: 'Finance Option 2' },
    ],
};

const formActionType = { addMode: true };

describe('Delivery Note Main Cotainer component render', () => {
    it('should render main container component', () => {
        customRender(<FormWrapper isVisible={true} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} typeData={typeData} formActionType={formActionType} />);
    });
    it('should render invoice details component', () => {
        const currentSection = 1;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} typeData={typeData} formActionType={formActionType} />);
    });
    it('should render customer details component', () => {
        const currentSection = 2;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} typeData={typeData} formActionType={formActionType} />);
    });
    it('should render vehicle details component', () => {
        const currentSection = 3;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} typeData={typeData} formActionType={formActionType} />);
    });
    it('should render finance details component', () => {
        const currentSection = 4;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} typeData={typeData} formActionType={formActionType} />);
    });
    it('should render insurance details component', () => {
        const currentSection = 5;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} typeData={typeData} formActionType={formActionType} />);
    });
    it('should render addon details component', () => {
        const currentSection = 6;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} typeData={typeData} formActionType={formActionType} />);
    });
    it('should render deliverable details component', () => {
        const currentSection = 7;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} typeData={typeData} formActionType={formActionType} />);
    });
});
