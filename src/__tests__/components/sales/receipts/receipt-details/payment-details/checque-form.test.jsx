import React from 'react';
import { ChequeForm } from '@components/Sales/Receipts/ReceiptDetails/PaymentDetails/ChequeForm';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Payment ChequeForm Component', () => {
    it('should render Receipts ChequeForm component UI', () => {
        customRender(<ChequeForm />);
    });
});
