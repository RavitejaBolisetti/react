/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { showGlobalNotification } from 'store/actions/notification';

import { withAuthToken } from 'utils//withAuthToken';
import { axiosAPICall } from 'utils//axiosAPICall';

import { BASE_URL_LOGIN, BASE_URL_REFRESH_TOKEN, BASE_URL_LOGOUT } from 'constants/routingApi';
import { LANGUAGE_EN } from 'language/en';

export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_PRE_SUCCESS = 'AUTH_LOGIN_PRE_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_LOGIN_ERROR_CLOSE = 'AUTH_LOGIN_ERROR_CLOSE';
export const AUTH_LOGIN_USER_UNAUTHENTICATED_CLOSE = 'AUTH_LOGIN_USER_UNAUTHENTICATED_CLOSE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';

export const CLEAR_ALL_DATA = 'CLEAR_ALL_DATA';

export const LOCAL_STORAGE_KEY_AUTH_ID_TOKEN = 'idToken';
export const LOCAL_STORAGE_KEY_AUTH_ACCESS_TOKEN = 'accessToken';
export const LOCAL_STORAGE_KEY_AUTH_REFERSH_TOKEN = 'refreshToken';
export const LOCAL_STORAGE_KEY_AUTH_USER_ID = 'userId';
export const LOCAL_STORAGE_KEY_AUTH_PASSWORD_STATUS = 'passwordStatus';

export const authLoginSucess = (idToken, accessToken, refreshToken, userName, userId, passwordStatus) => ({
    type: AUTH_LOGIN_SUCCESS,
    token: idToken,
    accessToken: accessToken,
    refreshToken: refreshToken,
    userName,
    userId,
    passwordStatus,
    isLoggedIn: true,
});

export const authPreLoginSuccess = (data) => ({
    type: AUTH_LOGIN_PRE_SUCCESS,
    data,
});

export const authLoggingError = (title, message) => ({
    type: AUTH_LOGIN_ERROR,
    title,
    message,
});

const authLoginErrorClose = () => ({
    type: AUTH_LOGIN_ERROR_CLOSE,
});

const authLoginUnAuthenticatedErrorClose = () => ({
    type: AUTH_LOGIN_USER_UNAUTHENTICATED_CLOSE,
});

const authDoLogout = () => ({
    type: AUTH_LOGOUT,
});

const unAuthenticate = (message) => ({
    type: USER_UNAUTHENTICATED,
    message,
});

export const clearLocalStorageData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_ID_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_REFERSH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_USER_ID);
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_PASSWORD_STATUS);
};

export const authUserLogout = (res) => (dispatch) => {
    dispatch(doLogout());
    dispatch(showGlobalNotification({ notificationType: 'success', title: res?.title || 'Logout Successful', message: Array.isArray(res?.responseMessage) ? res?.responseMessage[0] : res?.responseMessage }));
};

export const authUserTokenExpired = () => (dispatch) => {
    clearLocalStorageData();
    dispatch(authDoLogout());
    dispatch(showGlobalNotification({ notificationType: 'success', title: LANGUAGE_EN.GENERAL.SESSION_EXPIRED.TITLE, message: LANGUAGE_EN.GENERAL.SESSION_EXPIRED.MESSAGE }));
};

export const unAuthenticateUser = (errorMessage) => (dispatch) => {
    dispatch(unAuthenticate(errorMessage));
    clearLocalStorageData();
};

export const doLogout = (res) => (dispatch) => {
    clearLocalStorageData();
    dispatch(authDoLogout());
};

const authPostLoginActions =
    ({ idToken, accessToken, refreshToken, userId, passwordStatus, saveTokenAndRoleRights = true }) =>
    (dispatch) => {
        if (saveTokenAndRoleRights) {
            localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_ID_TOKEN, idToken);
            localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_ACCESS_TOKEN, accessToken);
            localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_REFERSH_TOKEN, refreshToken);
            localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_USER_ID, userId);
            localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_PASSWORD_STATUS, JSON.stringify(passwordStatus));
        }

        const { username: userName } = jwtDecode(idToken);

        dispatch(authLoginSucess(idToken, accessToken, refreshToken, userName, userId, passwordStatus));
    };

export const readFromStorageAndValidateAuth = () => (dispatch) => {
    try {
        const idToken = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_ID_TOKEN);
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_REFERSH_TOKEN);
        const userId = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_USER_ID);
        const passwordStatus = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_PASSWORD_STATUS);

        if (!idToken) {
            dispatch(doLogout());
        } else {
            const { exp } = jwtDecode(idToken);
            if (moment(exp * 1000).isAfter()) {
                dispatch(
                    authPostLoginActions({
                        idToken,
                        accessToken,
                        refreshToken,
                        userId,
                        passwordStatus: passwordStatus && JSON.parse(passwordStatus),
                    })
                );
            } else {
                dispatch(authUserTokenExpired());
            }
        }
    } catch (e) {
        dispatch(doLogout());
    }
};

export const doCloseLoginError = () => (dispatch) => {
    dispatch(authLoginErrorClose());
};

export const doCloseUnAuthenticatedError = () => (dispatch) => {
    dispatch(authLoginUnAuthenticatedErrorClose());
};

export const authPostLogin = (data) => (dispatch) => {
    dispatch(
        authPostLoginActions({
            userId: data?.userId,
            idToken: data?.idToken,
            accessToken: data?.accessToken,
            refreshToken: data?.refreshToken,
            passwordStatus: data?.passwordStatus,
        })
    );
};

export const authPreLogin = (data) => (dispatch) => {
    dispatch(authPreLoginSuccess(data));
};

export const doLogin = (requestData, showFormLoading, onLogin, onError) => (dispatch) => {
    const url = BASE_URL_LOGIN;

    const hideLoading = () => {
        if (showFormLoading) {
            dispatch(showFormLoading(false));
        }
    };

    const loginError = ({ title = 'ERROR', message }) => {
        onError({ title, message });
        dispatch(authLoggingError(title, message));
    };

    if (showFormLoading) {
        dispatch(showFormLoading(true));
    }

    const onWarning = (errorMessage) => loginError(errorMessage);
    const onSuccess = (res) => {
        if (res?.data) {
            onLogin(res?.data);
        } else {
            loginError({ message: 'There was an error, Please try again' });
        }
    };

    const apiCallParams = {
        method: 'post',
        url,
        displayErrorTitle: true,
        data: requestData,
        onSuccess,
        onError: loginError,
        onWarning,
        onTimeout: () => loginError({ message: 'Request timed out, Please try again' }),
        postRequest: hideLoading,
        onUnAuthenticated: loginError,
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
    };
    axiosAPICall(apiCallParams);
};

export const doRefreshToken = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { onSuccess, onError, data } = params;
    const url = BASE_URL_REFRESH_TOKEN;

    const onSuccessAction = (res) => {
        onSuccess && onSuccess(res);
    };

    const apiCallParams = {
        method: 'put',
        url,
        token,
        accessToken,
        userId,
        data,
        onSuccess: onSuccessAction,
        onError: onError,
        onTimeout: () => dispatch(authUserLogout()),
        postRequest: () => {},
        onUnAuthenticated: (errorMessage) => dispatch(unAuthenticateUser(errorMessage)),
        onUnauthorized: (errorMessage) => dispatch(unAuthenticateUser(errorMessage)),
    };
    axiosAPICall(apiCallParams);
});

export const doLogoutAPI = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { onSuccess, onError } = params;
    const url = BASE_URL_LOGOUT;

    const onSuccessAction = (res) => {
        dispatch(doLogout(res));
        onSuccess && onSuccess(res);
    };

    const apiCallParams = {
        method: 'post',
        url,
        token,
        accessToken,
        userId,
        data: { userId },
        onSuccess: onSuccessAction,
        onError: onError,
        onTimeout: () => dispatch(authUserLogout()),
        postRequest: () => {},
        onUnAuthenticated: (errorMessage) => dispatch(unAuthenticateUser(errorMessage)),
        onUnauthorized: (errorMessage) => dispatch(unAuthenticateUser(errorMessage)),
    };
    axiosAPICall(apiCallParams);
});
