import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_DEALER_MANPOWER } from 'constants/routingApi';
import { message } from 'antd';

export const DEALER_MANPOWER_DATA_LOADED = 'DEALER_MANPOWER_DATA_LOADED';
export const DEALER_MANPOWER_SET_FORM_DATA = 'DEALER_MANPOWER_SET_FORM_DATA';
export const DEALER_MANPOWER_SET_FORM_VISIBLE = 'DEALER_MANPOWER_SET_FORM_VISIBLE';
export const DEALER_MANPOWER_DATA_SHOW_LOADING = 'DEALER_MANPOWER_DATA_SHOW_LOADING';

const receiveData = (data) => ({
    type: DEALER_MANPOWER_DATA_LOADED,
    isLoaded: true,
    data,
});

const dealerManpowerActions = {};

const baseURLPath = BASE_URL_DEALER_MANPOWER;

dealerManpowerActions.listShowLoading = (isLoading) => ({
    type: DEALER_MANPOWER_DATA_SHOW_LOADING,
    isLoading,
});

dealerManpowerActions.setFormData = (formData) => ({
    type: DEALER_MANPOWER_SET_FORM_DATA,
    isFormDataLoaded: true,
    formData,
});

dealerManpowerActions.setFormVisible = (isFormVisible) => ({
    type: DEALER_MANPOWER_SET_FORM_VISIBLE,
    isFormVisible,
});

dealerManpowerActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
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

dealerManpowerActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
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

export { dealerManpowerActions };
