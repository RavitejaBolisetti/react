import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { Logins } from '@components/Auth/Login/Login';
import ReactRecaptcha3 from 'react-google-recaptcha3';

jest.mock('react-google-recaptcha3', () => {
    return {
        getToken: jest.fn(() => Promise.resolve('mockCaptchaCode')),
        init: jest.fn(() => Promise.resolve('mockCaptchaCode')),
        destroy: jest.fn()
    }
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Login Form Component', () => {

    it('should render Login Form', async () => {
        customRender(<Logins doCloseLoginError={jest.fn()}/>);
    });

    it('login form should work on correct details', async () => {

        ReactRecaptcha3.getToken.mockImplementation(() => Promise.resolve('Kai'));

        customRender(<Logins doCloseLoginError={jest.fn()} onSuccess={jest.fn()} />);

        const userIdLabel=screen.getByText('User ID (MILE ID.Parent ID)');
        fireEvent.click(userIdLabel);

        const passwordLabel=screen.getByText('Password');
        fireEvent.click(passwordLabel);

        const userId=screen.getByRole('textbox', { name: '' });
        fireEvent.change(userId, { target: { value: 'Kai' } });

        const password=screen.getByTestId('inputPassword');
        fireEvent.change(password, { target: { value: 'Kai@1234' } });

        const loginBtn=screen.getByRole('button', { name: 'Login' });
        fireEvent.click(loginBtn);

        await waitFor(() => expect(ReactRecaptcha3.getToken).toHaveBeenCalled());

    });

    it('login form should work on captcha failed', async () => {

        ReactRecaptcha3.getToken.mockImplementation(() => Promise.reject('error'));

        customRender(<Logins doCloseLoginError={jest.fn()} />);

        const userId=screen.getByRole('textbox', { name: '' });
        fireEvent.change(userId, { target: { value: 'Kai' } });

        const password=screen.getByTestId('inputPassword');
        fireEvent.change(password, { target: { value: 'K' } });

        const loginBtn=screen.getByRole('button', { name: 'Login' });
        fireEvent.click(loginBtn);

        await waitFor(() => expect(ReactRecaptcha3.getToken).toHaveBeenCalled());

    });

    it('show and hide password should work with eye button', async () => {
        customRender(<Logins doCloseLoginError={jest.fn()}/>);

        const showPassword=screen.getByTestId('eyeInvisible');
        fireEvent.mouseDown(showPassword);

        const hidePassword=screen.getByTestId('eyeVisible');
        fireEvent.mouseUp(hidePassword);
    });

});