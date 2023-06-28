import customRender from "@utils/test-utils";
import '@testing-library/jest-dom/extend-expect';
import { CardSkeleton } from "@components/common/Skeleton/CardSkeleton";

describe("CardSkeleton Components", () => {
    it("should render CardSkeleton components", ()=> {
      customRender(<CardSkeleton />);
    });
});