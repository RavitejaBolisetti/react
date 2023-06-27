import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { Header } from "@components/common/Header/Header";
import { HeaderSkeleton } from "@components/common/Header/HeaderSkeleton";


describe("Header Components", () => {
    // it("should render Header components", ()=> {
    //   customRender(<Header />);
    //   });
    it("should render HeaderSkeleton components", ()=> {
      customRender(<HeaderSkeleton />);
    });
});