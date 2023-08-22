import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { RoleManagementPageBase } from '@pages/common/RoleManagement/RoleManagementPage';

describe("RoleManagementPage Components", () => {
    it("should render RoleManagementPage components", ()=> {
        customRender(<RoleManagementPageBase />);
    });
});
