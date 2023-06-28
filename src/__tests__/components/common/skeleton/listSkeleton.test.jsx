import customRender from "@utils/test-utils";
import '@testing-library/jest-dom/extend-expect';
import { ListSkeleton } from "@components/common/Skeleton/ListSkeleton";
describe("ListSkeleton Components", () => {
    it("should render ListSkeleton components", ()=> {
      customRender(<ListSkeleton />);
    });
});