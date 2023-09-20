import React from 'react';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from "@testing-library/react";
import { UserManagementPage } from 'pages/common';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Left Side Bar Component', () => {

    it('should render left sidebar component UI', () => {
        customRender(<UserManagementPage />);
    });

});