import '@testing-library/jest-dom/extend-expect';
import { ViewManufacturerOrgDetail } from '@components/common/ManufacturerOrganizationHierarchy/ViewManufacturerOrgDetails';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Manufacturer Org Hierarchy View Detail components', () => {
    it('should render ManufacturerOrgHierarchy components', () => {
        customRender(<ViewManufacturerOrgDetail />);
    });
});
