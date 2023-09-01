import '@testing-library/jest-dom/extend-expect';
import { ManufacturerOrgHierarchyChangeHistory } from '@components/common/ManufacturerOrganizationHierarchy/ManufacturerOrgHierarchyChangeHistory';
import customRender from '@utils/test-utils';


afterEach(() => {
    jest.restoreAllMocks();
});

afterEach(() => {
    jest.restoreAllMocks();
});

const props = {
    userId: 'CUS1687508157461',
    fetchChangeHistoryList: jest.fn(),
    changeHistoryShowLoading: true,
    isHistoryLoaded: true,
    changeHistoryData: ['type1', 'type2'],
    tblPrepareColumns: jest.fn(),
};

describe('Render CustomerChangeHistory component', () => {
    it('render component', () => {
        customRender(<ManufacturerOrgHierarchyChangeHistory {...props} setIsLoading={jest.fn()} />);
    });
});
