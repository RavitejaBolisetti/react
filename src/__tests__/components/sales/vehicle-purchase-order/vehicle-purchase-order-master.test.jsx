import React from 'react';
import {VehiclePurchaseOrderMaster}  from 'components/Sales/VehiclePurchaseOrder/VehiclePurchaseOrderMaster';
import customRender from '@utils/test-utils';
afterEach(() => {
  jest.restoreAllMocks();
});
describe('VehiclePurchaseOrderMaster Component', () => {

    it('should render Vehicle Purchase Order Master component UI', () => {
        customRender(<VehiclePurchaseOrderMaster />)
    });
 
});