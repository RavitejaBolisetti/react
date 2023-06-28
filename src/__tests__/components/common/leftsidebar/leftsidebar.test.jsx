import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { LeftSideBar } from "@components/common/LeftSideBar/LeftSideBar";

describe("LeftSideBar Components", () => {
    it("should render LeftSideBar components", ()=> {
    const leftSideBar =  customRender(<LeftSideBar />);
    expect(leftSideBar).toMatchSnapshot();
    });
});
