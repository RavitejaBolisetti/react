import React from 'react';
import {SessionTimeout}  from 'components/SessionTimeout/SessionTimeout';
import customRender from '@utils/test-utils';
afterEach(() => {
  jest.restoreAllMocks();
});
describe('SessionTimeout Component', () => {

    it('should render SessionTimeout component UI', () => {
        customRender(<SessionTimeout />)
    });
 
});