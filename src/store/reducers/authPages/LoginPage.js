import { LOGIN_PAGE_LOGGING_IN, LOGIN_PAGE_CLEAR } from 'store/actions/authPages/LoginPage';

export const initialState = {
    isLoading: false,
};

export const LoginPage = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_PAGE_LOGGING_IN:
            return { isLoading: action.isLoading };
        case LOGIN_PAGE_CLEAR:
            return {
                state: undefined,
                isLoading: false,
            };
        default:
            return state;
    }
};
