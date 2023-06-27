import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { ChangePassword } from "@components/common/ChangePassword/ChangePassword";

describe("ChangePassword Components", () => {
    it("should render ChangePassword components", ()=> {
      render(<ChangePassword />);
    });
});