import { screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils'
import customRender from "@utils/test-utils";
import { Logins } from "@components/Auth/Login/Login";
import  Captcha  from "@components/Auth/Login/Captcha";

describe('Login Form Component', () => {

    const handler = jest.fn(() => Promise.resolve());
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
        
        const { getByTestId } = customRender(<Logins callback={handler} />);

        const userName = getByTestId("userNameInput");
        fireEvent.change(userName, {
            target: { value: "Dmatest" }
          });

        expect(userName.value.includes("Dmatest"));
        const userPassword = getByTestId("inputPassword");
        fireEvent.change(userPassword, {
          target: { value: "Dma@test1234" }
        });

        expect(userPassword.value.includes("Dma@test1234"));
            await act(async () => {
                fireEvent.click(getByTestId("Login"));
            });
        });
});
describe('Captcha Component', () => {
    it('should render Captcha component', async () => {
        customRender(<Captcha />);
        expect(screen.getByRole('button', {
            name: /Submit/i
        })).toBeInTheDocument();
    });
    it('should render check button event', async () => {
        customRender(<Captcha />);
        const inputBox = screen.getByRole("textbox");
        fireEvent.change(inputBox, { target: { value: "Dmatest" } });
        await act(async () => {
            fireEvent.click(screen.getByRole('button', {
                name: /Submit/i
            }));
        });
    });
});