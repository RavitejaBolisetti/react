import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_GEO_GRAPHY, BASE_URL_GEO_GRAPHY_CHANGE_HISTORY } from 'constants/routingApi';
import { message } from 'antd';

export const GEO_DATA_LOADED = 'GEO_DATA_LOADED';
export const GEO_SET_FORM_DATA = 'GEO_SET_FORM_DATA';
export const GEO_SET_FORM_IS_VISIBLE = 'GEO_SET_FORM_IS_VISIBLE';
export const GEO_DATA_SHOW_LOADING = 'GEO_DATA_SHOW_LOADING';
export const GEO_GRAPHY_HIERARCHY_CHANGE_HISTORY_DATA_LOADED = 'GEO_GRAPHY_HIERARCHY_CHANGE_HISTORY_DATA_LOADED';
export const GEO_GRAPHY_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING = 'GEO_GRAPHY_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING';

const receiveData = (data) => ({
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

geoDataActions.setFormData = (formData) => ({
    type: GEO_SET_FORM_DATA,
    isFormDataLoaded: true,
    formData,
});

geoDataActions.setFormVisible = (isFormVisible) => ({
    type: GEO_SET_FORM_IS_VISIBLE,
    isFormVisible,
});

const receiveChangeHistoryData = (data) => ({
    type: GEO_GRAPHY_HIERARCHY_CHANGE_HISTORY_DATA_LOADED,
    isLoaded: true,
    data,
});

geoDataActions.changeHistoryShowLoading = (isLoading) => ({
    type: GEO_GRAPHY_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING,
    isLoading,
});

geoDataActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveData(res?.data));
        } else {
            onError('Internal Error, Please try again');
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
        onTimeout: () => onError('Request timed out, Please try again'),
        onUnAuthenticated: () => dispatch(doLogout()),
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

geoDataActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
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

geoDataActions.fetchChangeHistoryList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data } = params;
    setIsLoading(true);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveChangeHistoryData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_GEO_GRAPHY_CHANGE_HISTORY,
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

export { geoDataActions };
