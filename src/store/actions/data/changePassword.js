import { BASE_URL_CHANGE_PASSWORD } from 'constants/routingApi';
import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';

export const CHANGE_PASSWORD_LOADED = 'CHANGE_PASSWORD_LOADED';
export const CHANGE_PASSWORD_SHOW_LOADING = 'CHANGE_PASSWORD_SHOW_LOADING';

const changePasswordActions = {};

const baseURLPath = BASE_URL_CHANGE_PASSWORD;
const receiveHeaderData = (data) => ({
    type: CHANGE_PASSWORD_LOADED,
    isLoaded: true,
    data,
});
changePasswordActions.listShowLoading = (isLoading) => ({
    type: CHANGE_PASSWORD_SHOW_LOADING,
    isLoading,
});

changePasswordActions.saveData = withAuthToken((params) => (token) => (dispatch) => {
    const { setIsLoading, onError, data, userId, onSuccess } = params;

    setIsLoading(true);

    const apiCallParams = {
        data,
        method: 'post',
        url: baseURLPath,
        token,
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

export { changePasswordActions };
