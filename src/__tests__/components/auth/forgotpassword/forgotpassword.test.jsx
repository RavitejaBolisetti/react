import { screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import customRender from "@utils/test-utils";
import { ForgotPassword } from "@components/Auth/ForgotPassword/ForgotPassword";
import userEvent from '@testing-library/user-event';
const user = userEvent.setup();
const props = {
    setCurrentStep:jest.fn(),
    setSelectedUserId:jest.fn(),
    setSubmitButtonActive:jest.fn(),
    setTooltipVisible:jest.fn(),
    setVerifiedUserData:jest.fn(),
    setPassword:jest.fn(),
    setShowPassword:jest.fn(),
    setDisableVerifyOTP:jest.fn(),
    setInValidOTP:jest.fn(),
    setValidationKey:jest.fn(),
    setOTPInput:jest.fn(),
    setOTPMessage:jest.fn(),
    setCounter:jest.fn(),
    selectedUserId:null,
    otpMessage: null,
}
afterEach(cleanup);

const currentStep = 1;

describe('Forgot Password Component render', () => {
    it('should render ForgotPassword component page', async () => {
        customRender(<ForgotPassword />);
        expect(screen.getByRole('heading', {
            name: /forgot your password/i
        })).toBeInTheDocument();
    });
    it("should render step 1 for forgetPassword components", async () => {
        //jest.setTimeout(200000);
        customRender(<ForgotPassword currentStep={1} {...props}/>);
        const inputBox = screen.getByRole("textbox");
        fireEvent.change(inputBox, { target: { value: "test" } });
        expect(inputBox.value.includes("test"));
        await act(async () => {
            const verifyUserButton = screen.getByRole('button', {
                name: /verify user/i
            });
            user.click(verifyUserButton); 
        });  
        
        await waitFor(() =>{
            customRender(<ForgotPassword currentStep={2} {...props}/>);
            screen.findByText("User credentials verified successfully");
            screen.findByText("sushil.kumxxxx@wipro.com");
            screen.findByText("XXXXXX5423");
            const mobileNumber = screen.findByText("Registered Mobile Number");
            const emailAddress = screen.findByText("Registered Email Address");
            //await fireEvent.click(mobileNumber);
            //await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1))
           //user.click(screen.findByText('Registered Mobile Number'))

            //expect(screen.findByLabelText('Check')).toBeChecked()
            //const checkbox = findByRole('checkbox');

            // Assert that the checkbox is checked
            //expect(checkbox).toBeChecked();
            const sendOTP = screen.findByText("Send OTP");
            user.click(sendOTP);
        })  
            
    });
    it("should render second scree", async()=>{
        customRender(<ForgotPassword currentStep={2} {...props}/>);
        const mobileNumber = screen.findByText("Registered Mobile Number");
        const emailAddress = screen.findByText("Registered Email Address");
        //await fireEvent.click(mobileNumber);
        //await expect(mobileNumber.checked).toEqual(false);
       screen.findByText("Send OTP");
       user.click(screen.findByText("Send OTP"));
     })  
        it("should check blank user not founded", async () => {
            jest.setTimeout(200000);
            customRender(<ForgotPassword currentStep={1} />);
            const inputBox = screen.getByRole("textbox");
            fireEvent.change(inputBox, { target: { value: "dkfdj" } });
            expect(inputBox.value.includes("dkfdj"));
            await act(async () => {
                const userButton = screen.getByRole('button', {
                    name: /verify user/i
                });
                fireEvent.click(userButton); 
            });  
            
            await waitFor(() =>{
                screen.findByText("USER_NOT_FOUND");
            })   
        });
    it('should check back to login button event', async () => {
        customRender(<ForgotPassword />);
        const loginLink = screen.getByRole('link', { name: /Back to Login/i });
        expect(loginLink.getAttribute('href')).toBe('/login');
    })
    it("should check blank field validation", async()=> {
        jest.setTimeout(200000);
        customRender(<ForgotPassword />);
        await act(async () => {
            const verifyUserButton = screen.getByRole('button', {
                name: /verify user/i
            });
            fireEvent.click(verifyUserButton); 
        });
        expect(await screen.findByText('Please enter user id', undefined, {
            timeout: 2000})).toBeVisible();
    })
    // it("should check blank user not founded", async()=> {
    //     customRender(<ForgotPassword handleFormChange={jest.fn()} props={userId} currentStep={currentStep} />);
    // });
});


