import {
    AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE_CLOSE, AUTH_LOGIN_ERROR_CLOSE,
    AUTH_LOGIN_FAILURE, AUTH_LOGIN_ERROR, AUTH_LOGOUT, USER_UNAUTHENTICATED,
    AUTH_LOGIN_USER_UNAUTHENTICATED_CLOSE, AUTH_ROLE_RIGHTS, APP_VERSION
} from '../../actions/auth';

const initialState = {
    isLoggedIn: false,
    token: null,
    isError: false,
    roleRight: {},
    message: '',
    isUnauthenticated: false,
    nciId: undefined
};

export const auth = (state = initialState, action) => {
    const versionData = {
        isAppVersionLoaded: state.isAppVersionLoaded,
        appVersionData: state.appVersionData,
    }
    switch (action.type) {
        case AUTH_LOGIN_USER_UNAUTHENTICATED_CLOSE:
            return { ...state, isUnauthenticated: false, }
        case AUTH_LOGIN_ERROR_CLOSE:
            return {
                ...state,
                isError: false
            }
        case AUTH_LOGIN_FAILURE_CLOSE:
            return {
                ...state,
                loginFailure: false
            }
        case AUTH_LOGIN_SUCCESS:
            const { token, userName, email, roleRight, userId, contactId, lastLoginDate, siteId, isPasswordExpired, passwordExpiredMessage, nciId } = action;
            return {
                ...state,
                isUnauthenticated: false,
                isLoading: false,
                isError: false,
                loginFailure: false,
                isLoggedIn: true,
                token,
                userName,
                email,
                userId,
                contactId,
                roleRight,
                lastLoginDate,
                siteId,
                isPasswordExpired,
                passwordExpiredMessage,
                nciId
            }
        case AUTH_ROLE_RIGHTS:
            return {
                ...state,
                roleRight: action.roleRight
            }
        case AUTH_LOGIN_FAILURE:
            return {
                ...versionData,
                isUnauthenticated: false,
                isLoading: false,
                isError: false,
                isLoggedIn: false,
                loginFailure: true
            }
        case AUTH_LOGIN_ERROR:
            return {
                ...versionData,
                isUnauthenticated: false,
                isLoading: false,
                isError: true,
                isLoggedIn: false,
                loginFailure: false,
                message: action.message
            }
        case AUTH_LOGOUT:
            return {
                ...versionData,
                isUnauthenticated: false,
                isLoading: false,
                isError: false,
                isLoggedIn: false,
                loginFailure: false,
                message: action.message,
            }
        case USER_UNAUTHENTICATED:
            return {
                ...versionData,
                isUnauthenticated: true,
                isLoading: false,
                isError: false,
                isLoggedIn: false,
                loginFailure: false,
                message: action.message
            }
        case APP_VERSION:
            return {
                ...state,
                isAppVersionLoaded: true,
                appVersionData: action.data
            }
        default:
            return { ...state };
    }
};