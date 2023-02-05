import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_GEO_GRAPHY } from 'constants/routingApi';

export const GEO_DATA_LOADED = 'GEO_DATA_LOADED';
export const GEO_DATA_SHOW_LOADING = 'GEO_DATA_SHOW_LOADING';

const receiveHeaderData = (data) => ({
    type: GEO_DATA_LOADED,
    isLoaded: true,
    data,
});

const geoDataActions = {};

const baseURLPath = BASE_URL_GEO_GRAPHY;

geoDataActions.listShowLoading = (isLoading) => ({
    type: GEO_DATA_SHOW_LOADING,
    isLoading,
});

geoDataActions.fetchList = withAuthToken((params) => (token) => (dispatch) => {
    const { setIsLoading, errorAction, data, userId } = params;
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

export { geoDataActions };
