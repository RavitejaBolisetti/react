import { BASE_URL_VERIFY_USER } from 'constants/routingApi';
import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';

export const FORGOT_PASSWORD_LOADED = 'FORGOT_PASSWORD_LOADED';
export const FORGOT_PASSWORD_SHOW_LOADING = 'FORGOT_PASSWORD_SHOW_LOADING';

const forgotPasswordActions = {};

const baseURLPath = BASE_URL_VERIFY_USER;

forgotPasswordActions.listShowLoading = (isLoading) => ({
    type: FORGOT_PASSWORD_SHOW_LOADING,
    isLoading,
});

forgotPasswordActions.verifyUser = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, onSuccess } = params;

    setIsLoading(true);

    const apiCallParams = {
        data,
        method: 'post',
        url: BASE_URL_VERIFY_USER,
        token,
        accessToken,
        userId,
        onSuccess,
        onError,
        onTimeout: () => onError('Request timed out, Please try again'),
        onUnAuthenticated: () => dispatch(doLogout()),
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

forgotPasswordActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, onSuccess } = params;

    setIsLoading(true);

    const apiCallParams = {
        data,
        method: 'post',
        url: baseURLPath,
        token,
        accessToken,
        userId,
        onSuccess,
        onError,
        onTimeout: () => onError('Request timed out, Please try again'),
        onUnAuthenticated: () => dispatch(doLogout()),
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

export { forgotPasswordActions };
