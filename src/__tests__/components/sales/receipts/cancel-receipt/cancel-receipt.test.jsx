import '@testing-library/jest-dom/extend-expect';
import { CancelReceipt } from '@components/Sales/Receipts/CancelReceipt/cancelReceipt';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Receipts cancel components', () => {
    it('should render components', () => {
        customRender(<CancelReceipt handleCloseReceipt={jest.fn()} handleCancelReceipt={jest.fn()} cancelReceiptForm={jest.fn()} />);
    });
});
