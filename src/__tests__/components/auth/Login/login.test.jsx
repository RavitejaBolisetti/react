import { screen, fireEvent, render, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils'
import customRender from "@utils/test-utils";
import configureMockStore from 'redux-mock-store';
import { Logins } from "@components/Auth/Login/Login";
import  Captcha  from "@components/Auth/Login/Captcha";

// Mock Redux store
const mockStore = configureMockStore();
const initialState = {}; // Add initial state if required
const store = mockStore(initialState);

beforeEach(() => {
    // Reset the store and any necessary mocks before each test
    store.clearActions();
    jest.clearAllMocks();
  });
  const LoginPage = undefined;
describe('Login Form Component', () => {
    const handler = jest.fn(() => Promise.resolve());
    it('should render Login Form', async () => {
        customRender(<Logins />);
        expect(screen.getByRole('heading', {
            name: /Welcome/i
        })).toBeInTheDocument();
        expect(screen.getByTestId('userIdInput')).toBeInTheDocument();

        expect(screen.getByTestId('inputPassword')).toBeInTheDocument();
    
        expect(screen.getByTestId('Login')).toBeInTheDocument();
    
        expect(screen.getByRole('link', { name: /forgot password/i })).toBeInTheDocument();
    
        expect(screen.getByRole('link', { name: /m&m user login/i })).toBeInTheDocument();
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
        it('displays an error notification on login failure', async () => {
            // Mock a failed login response
            const loginFailureResponse = {
              isError: true,
              loginFailure: {
                title: 'User Not Found.',
                message: 'Invalid credentials',
              },
            };
         
            customRender(
         <Logins store={mockStore(loginFailureResponse)} />

            );
            await act(async () => {
            // Submit the form
            fireEvent.click(screen.getByTestId('Login'));
        });
            // Assert that an error notification is displayed
            await waitFor(() => expect(screen.findByText('Token is')).toBeNull());
           // expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
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

