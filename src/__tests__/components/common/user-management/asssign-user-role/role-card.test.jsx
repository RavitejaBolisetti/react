import '@testing-library/jest-dom/extend-expect';
import RoleCard from '@components/common/UserManagement/AssignUserRole/RoleCard';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('RoleCard components', () => {
    it('should render RoleCard components', () => {
        customRender(<RoleCard webApplications={jest.fn()} />)
    });
});