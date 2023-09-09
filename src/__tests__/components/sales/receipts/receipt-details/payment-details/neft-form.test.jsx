import React from 'react';
import { NeftForm } from '@components/Sales/Receipts/ReceiptDetails/PaymentDetails/NeftForm';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Payment NeftForm Component', () => {
    it('should render Receipts NeftForm component UI', () => {
        customRender(<NeftForm />);
    });
});