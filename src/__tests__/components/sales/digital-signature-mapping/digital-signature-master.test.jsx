/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { DigitalSignatureMaster } from 'components/Sales/DigitalSignatureMapping/DigitalSignatureMaster';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});


describe('DigitalSignatureMaster Component', () => {
    it('should render Digital Signature Master component UI', () => {
        customRender(<DigitalSignatureMaster />);
    });
});
