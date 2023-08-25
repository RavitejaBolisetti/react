import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import CardLocation from 'components/common/ApplicationMaster/viewDeatils/CardLocation';

afterEach(() => {
    jest.restoreAllMocks();
});
describe('Card Location Component', () => {
    it('should render card location component', async () => {
        customRender(<CardLocation />);
    });
});
