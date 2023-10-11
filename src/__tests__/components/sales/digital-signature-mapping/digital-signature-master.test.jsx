/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { DigitalSignatureMaster } from 'components/Sales/DigitalSignatureMapping/DigitalSignatureMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});
describe('DigitalSignatureMaster Component', () => {
    it('should render Digital Signature Master component UI', () => {
        customRender(<DigitalSignatureMaster />);
    });
});
