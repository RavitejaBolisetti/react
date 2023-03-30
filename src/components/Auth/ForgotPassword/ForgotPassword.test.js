import { screen, render, fireEvent, findAllByText } from "@testing-library/react";
import { ForgotPassword } from "./ForgotPassword";
import { act } from 'react-dom/test-utils';
import { BrowserRouter,Route,Routes,MemoryRouter } from "react-router-dom"
import { async } from "sonarqube-scanner";

jest.mock('react-redux', () => ({
    connect: () => (ForgotPassword) => ForgotPassword,
}));

const doCloseLoginError = () => {
return;
}
const verifyUser = () => {}
const sendOTP = () => {}
const validateOTP = () => {}
const updatePassword = () => {}
// const errorMessage = () => {
//     return "Invalid credentials.";
// }
window.matchMedia =
    window.matchMedia ||
    function () {
        return { matches: false, addListener: function () {}, removeListener: function () {} };
    };

    describe('Forgot Password Component', () => {
        test('render forgot password page on click of Forgot Password Link', async () => {
            render(
                <BrowserRouter>
                <Routes>   
                    {/* <Route path="*" element= {<Logins doCloseLoginError={doCloseLoginError}  />}/> */}
                    <Route path="*" element= {<ForgotPassword verifyUser = {verifyUser} sendOTP = {sendOTP} validateOTP = {validateOTP} updatePassword = {updatePassword} />}/>
                </Routes>
            </BrowserRouter>);
             const userId = await screen.getByPlaceholderText('User ID (mile id.parent id)')
             const verifyUserBtn = await screen.getByText('Verify User')
             fireEvent.change(userId, {target: {value:''}});
             fireEvent.click(verifyUserBtn)
             const validation =  screen.findByText('Please Enter User ID (mile id.parent id)')
             expect(userId).toBeTruthy();
             expect(verifyUserBtn).toBeInTheDocument();
             expect(validation).toBeTruthy();

        });
        test('verify otp', async () => {
            render( <BrowserRouter>
                <Routes>   
                    <Route path="*" element= {<ForgotPassword verifyUser = {verifyUser} sendOTP = {sendOTP} validateOTP = {validateOTP} updatePassword = {updatePassword} />}/>
                </Routes>
            </BrowserRouter>);
             const verifyUserBtn = await screen.getByText('Verify User')
            expect(verifyUserBtn).toBeTruthy();
            fireEvent.change(userId, {target: {value:'user1'}});
            fireEvent.click(verifyUserBtn)
            const mobilecheckBox = await screen.findByText('Registered Mobile Number');
            const mailcheckBox = await screen.findByText('Registered Mail ID');

            expect(mobilecheckBox).toBeTruthy();
            expect(mailcheckBox).toBeTruthy();
        })
        // test('is error modal visible after entering username and password  ' , async() => {
        //     render(<BrowserRouter>
        //         <Routes>   
        //             <Route path="*" element= {<Logins doCloseLoginError={doCloseLoginError} errorTitle="Information" errorMessage = {errorMessage} isError={true} />}/>
        //         </Routes>
        //     </BrowserRouter>);
        //     const userId = await screen.getByPlaceholderText('User ID (MILE ID.Parent ID / Token No.)')
        //     const passInput = await screen.getByPlaceholderText('Password');
        //     const loginBtn = await screen.getByText('Login');
        //     fireEvent.change(userId, {target: {value:'reena'}});
        //     fireEvent.change(passInput, {target: {value:'asgdndjd'}});
        //     fireEvent.click(loginBtn);
        //     const errorModal = await screen.findAllByText('Invalid credentials.');

        //     expect(userId).toBeTruthy();
        //     expect(passInput).toBeTruthy();
        //     expect(loginBtn).toBeInTheDocument();
        //     expect(errorModal).toBeTruthy();
        // });
        // test('redirects to forgot password page after clicking forgot password link  ' , async() => {
        //     render(<BrowserRouter>
        //         <Routes>   
        //             <Route path="*" element= {<Logins doCloseLoginError={doCloseLoginError} errorTitle="Information" errorMessage = {errorMessage} isError={true} />}/>
        //             <Route path="/forgot-password" element= {<ForgotPassword/>}/>
        //         </Routes>
        //     </BrowserRouter>);
        //     const userId = await screen.getByPlaceholderText('User ID (mile id.parent id)')
        //     const forgotPasswordLink = await screen.getByText('Forgot password?')
        //     fireEvent.click(forgotPasswordLink);
        //     const generateOtpBtn = await screen.getByText('Generate OTP')
        //     expect(userId).toBeTruthy();
        //     expect(forgotPasswordLink).toBeTruthy();
        //     expect(generateOtpBtn).toBeInTheDocument();
        // });
    });

    <BrowserRouter>
    <Routes>   
        <Route path="/forgot-password" element= {<ForgotPassword  />}/>
    </Routes>
</BrowserRouter>