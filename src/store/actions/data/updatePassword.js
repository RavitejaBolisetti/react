import { BASE_URL_UPDATE_PASSWORD } from 'constants/routingApi';
import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';

export const UPDATE_PASSWORD_LOADED = 'UPDATE_PASSWORD_LOADED';
export const UPDATE_PASSWORD_SHOW_LOADING = 'UPDATE_PASSWORD_SHOW_LOADING';

const updatePasswordActions = {};

const baseURLPath = BASE_URL_UPDATE_PASSWORD;

updatePasswordActions.listShowLoading = (isLoading) => ({
    type: UPDATE_PASSWORD_SHOW_LOADING,
    isLoading,
});

updatePasswordActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, onSuccess, token: preToken, accessToken: preAccessToken, userId: preUserId } = params;

    setIsLoading(true);

    const apiCallParams = {
        data,
        method: 'post',
        url: baseURLPath,
        token: token || preToken,
        accessToken: accessToken || preAccessToken,
        userId: userId || preUserId,
        onSuccess,
        onError,
        onTimeout: () => onError('Request timed out, Please try again'),
        onUnAuthenticated: () => dispatch(doLogout()),
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

export { updatePasswordActions };
