import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import CardDocument from 'components/common/ApplicationMaster/viewDeatils/CardDocument';

afterEach(() => {
    jest.restoreAllMocks();
});
describe('Card Document Component', () => {
    it('should render card document component', async () => {
        customRender(<CardDocument />);
    });
});
