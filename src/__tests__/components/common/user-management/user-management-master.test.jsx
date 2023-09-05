import '@testing-library/jest-dom/extend-expect';
import { UserManagementMaster } from '@components/common/UserManagement';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('User Management Master components', () => {
    it('should render User Management Master components', () => {
        customRender(<UserManagementMaster/>)
    });
});