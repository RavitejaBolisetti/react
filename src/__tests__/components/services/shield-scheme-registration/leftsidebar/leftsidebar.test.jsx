import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { screen, fireEvent } from '@testing-library/react';
import { LeftSidebar } from 'components/Services/ShieldSchemeRegistartion/LeftSidebar';

describe("Left Side Bar Component", () => {

    it("should render left side bar component", () => {
        customRender(<LeftSidebar currentSection={4} />);
    });

    it("shield registration details click should work", () => {
        customRender(<LeftSidebar currentSection={2} previousSection={1} setPreviousSection={jest.fn()} setCurrentSection={jest.fn()} setSection={jest.fn()} />);
        const registrationText=screen.getByText('Shield Registration Details');
        fireEvent.click(registrationText);
    });

});