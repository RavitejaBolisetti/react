import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_QUALIFICATION_MASTER } from 'constants/routingApi';
import { message } from 'antd';

export const QUALIFICATION_DATA_LOADED = 'QUALIFICATION_DATA_LOADED';
export const QUALIFICATION_SET_FORM_DATA = 'QUALIFICATION_SET_FORM_DATA';
export const QUALIFICATION_SET_FORM_IS_VISIBLE = 'QUALIFICATION_SET_FORM_IS_VISIBLE';
export const QUALIFICATION_DATA_SHOW_LOADING = 'QUALIFICATION_DATA_SHOW_LOADING';

const receiveData = (data) => ({
    type: QUALIFICATION_DATA_LOADED,
    isLoaded: true,
    data,
});

const qualificationDataActions = {};

const baseURLPath = BASE_URL_QUALIFICATION_MASTER;

qualificationDataActions.listShowLoading = (isLoading) => ({
    type: QUALIFICATION_DATA_SHOW_LOADING,
    isLoading,
});

qualificationDataActions.setFormData = (formData) => ({
    type: QUALIFICATION_SET_FORM_DATA,
    isFormDataLoaded: true,
    formData,
});

qualificationDataActions.setFormVisible = (isFormVisible) => ({
    type: QUALIFICATION_SET_FORM_IS_VISIBLE,
    isFormVisible,
});

qualificationDataActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
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

qualificationDataActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { onError, data, onSuccess } = params;

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
        postRequest: () => console.log('successs'),
    };

    axiosAPICall(apiCallParams);
});

export { qualificationDataActions };
