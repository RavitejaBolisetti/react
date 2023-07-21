import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import customRender from '@utils/test-utils';
import configureMockStore from 'redux-mock-store';
import { Logins } from '@components/Auth/Login/Login';
import Captcha from '@components/Auth/Login/Captcha';

// Mock Redux store
const mockStore = configureMockStore();
const initialState = {}; // Add initial state if required
const store = mockStore(initialState);
const handler = jest.fn(() => Promise.resolve());
beforeEach(() => {
    // Reset the store and any necessary mocks before each test
    store.clearActions();
    jest.clearAllMocks();
});
const props = {
    buttonData: [],
    setButtonData: jest.fn(),
    formActionType: '',
    formData: {},
    setFormData: jest.fn(),
    showGlobalNotification: jest.fn(),
    forceUpdate: jest.fn(),
    handleFormValueChange: jest.fn(),
    handleFormFieldChange: jest.fn(),
    doCloseLoginError: jest.fn(),
};

describe('Login Form Component', () => {
   
    it('should render Login Form', async () => {
        customRender(<Logins handler={handler} />);
        expect(
            screen.getByRole('heading', {
                name: /Welcome/i,
            })
        ).toBeInTheDocument();
        expect(screen.getByTestId('userIdInput')).toBeInTheDocument();

        expect(screen.getByTestId('inputPassword')).toBeInTheDocument();

        expect(screen.getByTestId('Login')).toBeInTheDocument();

        expect(screen.getByRole('link', { name: /forgot password/i })).toBeInTheDocument();

        expect(screen.getByRole('link', { name: /m&m user login/i })).toBeInTheDocument();
    });
    it('should check forgot password link event', async () => {
        customRender(<Logins handler={handler} />);
        const forgetLink = screen.getByRole('link', { name: /Forgot Password?/i });
        expect(forgetLink.getAttribute('href')).toBe('/forgot-password');
    });
    it('should check application home event event', async () => {
        customRender(<Logins handler={handler} />);
        const loginLink = screen.getByRole('link', { name: /M&M User Login/i });
        expect(loginLink.getAttribute('href')).toBe('/');
    });

    it('should render login form input field username and password', async () => {
        jest.setTimeout(200000);
        const { getByTestId } = customRender(<Logins handler={handler} />);

        const userName = getByTestId('userNameInput');
        fireEvent.change(userName, {
            target: { value: 'test' },
        });
        expect(userName.value.includes('test'));

        const userPassword = getByTestId('inputPassword');
        fireEvent.change(userPassword, {
            target: { value: 'password' },
        });
        expect(userPassword.value.includes(''));

        await act(async () => {
            fireEvent.click(getByTestId('Login'));
        });

        await waitFor(() =>{
            screen.findByText("Dashboard");
        })
    });

});


describe("check login form flow", ()=>{
    it("should check login details enter incorrect", async()=>{
        jest.setTimeout(200000);
       const {getByTestId} = customRender(<Logins handler={handler} />);

        const userName = getByTestId('userNameInput');
        fireEvent.change(userName, {
            target: { value: 'test' },
        });
        expect(userName.value.includes('test'));

        const userPassword = getByTestId('inputPassword');
        fireEvent.change(userPassword, {
            target: { value: 'wrong-password' },
        });
       expect(userPassword.value.includes('wrong-password'));


            fireEvent.click(screen.getByText('Login'));


        await waitFor(() =>{
            screen.findByText("Invalid credentials");
        })
    })
})

describe('Captcha Component', () => {
    it('should render Captcha component', async () => {
        customRender(<Captcha />);
        expect(
            screen.getByRole('button', {
                name: /Submit/i,
            })
        ).toBeInTheDocument();
    });
    it('should render Captcha component', async () => {
        jest.setTimeout(200000);
        customRender(<Captcha />);
           const captchaSubmit = screen.getByRole('button', {
                name: /Submit/i,
            })
            fireEvent.click(captchaSubmit);
            await waitFor(() =>{
                screen.findByText("Please select Captcha");
            })
    });
    it('should render check button event', async () => {
        customRender(<Captcha />);
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, { target: { value: 'Dmatest' } });
        await act(async () => {
            fireEvent.click(
                screen.getByRole('button', {
                    name: /Submit/i,
                })
            );
        });
    });
    
});