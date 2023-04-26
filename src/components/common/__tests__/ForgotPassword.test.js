import { screen, render, fireEvent } from "@testing-library/react";
import { ForgotPassword } from "../../Auth/ForgotPassword/ForgotPassword";
import { BrowserRouter,Route,Routes} from "react-router-dom"

jest.mock('react-redux', () => ({
    connect: () => (ForgotPassword) => ForgotPassword,
}));

const verifyUser = () => {}
const sendOTP = () => {}
const validateOTP = () => {}
const updatePassword = () => {}
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
       
    });