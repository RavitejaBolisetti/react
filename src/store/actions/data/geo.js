import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_GEO_GRAPHY } from 'constants/routingApi';
import { message } from 'antd';

export const GEO_DATA_LOADED = 'GEO_DATA_LOADED';
export const GEO_SET_FORM_DATA = 'GEO_SET_FORM_DATA';
export const GEO_SET_FORM_IS_VISIBLE = 'GEO_SET_FORM_IS_VISIBLE';
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

geoDataActions.setFormData = (formData) => ({
    type: GEO_SET_FORM_DATA,
    isFormDataLoaded: true,
    formData,
});

geoDataActions.setFormVisible = (isFormVisible) => ({
    type: GEO_SET_FORM_IS_VISIBLE,
    isFormVisible,
});

geoDataActions.fetchList = withAuthToken((params) => (token) => (dispatch) => {
    const { setIsLoading, data, userId } = params;
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

geoDataActions.saveData = withAuthToken((params) => (token) => (dispatch) => {
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

export { geoDataActions };
