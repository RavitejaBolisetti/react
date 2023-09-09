import React from 'react';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import { VehicleReceiptMainConatiner } from '@components/Sales/VehicleReceipt/VehicleReceiptMainConatiner';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <VehicleReceiptMainConatiner form={myFormMock} {...props} />;
};

describe('Recipt Main Cotainer component render', () => {
    it('should render main container component', () => {
        customRender(<FormWrapper isVisible={true} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('should render invoice details component', () => {
        const currentSection = 1;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('should render vehicle details component', () => {
        const currentSection = 2;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
});
