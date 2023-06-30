import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { AddEditForm } from '@components/common/RoleManagement/AddEditForm';

describe("AddEditForm Components", () => {
    it("should render AddEditForm components", ()=> {
    const leftSideBar =  customRender(<AddEditForm />);
    expect(leftSideBar).toMatchSnapshot();
    });
});
