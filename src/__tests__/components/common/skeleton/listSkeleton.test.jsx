import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { ListSkeleton } from "@components/common/Skeleton/ListSkeleton";

describe("ListSkeleton Components", () => {
    it("should render ListSkeleton components", ()=> {
      render(<ListSkeleton />);
    });
});