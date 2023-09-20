import React from 'react';
import customRender from '@utils/test-utils';
import { UserManagementPage } from 'pages/common';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('User Management Page Component', () => {

    it('should render user management page component', () => {
        customRender(<UserManagementPage />);
    });

});