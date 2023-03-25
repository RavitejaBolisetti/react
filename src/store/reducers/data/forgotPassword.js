import { FORGOT_PASSWORD_LOADED, FORGOT_PASSWORD_SHOW_LOADING } from 'store/actions/data/forgotPassword';

const initialState = {
    isLoaded: false,
    data: [],
    isLoading: false,
};

export const ForgotPassword = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case FORGOT_PASSWORD_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return { ...state };
    }
};
