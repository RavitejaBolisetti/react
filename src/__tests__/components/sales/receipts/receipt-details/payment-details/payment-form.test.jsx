import React from 'react';
import PaymentFormContainer from '@components/Sales/Receipts/ReceiptDetails/PaymentDetails/PaymentFormContainer';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [paymentForm] = Form.useForm();
    const myFormMock = {
        ...paymentForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <PaymentFormContainer paymentForm={myFormMock} {...props} />;
};

const formActionType = { viewMode: false };
describe('Receipts Payment  Component', () => {
    it('should render Receipts payment component UI', () => {
        customRender(<FormWrapper setPaymentMode={jest.fn()} formActionType={formActionType} paymentMode={true} setIsAdding={jest.fn()} setIsListEditing={jest.fn()} setShowAddEditForm={jest.fn()} />);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('should click on save button', () => {
        customRender(<FormWrapper setPaymentMode={jest.fn()} formActionType={formActionType} paymentMode={true} setIsAdding={jest.fn()} setIsListEditing={jest.fn()} setShowAddEditForm={jest.fn()} />);

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });
});
