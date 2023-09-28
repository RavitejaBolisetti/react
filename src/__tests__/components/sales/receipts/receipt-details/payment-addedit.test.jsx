import '@testing-library/jest-dom/extend-expect';
import PaymentAddEdit from '@components/Sales/Receipts/ReceiptDetails/PaymentAddEdit';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [paymentForm] = Form.useForm();

    const myFormMock = {
        ...paymentForm,
        resetFields: jest.fn(),
    };
    return <PaymentAddEdit paymentForm={myFormMock} {...props} />;
};

describe('Receipts Payment addEdit details components', () => {
    it('should render components', () => {
        customRender(<FormWrapper handleCollapse={jest.fn()} setIsAdding={jest.fn()} setShowAddEditForm={jest.fn()} setOpenAccordian={jest.fn()} />);

        const plusImg = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusImg[0]);

        const addBtn = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);
    });
});
