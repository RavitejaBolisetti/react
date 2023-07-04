import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ForgotPassword } from '@components/Auth/ForgotPassword/ForgotPassword';

const verifyUser = () => {};
const sendOTP = () => {};
const validateOTP = () => {};
const updatePassword = () => {};
describe('Forgot Password Component', () => {
    it('should render forgot password page on click of Forgot Password Link', async () => {
        customRender(<ForgotPassword verifyUser={verifyUser} sendOTP={sendOTP} validateOTP={validateOTP} updatePassword={updatePassword} />);
        const userId = await screen.findByText('User ID (MILE ID.Parent ID)');
        const verifyUserBtn = await screen.getByText('Verify User');
        fireEvent.click(verifyUserBtn);
        const validation = screen.findByText('Please enter user id');
        expect(userId).toBeTruthy();
        expect(verifyUserBtn).toBeInTheDocument();
        expect(validation).toBeTruthy();
    });
});
