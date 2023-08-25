import '@testing-library/jest-dom/extend-expect';
import { AdministrativeHierarchy } from '@components/common/UserManagement/Manufacturer/AdministrativeHierarchy';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Administrative Hierarchy components', () => {
    it('should render Administrative Hierarchy components', () => {
        customRender(<AdministrativeHierarchy/>)
    });
});