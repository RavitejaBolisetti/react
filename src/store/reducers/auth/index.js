import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR_CLOSE, AUTH_LOGIN_ERROR, AUTH_LOGOUT, USER_UNAUTHENTICATED, AUTH_LOGIN_USER_UNAUTHENTICATED_CLOSE } from '../../actions/auth';

const initialState = {
    isLoggedIn: false,
    token: null,
    userId: undefined,
    isError: false,
    message: '',
    isUnauthenticated: false,
    passwordStatus: null,
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN_USER_UNAUTHENTICATED_CLOSE:
            return { ...state, isUnauthenticated: false };

        case AUTH_LOGIN_SUCCESS:
            const { token, accessToken, userName, userId, passwordStatus, exp, clientId } = action;
            console.log("🚀 ~ file: index.js:20 ~ auth ~ action:", action);
            return {
                ...state,
                isUnauthenticated: false,
                isLoading: false,
                isError: false,
                loginFailure: false,
                isLoggedIn: true,
                token,
                accessToken,
                userName,
                userId,
                passwordStatus,
                exp,
                clientId,
            };
        case AUTH_LOGIN_ERROR:
            return {
                isUnauthenticated: false,
                isLoading: false,
                isError: true,
                isLoggedIn: false,
                loginFailure: false,
                title: action.title,
                message: action.message,
            };
        case AUTH_LOGIN_ERROR_CLOSE:
            return {
                ...state,
                isError: false,
            };
        case AUTH_LOGOUT:
            return {
                isUnauthenticated: false,
                isLoading: false,
                isError: false,
                isLoggedIn: false,
                loginFailure: false,
                message: action.message,
            };
        case USER_UNAUTHENTICATED:
            return {
                isUnauthenticated: true,
                isLoading: false,
                isError: false,
                isLoggedIn: false,
                loginFailure: false,
                message: action.message,
            };
        default:
            return { ...state };
    }
};
