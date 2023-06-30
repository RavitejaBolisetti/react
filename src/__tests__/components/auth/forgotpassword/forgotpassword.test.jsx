import { screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { ForgotPassword } from "@components/Auth/ForgotPassword/ForgotPassword";

describe('Forgot Password Component', () => {
    it('should render snapshots of ForgotPassword', async () => {
        customRender(<ForgotPassword />);
        expect(screen.getByRole('heading', {
            name: /forgot your password/i
          })).toBeInTheDocument();
        });

    it('should render step 1', () =>{
        customRender(<ForgotPassword currentStep={1} />);
    })

    it('should check back to login button event', async () => {
        customRender(<ForgotPassword />);
        const link = screen.getByRole('link', { name: /Back to Login/i });
        expect(link.getAttribute('href')).toBe('/login');
    })
    
});