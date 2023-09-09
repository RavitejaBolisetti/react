import '@testing-library/jest-dom/extend-expect';
import PaymentAddEdit from '@components/Sales/Receipts/ReceiptDetails/ReceiptInfoAddEdit';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from 'antd';

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
    return <PaymentAddEdit paymentForm={myFormMock} {...props} />;
};

describe('Receipts Payment addEdit details components', () => {
    it('should render components', () => {
        const receiptType = [{ key: 106, value: 'Kai' }];
        customRender(<FormWrapper handleCollapse={jest.fn()} receipt={true} resetFields={jest.fn()} receiptType={receiptType} setReceipt={jest.fn()} setLastSection={jest.fn()} />);

        const plusImg = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusImg[0]);

        const selectField = screen.getByRole('combobox', { name: 'Receipt Type' });

        fireEvent.change(selectField, { target: { value: 106 } });

        waitFor(() => {
            expect(screen.getByText('Kai')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Kai'));
    });
});
