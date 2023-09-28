import React from 'react';
import { ThankYouMaster } from '@components/Sales/VehicleInvoiceGeneration/ThankYou/ThankYouMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Receipts Component', () => {
    it('should render Receipts thankyou component UI', () => {
        customRender(<ThankYouMaster />);
    });
});
