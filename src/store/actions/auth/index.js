import jwtDecode from 'jwt-decode';
import { message } from 'antd';
import moment from 'moment';

import { axiosAPICall } from 'utils//axiosAPICall';
import { withAuthToken } from 'utils//withAuthToken';

import { BASE_URL_LOGIN, BASE_URL_LOGOUT } from 'constants/routingApi';

import { clearData as clearHeaderData } from 'store/actions/common/header';
import { clearData as clearMenuData } from 'store/actions/data/menu';

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
export const LOCAL_STORAGE_KEY_AUTH_USER_ID = 'userId';
export const LOCAL_STORAGE_KEY_AUTH_PASSWORD_STATUS = 'passwordStatus';

export const authLoginSucess = (idToken, accessToken, userName, userId, passwordStatus) => ({
    type: AUTH_LOGIN_SUCCESS,
    token: idToken,
    accessToken: accessToken,
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

export const logoutClearAllData = (message) => (dispatch) => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_ID_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_USER_ID);
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_PASSWORD_STATUS);

    dispatch(authDoLogout());
};

export const unAuthenticateUser = (errorMessage) => (dispatch) => {
    dispatch(unAuthenticate(errorMessage));
    dispatch(logoutClearAllData());
};

export const doLogout = withAuthToken((params) => (token) => (dispatch) => {
    dispatch(logoutClearAllData());
});

const authPostLoginActions =
    ({ idToken, accessToken, userId, passwordStatus, saveTokenAndRoleRights = true }) =>
    (dispatch) => {
        if (saveTokenAndRoleRights) {
            localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_ID_TOKEN, idToken);
            localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_ACCESS_TOKEN, accessToken);
            localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_USER_ID, userId);
            localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_PASSWORD_STATUS, JSON.stringify(passwordStatus));
        }

        const { username: userName } = jwtDecode(idToken);

        dispatch(authLoginSucess(idToken, accessToken, userName, userId, passwordStatus));
    };

export const readFromStorageAndValidateAuth = () => (dispatch) => {
    try {
        const idToken = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_ID_TOKEN);
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_ACCESS_TOKEN);
        const userId = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_USER_ID);
        const passwordStatus = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_PASSWORD_STATUS);

        if (!idToken) {
            dispatch(authDoLogout());
        } else {
            const { exp } = jwtDecode(idToken);
            if (moment(exp * 1000).isAfter()) {
                dispatch(
                    authPostLoginActions({
                        idToken,
                        accessToken,
                        userId,
                        passwordStatus: passwordStatus && JSON.parse(passwordStatus),
                    })
                );
            } else {
                dispatch(authDoLogout());
            }
        }
    } catch (e) {
        dispatch(authDoLogout());
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

export const doLogoutAPI = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { onSuccess, onError } = params;
    const url = BASE_URL_LOGOUT;

    const onSuccessAction = (res) => {
        onSuccess && onSuccess(res);
        dispatch(doLogout());
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
        onTimeout: () => dispatch(doLogout()),
        postRequest: () => {},
        onUnAuthenticated: (errorMessage) => dispatch(unAuthenticateUser(errorMessage)),
        onUnauthorized: (errorMessage) => dispatch(unAuthenticateUser(errorMessage)),
    };
    axiosAPICall(apiCallParams);
});
