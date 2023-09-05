import '@testing-library/jest-dom/extend-expect';
import AssignUserRole from '@components/common/UserManagement/common/AssignUserRole/AssignUserRoleMain';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('AssignUser Role components', () => {
    it('should render AssignUser Role components', () => {
        customRender(<AssignUserRole resetMnmUserRoleAppDataList={jest.fn()} resetUsrDlrRoleAppDataList={jest.fn()}/>)
    });
});