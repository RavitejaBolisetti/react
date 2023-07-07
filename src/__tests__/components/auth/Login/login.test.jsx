import { screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils'
import customRender from "@utils/test-utils";
import { Logins } from "@components/Auth/Login/Login";

describe('Login Form Component', () => {
    it('should render Login Form', async () => {
        customRender(<Logins />);
        expect(screen.getByRole('heading', {
            name: /Welcome/i
        })).toBeInTheDocument();
    });
    it('should check forgot password link event', async () => {
        customRender(<Logins />);
        const forgetLink = screen.getByRole('link', { name: /Forgot Password?/i });
        expect(forgetLink.getAttribute('href')).toBe('/forgot-password');
    });
    it('should check application home event event', async () => {
        customRender(<Logins />);
        const loginLink = screen.getByRole('link', { name: /M&M User Login/i });
        expect(loginLink.getAttribute('href')).toBe('/');
    });
    it("should render login form input field username and password", async () => {
        customRender(<Logins />);
        const inputBox = screen.getByRole("textbox");
        fireEvent.change(inputBox, { target: { value: "sushil" } });
        expect(inputBox.value.includes("sushil"));
        fireEvent.change(inputBox, { target: { value: "Test@1234" } });
        expect(inputBox.value.includes("Test@1234"));
        await act(async () => {
            const Login = screen.getByRole('button', {
                name: /Login/i
            });
            fireEvent.click(Login);   
        });   
    });
});