import React from 'react';
import { App } from 'App';
import customRender from '@utils/test-utils';

describe('App render', () => {
    it('Should render app component', () => {
        customRender(<App isVisible={true} readFromStorageAndValidateAuth={jest.fn()} informationModalBox={jest.fn()} />);
    });
});
