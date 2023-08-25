import '@testing-library/jest-dom/extend-expect';
import { ApplicationTree } from '@components/common/UserManagement/AssignUserRole/ApplicationTree';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Application Tree components', () => {
    it('should render Application Tree components', () => {
        customRender(<ApplicationTree/>)
    });
});