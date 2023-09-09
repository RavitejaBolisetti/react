import '@testing-library/jest-dom/extend-expect';
import ViewList from '@components/Sales/Receipts/ReceiptDetails/ViewList';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Receipts view-list details components', () => {
    it('should render components', () => {
        const paymentDataList = [{ id: '1', value: 'kai' }];
        customRender(<ViewList handleListCollapse={jest.fn()} paymentDataList={paymentDataList} />);

        const plusImg = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusImg[0]);

        const minusImg = screen.getAllByRole('img', { name: /minus/i });
        fireEvent.click(minusImg[0]);
    });
    it('should render components when editing is true', () => {
        const paymentDataList = [{ id: '1', value: 'kai' }];
        customRender(<ViewList handleListCollapse={jest.fn()} paymentDataList={paymentDataList} isListEditing={true} />);

        const plusImg = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusImg[0]);
    });
});
