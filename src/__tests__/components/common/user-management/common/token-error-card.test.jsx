/* eslint-disable no-unused-vars */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import TokenErrorCard from '@components/common/UserManagement/common/TokenErrorCard';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('TokenErrorCard components', () => {
    it('should render TokenErrorCard components UI', () => {
        customRender(<TokenErrorCard />);
    });
});
