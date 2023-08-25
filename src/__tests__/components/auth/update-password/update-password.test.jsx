import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import { UpdatePassword } from 'components/Auth';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

jest.mock('store/actions/auth', () => ({
    __esModule: true,
    authPostLogin: jest.fn().mockReturnValue((data) => (dispatch) => {
        dispatch({ type: 'Action', payload: data });
    })
}));

describe("ChangeHistory Components", () => {

    it("should render ChangeHistory components", () => {
        customRender(<UpdatePassword />);
    });

    it("should focus on label on click", () => {
        customRender(<UpdatePassword field />);
        const oldPassword=screen.getByText('Old password');
        fireEvent.click(oldPassword);
        const newPassword=screen.getByText('New password');
        fireEvent.click(newPassword);
    });

    it("show and hide password should work on eye click", () => {
        customRender(<UpdatePassword />);
        const setShowPassword=screen.getAllByTestId('eyeContainer');
        fireEvent.mouseDown(setShowPassword[0]);
        fireEvent.mouseUp(setShowPassword[0]);
        fireEvent.mouseLeave(setShowPassword[0]);
    });

    it("skip for now should work on click", () => {
        const mockStore = createMockStore({
            auth: {
                preLoginData: {
                    passwordStatus: {
                        status: 'A',
                    }
                }
            },
        });
        customRender(
        <Provider store={mockStore}>
            <UpdatePassword />
        </Provider>
        );

        const skipNow=screen.getByText('Skip For Now');
        fireEvent.click(skipNow);
    });

    it("form should work", () => {
        customRender(<UpdatePassword />);
        const oldPassword=screen.getByTestId('oldPasswordInput');
        fireEvent.change(oldPassword, { target: { value: 'Kai' } });
        const newPassword=screen.getByTestId('newPasswordInput');
        fireEvent.change(newPassword, { target: { value: 'Kai' } });
        const confirmPassword=screen.getByTestId('confirmNewPasswordInput');
        fireEvent.change(confirmPassword, { target: { value: 'Kai' } });
        const updatePassword=screen.getByRole('button', { name: 'Update Password' });
        fireEvent.click(updatePassword);
    });

    it("confirm password should validate new password", () => {
        customRender(<UpdatePassword />);
        const newPassword=screen.getByTestId('newPasswordInput');
        fireEvent.change(newPassword, { target: { value: 'Kai' } });
        const confirmPassword=screen.getByTestId('confirmNewPasswordInput');
        fireEvent.change(confirmPassword, { target: { value: 'test' } });
    });

});