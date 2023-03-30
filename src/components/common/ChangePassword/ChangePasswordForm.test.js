import { screen, render, fireEvent, findAllByText, getAllByPlaceholderText, getByText, findByRole } from '@testing-library/react';
import { BrowserRouter, Route, Routes, MemoryRouter } from 'react-router-dom';
import { async } from 'sonarqube-scanner';

import { ChangePasswordForm } from './ChangePasswordForm';

jest.mock('react-redux', () => ({
    connect: () => (ChangePasswordForm) => ChangePasswordForm,
}));

const showGlobalNotification = () => {
    return;
};
const isLoggedIn = () => {
    return;
};

const errorMessage = () => {
    return 'Invalid credentials.';
};
window.matchMedia =
    window.matchMedia ||
    function () {
        return { matches: false, addListener: function () {}, removeListener: function () {} };
    };
describe('updatepasswordform component', () => {
    test('render change password button', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<ChangePasswordForm />} />
                </Routes>
            </BrowserRouter>
        );
        const oldPassword = screen.getByPlaceholderText('Enter old password');
        const newPassword = screen.getByPlaceholderText('Enter new password');
        const confirmPassword = screen.getByPlaceholderText('Enter confirm password');
        const changebtn = await screen.findByText('Change Password');
        fireEvent.change(oldPassword, { target: { value: 'aaaaa' } });
        fireEvent.change(newPassword, { target: { value: 'ddddd' } });
        fireEvent.change(confirmPassword, { target: { value: 'ddddd' } });
        fireEvent.change(oldPassword, { target: { value: '' } });
        fireEvent.change(newPassword, { target: { value: '' } });
        fireEvent.change(confirmPassword, { target: { value: '' } });
        fireEvent.click(changebtn);
    });

    test('render change password validation', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<ChangePasswordForm />} />
                </Routes>
            </BrowserRouter>
        );
        const oldPassword = screen.getByPlaceholderText('Enter old password');
        const newPassword = screen.getByPlaceholderText('Enter new password');
        const confirmPassword = screen.getByPlaceholderText('Enter confirm password');
        const changebtn = await screen.findByText('Change Password');
        fireEvent.change(oldPassword, { target: { value: '' } });
        fireEvent.change(newPassword, { target: { value: '' } });
        fireEvent.change(confirmPassword, { target: { value: '' } });
        fireEvent.change(oldPassword, { target: { value: '' } });
        fireEvent.change(newPassword, { target: { value: '' } });
        fireEvent.change(confirmPassword, { target: { value: '' } });
        fireEvent.click(changebtn);
        const validation = screen.findByText('Enter old password');
        const validation2 = screen.findByText('Enter new password');
        const validation3 = screen.findByText('Enter confirm password');
        expect(oldPassword).toBeTruthy();
        expect(newPassword).toBeTruthy();
        expect(confirmPassword).toBeTruthy();
        expect(validation).toBeTruthy();
        expect(validation2).toBeTruthy();
        expect(validation3).toBeTruthy();
        expect(changebtn).toBeInTheDocument();
    });

    test('render password validation', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<ChangePasswordForm />} />
                </Routes>
            </BrowserRouter>
        );
        const oldPassword = screen.getByPlaceholderText('Enter old password');
        const newPassword = screen.getByPlaceholderText('Enter new password');
        const confirmPassword = screen.getByPlaceholderText('Enter confirm password');
        const changebtn = await screen.findByText('Change Password');
        fireEvent.change(oldPassword, { target: { value: 'qqq' } });
        fireEvent.change(newPassword, { target: { value: 'wwwww' } });
        fireEvent.change(confirmPassword, { target: { value: 'qqqqq' } });

        fireEvent.click(changebtn);
        const validation = screen.findByText('Confirm Password should contain at least 1 lowercase, 1 uppercase, 1 numeric, 1 special character and should be of minimum 8 characters in length');
        const validation2 = screen.findByText('New Password should contain at least 1 lowercase, 1 uppercase, 1 numeric, 1 special character and should be of minimum 8 characters in length');

        expect(validation).toBeTruthy();
        expect(validation2).toBeTruthy();
        expect(changebtn).toBeInTheDocument();
    });
});
