import jwtDecode from 'jwt-decode';
import { message } from 'antd';
import moment from 'moment';
import { EncryptStorage } from 'encrypt-storage';

import { axiosAPICall } from 'utils//axiosAPICall';
import { createBrowserHistory } from 'history';
import { withAuthToken, withAuthTokenAndUserId } from 'utils//withAuthToken';

import { ENCRYPT_KEY } from 'constants/constants';
import { BASE_URL_LOGIN } from 'constants/routingApi';

export const APP_VERSION = 'APP_VERSION';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTH_LOGIN_FAILURE_CLOSE = 'AUTH_LOGIN_FAILURE_CLOSE';
export const AUTH_LOGIN_ERROR_CLOSE = 'AUTH_LOGIN_ERROR_CLOSE';
export const AUTH_LOGIN_USER_UNAUTHENTICATED_CLOSE = 'AUTH_LOGIN_USER_UNAUTHENTICATED_CLOSE';

export const CLEAR_ALL_DATA = 'CLEAR_ALL_DATA';
export const AUTH_ROLE_RIGHTS = 'AUTH_ROLE_RIGHTS';

const LOCAL_STORAGE_KEY_AUTH_TOKEN = 'authToken';
const LOCAL_STORAGE_KEY_ROLE_RIGHTS = 'roleRights';
const LOCAL_STORAGE_KEY_MODULE_RIGHTS = 'moduleRights';

const history = createBrowserHistory();
const APIKEY = ENCRYPT_KEY;
const encryptStorage = new EncryptStorage(APIKEY, {
    // prefix: '@enc',
});

export const authLoginSucess = (token, userName, userId) => ({
    type: AUTH_LOGIN_SUCCESS,
    token,
    userName,
    userId,
    isLoggedIn: true,
});

const receiveVersionData = (data) => ({
    type: APP_VERSION,
    data,
});

const authLoginFailureClose = () => ({
    type: AUTH_LOGIN_FAILURE_CLOSE,
});
const authLoginErrorClose = () => ({
    type: AUTH_LOGIN_ERROR_CLOSE,
});

const authLoginUnAuthenticatedErrorClose = () => ({
    type: AUTH_LOGIN_USER_UNAUTHENTICATED_CLOSE,
});

export const authLoggingError = (message) => ({
    type: AUTH_LOGIN_ERROR,
    message,
});

const authDoLogout = () => ({
    type: AUTH_LOGOUT,
});

const unAuthenticate = (message) => ({
    type: USER_UNAUTHENTICATED,
    message,
});

export const doLogout = withAuthToken((params) => (token) => (dispatch) => {
    //message.info('Your session has expired please login again');
    dispatch(logoutClearAllData());
});

export const doLogoutAPI = withAuthTokenAndUserId((params) => (token, userId) => (dispatch) => {
    const { successAction } = params;
    const url = 'logout';

    const authPostLogout = () => {
        dispatch(logoutClearAllData());
    };

    const logoutError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res.status) {
            successAction && successAction();
            authPostLogout();
        } else {
            logoutError('There was an error, Please try again');
        }
    };

    const apiCallParams = {
        method: 'put',
        url,
        token,
        data: undefined,
        onSuccess,
        onError: () => logoutError('There was an error, Please try again'),
        onTimeout: () => logoutError('Request timed out, Please try again'),
        postRequest: () => {},
        onUnAuthenticated: (errorMessage) => dispatch(unAuthenticateUser(errorMessage)),
        onUnauthorized: (errorMessage) => dispatch(unAuthenticateUser(errorMessage)),
    };
    axiosAPICall(apiCallParams);
});

const logoutClearAllData = () => (dispatch) => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY_ROLE_RIGHTS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_MODULE_RIGHTS);
    history.push('/');
    dispatch(authDoLogout(message));
};
export const unAuthenticateUser = (errorMessage) => (dispatch) => {
    dispatch(unAuthenticate(errorMessage));
    dispatch(logoutClearAllData());
};

export const clearAllAuthentication = (message) => (dispatch) => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY_ROLE_RIGHTS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_MODULE_RIGHTS);
};

const authPostLoginActions =
    ({ authToken, saveTokenAndRoleRights = true }) =>
    (dispatch) => {
        if (saveTokenAndRoleRights) {
            localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_TOKEN, authToken);
        }

        const { username: userName, username: userId, exp, client_id: clientId } = jwtDecode(authToken);

        dispatch(authLoginSucess(authToken, userName, userName, exp, clientId, userId));
    };

export const readFromStorageAndValidateAuth = () => (dispatch) => {
    try {
        const authToken = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_TOKEN);
        console.log('authToken', authToken);
        if (!authToken) {
            dispatch(authDoLogout());
        } else {
            const { exp } = jwtDecode(authToken);
            if (moment(exp * 1000).isAfter()) {
                dispatch(
                    authPostLoginActions({
                        authToken,
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

export const doCloseLoginFailure = () => (dispatch) => {
    dispatch(authLoginFailureClose());
};

export const doCloseLoginError = () => (dispatch) => {
    dispatch(authLoginErrorClose());
};

export const doCloseUnAuthenticatedError = () => (dispatch) => {
    dispatch(authLoginUnAuthenticatedErrorClose());
};

export const doLogin = (requestData, showFormLoading) => (dispatch) => {
    const url = BASE_URL_LOGIN;

    const hideLoading = () => {
        if (showFormLoading) {
            dispatch(showFormLoading(false));
        }
    };

    const authPostLogin = (token) => {
        dispatch(
            authPostLoginActions({
                authToken: token,
            })
        );
    };

    const loginError = (message) => dispatch(authLoggingError(message));

    // const loginFailure = () => {
    //     dispatch(authLoginFailure());
    // }

    if (showFormLoading) {
        dispatch(showFormLoading(true));
    }
    const onWarning = (errorMessage) => loginError(errorMessage);
    const onSuccess = (res) => {
        console.log(res, res?.data?.data?.accessToken, jwtDecode(res?.data?.data?.accessToken));
        if (res?.data?.data?.accessToken) {
            authPostLogin(res?.data?.data?.accessToken);
        } else {
            loginError('There was an error, Please try again');
        }
    };

    const apiCallParams = {
        method: 'post',
        url,
        data: requestData,
        onSuccess,
        onError: () => loginError('There was an error, Please try again'),
        onWarning,
        onTimeout: () => loginError('Request timed out, Please try again'),
        postRequest: hideLoading,
        onUnAuthenticated: loginError,
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
    };
    axiosAPICall(apiCallParams);
};

export const forgotPassword = (params) => (dispatch) => {
    const { email, forgotPasswordIsLoading, forgotPasswordSuccess, forgotPasswordFailure, forgotPasswordError } = params;
    const url = '/api/auth/initiateResetPassword';

    forgotPasswordIsLoading(true);

    const onError = (error, statusCode) => {
        if (statusCode === 404) {
            forgotPasswordFailure('We could not find a user with that email id. Please try again');
        } else {
            forgotPasswordError('There was an error, please try again');
        }
    };
    const onSuccess = (res) => {
        if (res.data) {
            forgotPasswordSuccess(res.data.message);
        } else {
            forgotPasswordError('There was an error, please try again');
        }
    };
    const onWarning = (errorMessage) => forgotPasswordError(errorMessage);

    const apiCallParams = {
        method: 'post',
        url,
        data: email,
        onSuccess,
        onError,
        onWarning,
        onTimeout: () => onError('Request timed out, Please try again'),
        onUnAuthenticated: () => dispatch(doLogout()),
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
        postRequest: () => forgotPasswordIsLoading(false),
    };
    axiosAPICall(apiCallParams);
};

export const fetchAppVersion = (showFormLoading) => (dispatch) => {
    const url = '/api/auth/getappversion';

    const hideLoading = () => {
        if (showFormLoading) {
            dispatch(showFormLoading(false));
        }
    };

    const error = (errorMessage) => message.error(errorMessage);

    if (showFormLoading) {
        dispatch(showFormLoading(true));
    }
    const onWarning = (errorMessage) => error(errorMessage);
    const onSuccess = (res) => {
        if (res.data) {
            dispatch(receiveVersionData(res.data));
        } else {
            error('There was an error, Please try again');
        }
    };

    const apiCallParams = {
        method: 'get',
        url,
        data: undefined,
        onSuccess,
        onError: () => error('There was an error, Please try again'),
        onWarning,
        onTimeout: () => error('Request timed out, Please try again'),
        postRequest: hideLoading,
        onUnAuthenticated: error,
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
    };
    axiosAPICall(apiCallParams);
};
