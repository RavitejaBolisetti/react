import React from 'react';
import { ThankYouMaster } from '@components/Sales/VehicleDeliveryNote/ThankYou/ThankYouMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Delivery Note Component', () => {
    it('should render Receipts thankyou component UI', () => {
        customRender(<ThankYouMaster />);
    });
});
