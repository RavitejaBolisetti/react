import '@testing-library/jest-dom/extend-expect';
import { ManufacturerOrgHierarchyChangeHistory } from '@components/common/ManufacturerOrganizationHierarchy/ManufacturerOrgHierarchyChangeHistory';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Manufacturer Org Hierarchy Change History components', () => {
    it('should render Change history components', () => {
        customRender(<ManufacturerOrgHierarchyChangeHistory />);
    });
});
