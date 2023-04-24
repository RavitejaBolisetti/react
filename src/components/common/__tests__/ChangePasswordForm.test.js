import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ChangePasswordForm } from '../ChangePassword/ChangePasswordForm';

jest.mock('react-redux', () => ({
    connect: () => (ChangePasswordForm) => ChangePasswordForm,
}));

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
        const validation = await screen.findByText('Enter old password');
        const validation2 = await screen.findByText('Enter new password');
        const validation3 = await screen.findByText('Enter confirm password');
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
        const validation = await screen.findByText('Confirm Password should contain at least 1 lowercase, 1 uppercase, 1 numeric, 1 special character and should be of minimum 8 characters in length');
        const validation2 = await screen.findByText('New Password should contain at least 1 lowercase, 1 uppercase, 1 numeric, 1 special character and should be of minimum 8 characters in length');

        expect(validation).toBeTruthy();
        expect(validation2).toBeTruthy();
        expect(changebtn).toBeInTheDocument();
    });
});
