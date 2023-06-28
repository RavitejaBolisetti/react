import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { Footer } from "@components/common/Footer/Footer";
import Copyright from "@components/common/Footer/Copyright";

describe("Footer Components", () => {
    it("should render Footer components", ()=> {
      render(<Footer />);
      expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
    });

  it("should render Copyright components", ()=> {
    const {container } = render(<Copyright />);
    expect(container.firstChild).not.toHaveClass('footerRight');
  });
});