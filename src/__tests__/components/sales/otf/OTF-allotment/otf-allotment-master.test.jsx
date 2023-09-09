import React from 'react';
import {OTFAllotmentMaster}  from 'components/Sales/OTF/OTFAllotment/OTFAllotmentMaster';
import customRender from '@utils/test-utils';
afterEach(() => {
  jest.restoreAllMocks();
});
describe('OTFAllotmentMaster Component', () => {

    it('should render OTFAllotmentMaster component UI', () => {
        customRender(<OTFAllotmentMaster />)
    });
 
});