import { BASE_URL_HEADER_DETAIL } from 'constants/routingApi';
import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';

export const HEADER_USER_DATA_LOADED = 'HEADER_USER_DATA_LOADED';
export const HEADER_USER_DATA_SHOW_LOADING = 'HEADER_USER_DATA_SHOW_LOADING';

const receiveHeaderData = (data) => ({
    type: HEADER_USER_DATA_LOADED,
    isLoaded: true,
    data,
});

const headerDataActions = {};

const baseURLPath = BASE_URL_HEADER_DETAIL;

headerDataActions.listShowLoading = (isLoading) => ({
    type: HEADER_USER_DATA_SHOW_LOADING,
    isLoading,
});

headerDataActions.fetchData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, errorAction, data } = params;
    // console.log(params,token,accessToken,"headrer")
    setIsLoading(true);
    const onError = () => errorAction('Internal Error, Please try again');

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveHeaderData(res?.data));
        } else {
            onError();
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: baseURLPath,
        token,
        accessToken,
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

export { headerDataActions };
