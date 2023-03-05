import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_CRITICALITY_GROUP } from 'constants/routingApi';
import { message } from 'antd';

export const CRITICALITY_DATA_LOADED = 'CRITICALITY_DATA_LOADED';
export const CRITICALITY_SET_FORM_DATA = 'CRITICALITY_SET_FORM_DATA';
export const CRITICALITY_DATA_SHOW_LOADING = 'CRITICALITY_DATA_SHOW_LOADING';

const receiveHeaderData = (data) => ({
    type: CRITICALITY_DATA_LOADED,
    isLoaded: true,
    data,
});

const criticalityDataActions = {};

const baseURLPath = BASE_URL_CRITICALITY_GROUP;

criticalityDataActions.listShowLoading = (isLoading) => ({
    type: CRITICALITY_DATA_SHOW_LOADING,
    isLoading,
});

criticalityDataActions.setFormData = (formData) => ({
    type: CRITICALITY_SET_FORM_DATA,
    isFormDataLoaded: true,
    formData,
});

criticalityDataActions.fetchData = withAuthToken((params) => (token, accessToken, userId) => (dispatch) => {
    console.log(params);
    const { setIsLoading, data } = params;
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

criticalityDataActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
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

export { criticalityDataActions };
