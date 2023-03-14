import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
// import { BASE_URL_GEO_GRAPHY, BASE_URL_GEO_GRAPHY_CHANGE_HISTORY } from 'constants/routingApi';
import { BASE_URL_APPLICATIONS, BASE_URL_APPLICATION_DETAILS, BASE_URL_APPLICATION_CRITICALITY_GROUP, BASE_URL_APPLICATION_ACTIONS, BASE_URL_DOCUMENT_TYPE, BASE_URL_APPLICATION_DEALER_LOCATION } from 'constants/routingApi';
import { message } from 'antd';

export const APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED = 'APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED';
export const APPLICATION_MASTER_APPLICATION_DATA_SHOW_LOADING = 'APPLICATION_MASTER_APPLICATION_DATA_SHOW_LOADING';
export const APPLICATION_CRITICALITY_GROUP_LOADED = 'APPLICATION_CRITICALITY_GROUP_LOADED';
export const DEALER_LOCATIONS_LOADED = 'DEALER_LOCATIONS_LOADED';
export const APPLICATION_ACTON_DATA_LOADED = 'APPLICATION_ACTON_DATA_LOADED';

const receiveApplicationDetailsData = (data) => ({
    type: APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED,
    isLoaded: true,
    data,
});
const receiveCriticalityGroupData = (data) => ({
    type: APPLICATION_CRITICALITY_GROUP_LOADED,
    isLoaded: true,
    data,
});
const receiveDealerLocationsData = (data) => ({
    type: DEALER_LOCATIONS_LOADED,
    isLoaded: true,
    data,
});
const receiveApplicationActionData = (data) => ({
    type: APPLICATION_ACTON_DATA_LOADED,
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
        url: baseURLPath + '?id=1',
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

applicationMasterDataActions.saveApplicationDetails = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
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

applicationMasterDataActions.fetchDealerLocations = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, applicationId } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveDealerLocationsData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_APPLICATION_DEALER_LOCATION + '?applicationId=' + applicationId,
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

applicationMasterDataActions.fetchApplicationAction = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, appId } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveApplicationActionData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_APPLICATION_ACTIONS + '?appId=' + appId,
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

applicationMasterDataActions.fetchApplicationCriticalityGroup = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveCriticalityGroupData(res?.data.map((el) => ({ critcltyGropCode: el?.critcltyGropCode, critcltyGropDesc: el?.critcltyGropDesc }))));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_APPLICATION_CRITICALITY_GROUP,
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