import '@testing-library/jest-dom/extend-expect';
import { UserManagementMaster } from '@components/common/UserManagement/Dealer';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('RoleCard components', () => {
    it('should render RoleCard components', () => {
        customRender(<UserManagementMaster/>)
    });
});