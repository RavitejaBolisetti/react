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
    DLVR_NT_STS: [{ id: 106 }],
};

const formActionType = { addMode: true };

describe('delivery note Main Cotainer component render', () => {
    it('should render main container component', () => {
        customRender(<FormWrapper isVisible={true} formActionType={formActionType} typeData={typeData} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('test1', () => {
        const currentSection = 1;
        customRender(<FormWrapper isVisible={true} formActionType={formActionType} typeData={typeData} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('test2', () => {
        const currentSection = 2;
        customRender(<FormWrapper isVisible={true} typeData={typeData} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('test3', () => {
        const currentSection = 3;
        customRender(<FormWrapper isVisible={true} typeData={typeData} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('test4', () => {
        const currentSection = 4;
        customRender(<FormWrapper isVisible={true} typeData={typeData} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('test5', () => {
        const currentSection = 5;
        customRender(<FormWrapper isVisible={true} typeData={typeData} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('test6', () => {
        const currentSection = 6;
        customRender(<FormWrapper isVisible={true} typeData={typeData} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('test7', () => {
        const currentSection = 7;
        customRender(<FormWrapper isVisible={true} typeData={typeData} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
});
