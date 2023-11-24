import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { UpdatePassword } from 'components/Auth';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

jest.mock('store/actions/auth', () => ({
    __esModule: true,
    authPostLogin: jest.fn().mockReturnValue((data) => (dispatch) => {
        dispatch({ type: 'Action', payload: data });
    })
}));

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

jest.mock('store/actions/data/updatePassword', () => ({
    updatePasswordActions: {}
}))

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

    it("form should work", async () => {

        const saveData=jest.fn();

        customRender(<UpdatePassword saveData={saveData} />);

        const oldPassword=screen.getByTestId('oldPasswordInput');
        fireEvent.change(oldPassword, { target: { value: 'Kai' } });

        const newPassword=screen.getByTestId('newPasswordInput');
        fireEvent.change(newPassword, { target: { value: 'Kai' } });

        const confirmPassword=screen.getByTestId('confirmNewPasswordInput');
        fireEvent.change(confirmPassword, { target: { value: 'Kai' } });

        const updatePassword=screen.getByRole('button', { name: 'Update Password' });
        fireEvent.click(updatePassword);

        await waitFor(() => expect(saveData).toHaveBeenCalled());

        saveData.mock.calls[0][0].onSuccess(true);
        saveData.mock.calls[0][0].onError(['Error']);

    });

    it("confirm password should validate new password", () => {
        customRender(<UpdatePassword />);
        const newPassword=screen.getByTestId('newPasswordInput');
        fireEvent.change(newPassword, { target: { value: 'Kai' } });
        const confirmPassword=screen.getByTestId('confirmNewPasswordInput');
        fireEvent.change(confirmPassword, { target: { value: 'test' } });
    });

});