import React from 'react';
import {VehicleRecieptMaster}  from 'components/Sales/VehicleRecieptChecklist/VehicleRecieptMaster';
import customRender from '@utils/test-utils';
afterEach(() => {
  jest.restoreAllMocks();
});
describe('VehicleRecieptMaster Component', () => {

    it('should render VehicleRecieptMaster component UI', () => {
        customRender(<VehicleRecieptMaster />)
    });
 
});