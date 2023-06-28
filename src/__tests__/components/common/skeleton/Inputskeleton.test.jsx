import customRender from "@utils/test-utils";
import '@testing-library/jest-dom/extend-expect';
import { InputSkeleton } from "@components/common/Skeleton/InputSkeleton";
describe("InputSkeleton Components", () => {
    it("should render InputSkeleton components", ()=> {
      customRender(<InputSkeleton />);
    });
});