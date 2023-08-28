import '@testing-library/jest-dom/extend-expect';
import AssignUserRole from '@components/common/UserManagement/AssignUserRole/AssignUserRole';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('AssignUser Role components', () => {
    it('should render AssignUser Role components', () => {
        customRender(<AssignUserRole/>)
    });
});