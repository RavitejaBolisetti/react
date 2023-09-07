import React from 'react';
import {DigitalSignatureMaster}  from 'components/Sales/DigitalSignatureMapping/DigitalSignatureMaster';
import customRender from '@utils/test-utils';
afterEach(() => {
  jest.restoreAllMocks();
});
describe('DigitalSignatureMaster Component', () => {

    it('should render DigitalSignatureMaster component UI', () => {
        customRender(<DigitalSignatureMaster />)
    });
 
});