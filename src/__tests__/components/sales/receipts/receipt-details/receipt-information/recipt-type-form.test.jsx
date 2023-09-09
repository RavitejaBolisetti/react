import React from 'react';
import { ReceiptTypeForm } from '@components/Sales/Receipts/ReceiptDetails/ReceiptInformation/ReceiptTypeForm';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Receipts Information Component', () => {
    it('should render Receipts information component UI', () => {
        customRender(<ReceiptTypeForm />);
    });
});
