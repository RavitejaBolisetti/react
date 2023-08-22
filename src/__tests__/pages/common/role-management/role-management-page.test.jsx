import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { RoleManagementPageBase } from '@pages/common/RoleManagement/RoleManagementPage';

describe("RoleManagementPageBase Components", () => {
    it("should render RoleManagementPageBase components", ()=> {
        customRender(<RoleManagementPageBase />);
    });
});
