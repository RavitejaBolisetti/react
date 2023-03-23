import { screen, render, fireEvent, findAllByText } from "@testing-library/react";
import { Logins } from './Login'; 
import { ForgotPassword } from "../ForgotPassword";
import { act } from 'react-dom/test-utils';
import { BrowserRouter,Route,Routes,MemoryRouter } from "react-router-dom"
import { async } from "sonarqube-scanner";

jest.mock('react-redux', () => ({
    connect: () => (Logins) => Logins,
}));

const doCloseLoginError = () => {
return;
}
const errorMessage = () => {
    return "Information";
}
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
                    <Route path="*" element= {<Logins doCloseLoginError={doCloseLoginError}  />}/>
                </Routes>
            </BrowserRouter>);
            const userId = await screen.getByPlaceholderText('User ID (MILE ID.Parent ID / Token No.)')
            const passInput = await screen.getByPlaceholderText('Password');
            const loginBtn = await screen.getByText('Login');
            fireEvent.change(userId, {target: {value:'122'}});
            fireEvent.change(passInput, {target: {value:'080870'}});
            fireEvent.change(userId, {target: {value:''}});
            fireEvent.change(passInput, { target: { value: '' } });
            fireEvent.click(loginBtn)
            const validation =  screen.findByText('Please Enter User ID (MILE ID.Parent ID) / Token No.')
            const validation2 =  screen.findByText('Please Enter Password');
            expect(userId).toBeTruthy();
            expect(passInput).toBeTruthy();
            expect(validation).toBeTruthy();
            expect(validation2).toBeTruthy();
            expect(loginBtn).toBeInTheDocument();

        });
        test('is error modal visible after entering username and password  ' , async() => {
            render(<BrowserRouter>
                <Routes>   
                    <Route path="*" element= {<Logins doCloseLoginError={doCloseLoginError} errorTitle="Information" errorMessage = {errorMessage} isError={true} />}/>
                </Routes>
            </BrowserRouter>);
            const userId = await screen.getByPlaceholderText('User ID (MILE ID.Parent ID / Token No.)')
            const passInput = await screen.getByPlaceholderText('Password');
            const loginBtn = await screen.getByText('Login');
            fireEvent.change(userId, {target: {value:'reena'}});
            fireEvent.change(passInput, {target: {value:'asgdndjd'}});
            fireEvent.click(loginBtn);
            const errorModal = await screen.findAllByText('Information');

            expect(userId).toBeTruthy();
            expect(passInput).toBeTruthy();
            expect(loginBtn).toBeInTheDocument();
            expect(errorModal).toBeTruthy();
        });
        test('redirects to forgot password page after clicking forgot password link  ' , async() => {
            render(<BrowserRouter>
                <Routes>   
                    <Route path="*" element= {<Logins doCloseLoginError={doCloseLoginError} errorTitle="Information" errorMessage = {errorMessage} isError={true} />}/>
                    <Route path="/forgot-password" element= {<ForgotPassword/>}/>
                </Routes>
            </BrowserRouter>);
            const userId = await screen.getByPlaceholderText('User ID (MILE ID.Parent ID / Token No.)')
            const forgotPasswordLink = await screen.getByText('Forgot password?')
            fireEvent.click(forgotPasswordLink);
            const generateOtpBtn = await screen.getByText('Generate OTP')
            expect(userId).toBeTruthy();
            expect(forgotPasswordLink).toBeTruthy();
            expect(generateOtpBtn).toBeInTheDocument();
        });
    });

    <BrowserRouter>
    <Routes>   
        <Route path="/login" element= {<Logins  />}/>
    </Routes>
</BrowserRouter>