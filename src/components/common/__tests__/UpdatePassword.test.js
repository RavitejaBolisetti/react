import { screen, render, fireEvent, findAllByText, getByPlaceholderText, getAllByPlaceholderText, getByText, findByText, findByRole } from '@testing-library/react';
import { BrowserRouter, Route, Routes, MemoryRouter } from 'react-router-dom';
import { async } from 'sonarqube-scanner';
import { Login } from '../../Auth/Login';

import { UpdatePassword } from '../../Auth/UpdatePassword/UpdatePassword';

jest.mock('react-redux', () => ({
    connect: () => (UpdatePassword) => UpdatePassword,
}));

const saveData = () => {
    return;
};

const doCloseLoginError = () => {
    return;
};

window.matchMedia =
    window.matchMedia ||
    function () {
        return { matches: false, addListener: function () {}, removeListener: function () {} };
    };

describe('updatePassword component', () => {
    test('render update password button', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<UpdatePassword saveData={saveData} />} />
                </Routes>
            </BrowserRouter>
        );
        const oldpassword = screen.getByPlaceholderText('Old password');
        const newPassword = screen.getByPlaceholderText('Enter new password');
        const confirmpassword = screen.getByPlaceholderText('Re-enter new password');
        const updatebtn = await screen.findByText('Update Password');
        const backlogin = screen.getByText('Back To Login');
        fireEvent.click(backlogin);
        fireEvent.change(oldpassword, { target: { value: 'Test@1234' } });
        fireEvent.change(newPassword, { target: { value: 'Test@123' } });
        fireEvent.change(confirmpassword, { target: { value: 'Test@123' } });
        fireEvent.click(updatebtn);
        expect(oldpassword).toBeTruthy();
        expect(newPassword).toBeTruthy();
        expect(confirmpassword).toBeTruthy();
        expect(updatebtn).toBeInTheDocument();
        expect(backlogin).toBeTruthy();
    });

    test('render validation', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<UpdatePassword />} />
                </Routes>
            </BrowserRouter>
        );
        const oldpassword = screen.getByPlaceholderText('Old password');
        const newPassword = screen.getByPlaceholderText('Enter new password');
        const confirmpassword = screen.getByPlaceholderText('Re-enter new password');
        const updatebtn = await screen.findByText('Update Password');
        fireEvent.change(oldpassword, { target: { value: 'Test@1234' } });
        fireEvent.change(newPassword, { target: { value: 'Test@123' } });
        fireEvent.change(confirmpassword, { target: { value: 'Test@123' } });
        fireEvent.change(oldpassword, { target: { value: '' } });
        fireEvent.change(newPassword, { target: { value: '' } });
        fireEvent.change(confirmpassword, { target: { value: '' } });
        fireEvent.click(updatebtn);
        const validation = screen.findByText('This field is required');
        const validation2 = screen.findByText('Password you entered is not matched');
        expect(oldpassword).toBeTruthy();
        expect(newPassword).toBeTruthy();
        expect(confirmpassword).toBeTruthy();
        expect(updatebtn).toBeInTheDocument();
        expect(validation).toBeTruthy();
        expect(validation2).toBeTruthy();
    });
});
