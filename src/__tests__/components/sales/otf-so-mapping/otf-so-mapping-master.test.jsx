import React from 'react';
import {OtfSoMappingMaster}  from 'components/Sales/OtfSoMapping/OtfSoMappingMaster';
import customRender from '@utils/test-utils';
afterEach(() => {
  jest.restoreAllMocks();
});
describe('OtfSoMappingMaster Component', () => {

    it('should render OtfSoMappingMaster component UI', () => {
        customRender(<OtfSoMappingMaster />)
    });
 
});