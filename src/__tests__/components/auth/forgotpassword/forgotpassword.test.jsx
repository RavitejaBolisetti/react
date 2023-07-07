import { screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils'
import customRender from "@utils/test-utils";
import { ForgotPassword } from "@components/Auth/ForgotPassword/ForgotPassword";

describe('Forgot Password Component render', () => {
    it('should render snapshots of ForgotPassword', async () => {
        customRender(<ForgotPassword />);
        expect(screen.getByRole('heading', {
            name: /forgot your password/i
        })).toBeInTheDocument();
    });
    it("should render step 1 for forgetPassword components", async () => {
            customRender(<ForgotPassword currentStep={1} />);
            const inputBox = screen.getByRole("textbox");
            fireEvent.change(inputBox, { target: { value: "sushil" } });
            expect(inputBox.value.includes("sushil"));
            await act(async () => {
                const verifyUserButton = screen.getByRole('button', {
                    name: /verify user/i
                });
                fireEvent.click(verifyUserButton); 
            )};     
        });
    it('should check back to login button event', async () => {
        customRender(<ForgotPassword />);
        const loginLink = screen.getByRole('link', { name: /Back to Login/i });
        expect(loginLink.getAttribute('href')).toBe('/login');
    })
});
  
