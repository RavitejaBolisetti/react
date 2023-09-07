import React from 'react';
import {VehicleAllotmentMaster}  from 'components/Sales/VehicleAllotment/VehicleAllotmentMaster';
import customRender from '@utils/test-utils';
afterEach(() => {
  jest.restoreAllMocks();
});
describe('VehicleAllotmentMaster Component', () => {

    it('should render Vehicle Allotment Master component UI', () => {
        customRender(<VehicleAllotmentMaster />)
    });
 
});