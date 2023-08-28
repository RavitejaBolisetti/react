import '@testing-library/jest-dom/extend-expect';
import { ManufacturerOrgHierarchyChangeHistory, ManufacturerOrgHierarchy } from '@components/common/ManufacturerOrganizationHierarchy';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Manufacturer Org Hierarchy Change History components', () => {
    it('should render Manufacturer Org Hierarchy ChangeHistory components', () => {
        customRender(<ManufacturerOrgHierarchyChangeHistory/>)
    });
    it('should render ManufacturerOrgHierarchy components', () => {
        customRender(<ManufacturerOrgHierarchy/>)
    });
});