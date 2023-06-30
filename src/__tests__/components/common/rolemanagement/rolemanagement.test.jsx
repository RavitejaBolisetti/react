import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { RoleManagement } from '@components/common/RoleManagement/RoleManagement';

describe("RoleManagement Components", () => {
    it("should render RoleManagement components", ()=> {
    const roleManagement =  customRender(<RoleManagement />);
    expect(roleManagement).toMatchSnapshot();
    });
});
