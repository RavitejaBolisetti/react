import React from 'react';
import { CashForm } from '@components/Sales/Receipts/ReceiptDetails/PaymentDetails/CashForm';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Payment cash Component', () => {
    it('should render Receipts cash component UI', () => {
        customRender(<CashForm />);
    });
});
