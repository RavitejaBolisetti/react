import React from 'react';
import {OtfSoMappingUnmappingChangeHistory}  from 'components/Sales/OTF/OtfSoMappingUnmappingChangeHistory/OtfSoMappingUnmappingChangeHistory';
import customRender from '@utils/test-utils';
afterEach(() => {
  jest.restoreAllMocks();
});
describe('OtfSoMappingUnmappingChangeHistory Component', () => {

    it('should render OtfSoMappingUnmappingChangeHistory component UI', () => {
        customRender(<OtfSoMappingUnmappingChangeHistory />)
    });
 
});