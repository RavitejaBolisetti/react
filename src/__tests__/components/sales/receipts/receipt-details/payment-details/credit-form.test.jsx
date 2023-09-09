import React from 'react';
import { CreditForm } from '@components/Sales/Receipts/ReceiptDetails/PaymentDetails/CreditForm';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Payment CreditForm Component', () => {
    it('should render Receipts CreditForm component UI', () => {
        customRender(<CreditForm />);
    });
});
