import React from 'react';
import {VehicleReceiptMaster}  from 'components/Sales/VehicleReceipt/VehicleReceiptMaster';
import customRender from '@utils/test-utils';
afterEach(() => {
  jest.restoreAllMocks();
});
describe('VehicleReceiptMaster Component', () => {

    it('should render VehicleReceiptMaster component UI', () => {
        customRender(<VehicleReceiptMaster />)
    });
 
});