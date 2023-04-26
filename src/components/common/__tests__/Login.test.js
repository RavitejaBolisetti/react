import { screen, render, fireEvent, findAllByText } from '@testing-library/react';
import { Logins } from '../../Auth/Login/Login';
import { ForgotPassword } from '../../Auth/ForgotPassword';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

jest.mock('react-redux', () => ({
    connect: () => (Logins) => Logins,
}));

const doCloseLoginError = () => {
    return;
};
const errorMessage = () => {
    return 'Invalid credentials.';
};
window.matchMedia =
    window.matchMedia ||
    function () {
        return { matches: false, addListener: function () {}, removeListener: function () {} };
    };

describe('Login component', () => {
    test('render welcome page', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Logins doCloseLoginError={doCloseLoginError} />} />
                </Routes>
            </BrowserRouter>
        );
        const userId = await screen.findByPlaceholderText('User ID (MILE ID.Parent ID)');
        const passInput = await screen.getByPlaceholderText('Password');
        const loginBtn = await screen.getByText('Login');
        fireEvent.change(userId, { target: { value: '11111' } });
        fireEvent.change(passInput, { target: { value: 'dasdasd' } });
        fireEvent.change(userId, { target: { value: '' } });
        fireEvent.change(passInput, { target: { value: '' } });
        fireEvent.click(loginBtn);
        const validation = screen.findByText('Please enter user id');
        const validation2 = screen.findByText('Please enter password');
        expect(userId).toBeTruthy();
        expect(passInput).toBeTruthy();
        expect(validation).toBeTruthy();
        expect(validation2).toBeTruthy();
        expect(loginBtn).toBeInTheDocument();
    });
    test('redirects to forgot password page after clicking forgot password link  ', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Logins doCloseLoginError={doCloseLoginError} errorMessage={errorMessage} isError={true} />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
            </BrowserRouter>
        );
        const userId = await screen.getByPlaceholderText('User ID (MILE ID.Parent ID)');
        const forgotPasswordLink = await screen.getByText('Forgot password?');
        fireEvent.click(forgotPasswordLink);
        const verifyUserBtn = await screen.getByText('Verify User');
        expect(userId).toBeTruthy();
        expect(forgotPasswordLink).toBeTruthy();
        expect(verifyUserBtn).toBeInTheDocument();
    });
    test('M&M SSO Login Link ', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Logins doCloseLoginError={doCloseLoginError} errorMessage={errorMessage} isError={true} />} />
                </Routes>
            </BrowserRouter>
        );
        const ssoLogin = screen.getByText('M&M User Login');
        fireEvent.click(ssoLogin);
    });
});

