import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
// import { BASE_URL_GEO_GRAPHY, BASE_URL_GEO_GRAPHY_CHANGE_HISTORY } from 'constants/routingApi';
import { BASE_URL_APPLICATION_DETAILS, BASE_URL_APPLICATION_ACTIONS, BASE_URL_DOCUMENT_TYPE } from 'constants/routingApi';
import { message } from 'antd';

export const APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED = 'APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED';
export const APPLICATION_MASTER_APPLICATION_DATA_SHOW_LOADING = 'APPLICATION_MASTER_APPLICATION_DATA_SHOW_LOADING';

const receiveApplicationDetailsData = (data) => ({
    type: APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED,
    isLoaded: true,
    data,
});

const applicationMasterDataActions = {};

const baseURLPath = BASE_URL_APPLICATION_DETAILS;


applicationMasterDataActions.fetchApplicationDetails = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, id } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveApplicationDetailsData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: baseURLPath + ('?id=' + id ),
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


export { applicationMasterDataActions };
