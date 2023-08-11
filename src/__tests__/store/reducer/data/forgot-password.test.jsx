import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ForgotPassword } from '@store/reducers/data/forgotPassword';

describe('Forgot password reducer Component', () => {
    const initialState = {
        isLoaded: false,
        data: [],
        isLoading: false,
    };

    it('should render forgot password component', () => {
        const action = {
            type: "FORGOT_PASSWORD_LOADED",
            isLoaded: true,
            data: [
                { id: 1, name: 'password' },
                { id: 2, name: 'password' }
            ],
            isLoading: true,
        }
        const newState = ForgotPassword(initialState, action);

        expect(newState.isLoaded).toEqual(true);
        expect(newState.data).toEqual([
            { id: 1, name: 'password' },
            { id: 2, name: 'password' }
        ]);
    });

    it('should render forgot password component', () => {
        const action = {
            type: "FORGOT_PASSWORD_SHOW_LOADING",
            isLoaded: true,
            data: [
                { id: 1, name: 'password' },
                { id: 2, name: 'password' }
            ],
            isLoading: true,
        }
        const newState = ForgotPassword(initialState, action);

        expect(newState.isLoading).toEqual(true);
    });
});