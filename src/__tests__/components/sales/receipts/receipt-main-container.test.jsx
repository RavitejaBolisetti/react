import React from 'react';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import { ReceiptMainConatiner } from '@components/Sales/Receipts/ReceiptMainConatiner';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <ReceiptMainConatiner form={myFormMock} {...props} />;
};

const typeData = {
    INDNT_STATS: [{ id: 106 }],
};

const receiptDetailData = {
    partyDetails: 'Test',
};

describe('Recipt Main Cotainer component render', () => {
    it('should render main container component', () => {
        const FormWrapper = (props) => {
            const [partyDetailForm] = Form.useForm();
            const myFormMock = {
                ...partyDetailForm,
                setFieldsValue: jest.fn(),
                validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
                resetFields: jest.fn(),
                getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
            };
            return <ReceiptMainConatiner partyDetailForm={myFormMock} {...props} />;
        };
        customRender(<FormWrapper isVisible={true} setRequestPayload={jest.fn()} setReceipt={jest.fn()} typeData={typeData} receiptDetailData={receiptDetailData} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('should render receipt details component', () => {
        const currentSection = 1;
        const FormWrapper = (props) => {
            const [partyDetailForm] = Form.useForm();
            const myFormMock = {
                ...partyDetailForm,
                setFieldsValue: jest.fn(),
                validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
                resetFields: jest.fn(),
                getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
            };
            return <ReceiptMainConatiner partyDetailForm={myFormMock} {...props} />;
        };
        customRender(<FormWrapper isVisible={true} setRequestPayload={jest.fn()} setReceipt={jest.fn()} receiptDetailData={receiptDetailData} typeData={typeData} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('should render apportion details component', () => {
        const currentSection = 2;
        customRender(<FormWrapper isVisible={true} typeData={typeData} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
});
