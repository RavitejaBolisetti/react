/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_PRE_SUCCESS, AUTH_LOGIN_ERROR_CLOSE, AUTH_LOGIN_ERROR, AUTH_LOGOUT, USER_UNAUTHENTICATED, AUTH_LOGIN_USER_UNAUTHENTICATED_CLOSE } from '../../actions/auth';

const initialState = {
    isLoggedIn: false,
    token: null,
    userId: undefined,
    isError: false,
    message: '',
    isUnauthenticated: false,
    passwordStatus: null,
    preLoginData: null,
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN_USER_UNAUTHENTICATED_CLOSE:
            return { ...state, isUnauthenticated: false };

        case AUTH_LOGIN_SUCCESS:
            const { token, accessToken, refreshToken, userName, userId, passwordStatus, exp, clientId } = action;
            return {
                ...state,
                isUnauthenticated: false,
                isLoading: false,
                isError: false,
                loginFailure: false,
                isLoggedIn: true,
                token,
                accessToken,
                refreshToken,
                userName,
                userId,
                passwordStatus,
                exp,
                clientId,
            };
        case AUTH_LOGIN_PRE_SUCCESS:
            const { data } = action;
            return {
                ...state,
                preLoginData: data,
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
