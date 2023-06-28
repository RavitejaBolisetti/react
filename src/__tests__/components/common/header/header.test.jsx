import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { HeaderSkeleton } from "@components/common/Header/HeaderSkeleton";

describe("Header Components", () => {
    it("should render HeaderSkeleton components", ()=> {
      customRender(<HeaderSkeleton />);
    });
});