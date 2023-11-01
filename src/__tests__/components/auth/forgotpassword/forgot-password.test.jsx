import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import customRender from '@utils/test-utils';
import { ForgotPassword } from 'components/Auth/ForgotPassword/ForgotPassword';

jest.mock('react-i18next', () => ({
    useTranslation: () => {
        return {
            t: str => str
        }
    },
    initReactI18next: {
        type: 'Kai',
        init: () => {},
    }
}));

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/forgotPassword', () => ({
    forgotPasswordActions: {}
}))

describe('ForgotPassword Component render', () => {
    it('should render ForgotPassword component page', async () => {
        customRender(<ForgotPassword isLoading={false} listShowLoading={true} />);
    });

    it('should check all steps to update password', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ForgotPassword: { isLoading: false },
            },
        });

        const verifyUser=jest.fn();
        const sendOTP=jest.fn();
        const validateOTP=jest.fn();
        const updatePassword=jest.fn();

        const verifiedUserData={
            contactNumber: '99876543210',
            email: 'kai@example.com'
        }

        customRender(
            <Provider store={mockStore}>
                <ForgotPassword verifyUser={verifyUser} sendOTP={sendOTP} validateOTP={validateOTP} updatePassword={updatePassword} listShowLoading={true} />
            </Provider>
        );

        //Step 1

        const userIdLabel = screen.getByText('User ID (MILE ID.Parent ID)');
        fireEvent.click(userIdLabel);

        const userId = screen.getByRole('textbox', { name: '' });
        fireEvent.change(userId, { target: { value: 'Kai' } });

        const verifyUserBtn = screen.getByRole('button', { name: 'Verify User' });
        fireEvent.click(verifyUserBtn);

        await waitFor(() => expect(verifyUser).toHaveBeenCalled());
        verifyUser.mock.calls[0][0].onSuccess(verifiedUserData);

        //Step 2

        await waitFor(() => { expect(screen.getByRole('button', { name: 'Send OTP' })).toBeInTheDocument() });

        const sendOtpBtn=screen.getByRole('button', { name: 'Send OTP' });
        fireEvent.click(sendOtpBtn);

        await waitFor(() => expect(sendOTP).toHaveBeenCalled());
        sendOTP.mock.calls[0][0].onSuccess();

        //Step 3

        await waitFor(() => { expect(screen.getByRole('button', { name: 'Verify OTP' })).toBeInTheDocument() });

        const otfBox=screen.getAllByRole('textbox', { name: '' });
        fireEvent.change(otfBox[0], { target: { value: 1 } });
        fireEvent.change(otfBox[1], { target: { value: 2 } });
        fireEvent.change(otfBox[2], { target: { value: 3 } });
        fireEvent.change(otfBox[3], { target: { value: 4 } });
        fireEvent.change(otfBox[4], { target: { value: 5 } });
        fireEvent.change(otfBox[5], { target: { value: 6 } });

        const verifyOtpBtn=screen.getByRole('button', { name: 'Verify OTP' });
        fireEvent.click(verifyOtpBtn);

        await waitFor(() => expect(validateOTP).toHaveBeenCalled());
        validateOTP.mock.calls[0][0].onSuccess();

        //Step 4

        await waitFor(() => { expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument() });

        const newPassword=screen.getByTestId('newPassword');
        fireEvent.change(newPassword, { target: { value: 'Kai@12345' } });

        const confirmPassword=screen.getByTestId('confirmPassword');
        fireEvent.change(confirmPassword, { target: { value: 'Kai@12345' } });

        const submitBtn=screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitBtn);

        await waitFor(() => expect(updatePassword).toHaveBeenCalled());
        updatePassword.mock.calls[0][0].onSuccess();
        updatePassword.mock.calls[0][0].onError('Error');

    });
});
