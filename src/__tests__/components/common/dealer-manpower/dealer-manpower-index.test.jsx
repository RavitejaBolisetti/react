import '@testing-library/jest-dom/extend-expect';
import { ListDealerLocationTypeMaster, ListDealerDivisionMaster, BayTypeMaster, ListEmployeeDepartmentMaster, ListRoleMaster, DesignationMaster } from '@components/common/DealerManpower';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Dealer manpower components', () => {
    it('should render dealer manpower ListDealerLocationTypeMaster components', () => {
        customRender(<ListDealerLocationTypeMaster/>)
    });

    it('should render dealer manpower ListDealerDivisionMaster components', () => {
        customRender(<ListDealerDivisionMaster/>)
    });

    it('should render dealer manpower BayTypeMaster components', () => {
        customRender(<BayTypeMaster/>)
    });

    it('should render dealer manpower ListEmployeeDepartmentMaster components', () => {
        customRender(<ListEmployeeDepartmentMaster/>)
    });

    it('should render dealer manpower ListRoleMaster components', () => {
        customRender(<ListRoleMaster/>)
    });

    it('should render dealer manpower DesignationMaster components', () => {
        customRender(<DesignationMaster/>)
    });
});