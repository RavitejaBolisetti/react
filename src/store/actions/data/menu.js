import { BASE_URL_MENU } from 'constants/routingApi';
import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';

export const MENU_DATA_LOADED = 'MENU_DATA_LOADED';
export const MENU_DATA_SHOW_LOADING = 'MENU_DATA_SHOW_LOADING';

const receiveHeaderData = (data) => ({
    type: MENU_DATA_LOADED,
    isLoaded: true,
    data,
});

const menuDataActions = {};

const baseURLPath = BASE_URL_MENU;

menuDataActions.listShowLoading = (isLoading) => ({
    type: MENU_DATA_SHOW_LOADING,
    isLoading,
});

menuDataActions.fetchData = withAuthToken((params) => (token) => (dispatch) => {
    const { setIsLoading, errorAction, data, userId } = params;
    setIsLoading(true);
    const onError = () => errorAction('Internal Error, Please try again');

    const onSuccess = (res) => {
        if (res?.data?.statusCode === 200) {
            dispatch(receiveHeaderData(res?.data?.data));
        } else {
            onError();
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: baseURLPath,
        token,
        userId,
        onSuccess,
        onError,
        onTimeout: () => errorAction('Request timed out, Please try again'),
        onUnAuthenticated: () => dispatch(doLogout()),
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

export { menuDataActions };
