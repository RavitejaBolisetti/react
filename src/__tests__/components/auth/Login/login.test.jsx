import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { Logins } from 'components/Auth/Login/Login';
import ReactRecaptcha3 from 'react-google-recaptcha3';
import { doLogin } from 'store/actions/auth';

jest.mock('react-google-recaptcha3', () => {
    return {
        getToken: jest.fn(() => Promise.resolve('mockCaptchaCode')),
        init: jest.fn(() => Promise.resolve('mockCaptchaCode')),
        destroy: jest.fn(),
    };
});

jest.mock('store/actions/auth', () => ({
    doLogin: jest.fn(),
    doCloseLoginError: jest.fn().mockImplementation(() => {
        return { type: 'YOUR_ACTION_TYPE' };
    }),
    authPreLogin: jest.fn().mockImplementation(() => {
        return { type: 'YOUR_ACTION_TYPE' };
    }),
}));

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Login Form Component', () => {
    it('should render Login Form', async () => {
        customRender(<Logins doCloseLoginError={jest.fn()} />);
    });

    it('login form should work on correct details', async () => {
        doLogin.mockImplementation((values, loginPageIsLoading, onSuccess, onError) => {
            const data = { userRegisteredDevice: { match: false }, passwordStatus: true };
            const mockResponse = { title: 'Mock Title', message: 'Mock Message' };
            onSuccess(data);
            onError(mockResponse);
            return { type: 'MOCK_ACTION' };
        });

        customRender(<Logins doCloseLoginError={jest.fn()} authPostLogin={jest.fn()} authPreLogin={jest.fn()} />);

        const loginBtn = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(loginBtn);

        const userIdLabel = screen.getByText('User ID (MILE ID.Parent ID)');
        fireEvent.click(userIdLabel);

        const passwordLabel = screen.getByText('Password');
        fireEvent.click(passwordLabel);

        const userId = screen.getByRole('textbox', { name: '' });
        fireEvent.change(userId, { target: { value: 'Kai' } });

        const password = screen.getByTestId('inputPassword');
        fireEvent.change(password, { target: { value: 'Kai@1234' } });

        fireEvent.click(loginBtn);

        await waitFor(() => expect(doLogin).toHaveBeenCalled());
    });

    it('login form should work on captcha failed', async () => {
        ReactRecaptcha3.getToken.mockImplementation(() => Promise.reject('error'));

        customRender(<Logins doCloseLoginError={jest.fn()} />);

        const userId = screen.getByRole('textbox', { name: '' });
        fireEvent.change(userId, { target: { value: 'Kai' } });

        const password = screen.getByTestId('inputPassword');
        fireEvent.change(password, { target: { value: 'K' } });

        const loginBtn = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(loginBtn);

        await waitFor(() => expect(ReactRecaptcha3.getToken).toHaveBeenCalled());
    });

    it('show and hide password should work with eye button', async () => {
        customRender(<Logins doCloseLoginError={jest.fn()} />);

        const showPassword = screen.getByTestId('eyeInvisible');
        fireEvent.mouseDown(showPassword);

        const hidePassword = screen.getByTestId('eyeVisible');
        fireEvent.mouseUp(hidePassword);
    });
});
