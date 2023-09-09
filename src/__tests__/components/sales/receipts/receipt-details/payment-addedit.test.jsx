import '@testing-library/jest-dom/extend-expect';
import PaymentAddEdit from '@components/Sales/Receipts/ReceiptDetails/PaymentAddEdit';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Receipts Payment addEdit details components', () => {
    it('should render components', () => {
        customRender(<PaymentAddEdit handleCollapse={jest.fn()} setIsAdding={jest.fn()} />);

        const plusImg = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusImg[0]);

        const addBtn = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);
    });
});
