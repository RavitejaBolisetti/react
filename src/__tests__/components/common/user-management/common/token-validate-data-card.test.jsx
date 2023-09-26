/* eslint-disable no-unused-vars */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import TokenValidateDataCard  from '@components/common/UserManagementMaster/common/TokenValidateDataCard';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('TokenValidateDataCard components', () => {
    it('should render TokenValidateDataCard components UI', () => {
        customRender(<TokenValidateDataCard />);
    });
});
