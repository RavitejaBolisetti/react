import React from 'react';
import {HoPriceMappingMaster}  from 'components/Sales/HoPriceMappingDealer/HoPriceMappingMaster';
import customRender from '@utils/test-utils';
afterEach(() => {
  jest.restoreAllMocks();
});
describe('HoPriceMappingMaster Component', () => {

    it('should render HoPriceMappingMaster component UI', () => {
        customRender(<HoPriceMappingMaster />)
    });
 
});