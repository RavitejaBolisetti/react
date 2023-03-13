import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_ATTRIBUTE_MASTER } from 'constants/routingApi';
import { message } from 'antd';

export const HIERARCHY_ATTRIBUTE_MASTER_DATA_LOADED = 'HIERARCHY_ATTRIBUTE_MASTER_DATA_LOADED';
export const HIERARCHY_ATTRIBUTE_MASTER_DATA_SHOW_LOADING = 'HIERARCHY_ATTRIBUTE_MASTER_DATA_SHOW_LOADING';
export const HIERARCHY_ATTRIBUTE_MASTER_DETAIL_DATA_LOADED = 'HIERARCHY_ATTRIBUTE_MASTER_DETAIL_DATA_LOADED';

const receiveHeaderData = (data) => ({
    type: HIERARCHY_ATTRIBUTE_MASTER_DATA_LOADED,
    isLoaded: true,
    data,
});

const receiveHeirarchyDetailData = (data) => ({
    type: HIERARCHY_ATTRIBUTE_MASTER_DETAIL_DATA_LOADED,
    isLoaded: true,
    data,
});

const hierarchyAttributeMasterActions = {};

const baseURLPath = BASE_URL_ATTRIBUTE_MASTER;

hierarchyAttributeMasterActions.listShowLoading = (isLoading) => ({
    type: HIERARCHY_ATTRIBUTE_MASTER_DATA_SHOW_LOADING,
    isLoading,
});

hierarchyAttributeMasterActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, type = '' } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveHeaderData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: baseURLPath + (type ? '?type=' + type : ''),
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

hierarchyAttributeMasterActions.fetchDetailList = withAuthToken((params) => ({token,accessToken}) => (dispatch) => {
    const { setIsLoading, data, userId, type = '' } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveHeirarchyDetailData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: baseURLPath + (type ? '?type=' + type : ''),
        token,
        userId,
        accessToken,
        onSuccess,
        onError,
        onTimeout: () => onError('Request timed out, Please try again'),
        onUnAuthenticated: () => dispatch(doLogout()),
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

hierarchyAttributeMasterActions.saveData = withAuthToken((params) => ({token,accessToken}) => (dispatch) => {
    console.log("payload", params)
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

export { hierarchyAttributeMasterActions };
