import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_DEALER_LOCATION_TYPE } from 'constants/routingApi';
import { message } from 'antd';

export const DEALERLOCATION_DATA_LOADED = 'DEALERLOCATION_DATA_LOADED';
export const DEALERLOCATION_SET_FORM_DATA = 'DEALERLOCATION_SET_FORM_DATA';
export const DEALERLOCATION_SET_FORM_IS_VISIBLE = 'DEALERLOCATION_SET_FORM_IS_VISIBLE';
export const DEALERLOCATION_DATA_SHOW_LOADING = 'DEALERLOCATION_DATA_SHOW_LOADING';
export const DEALERLOCATION_DATA_ON_SAVE_SHOW_LOADING = 'DEALERLOCATION_DATA_ON_SAVE_SHOW_LOADING';

const receiveData = (data) => ({
    type: DEALERLOCATION_DATA_LOADED,
    isLoaded: true,
    data,
});

const dealerlocationDataActions = {};

const baseURLPath = BASE_URL_DEALER_LOCATION_TYPE;

dealerlocationDataActions.listShowLoading = (isLoading) => ({
    type: DEALERLOCATION_DATA_SHOW_LOADING,
    isLoading,
});

dealerlocationDataActions.onSaveShowLoading = (isLoading) => ({
    type: DEALERLOCATION_DATA_ON_SAVE_SHOW_LOADING,
    isLoading,
});

dealerlocationDataActions.setFormData = (formData) => ({
    type: DEALERLOCATION_SET_FORM_DATA,
    isFormDataLoaded: true,
    formData,
});

dealerlocationDataActions.setFormVisible = (isFormVisible) => ({
    type: DEALERLOCATION_SET_FORM_IS_VISIBLE,
    isFormVisible,
});

dealerlocationDataActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onSuccess: onSuccessAction, data } = params;

    setIsLoading(true);
    const onError = (errorMessage) => {
        setIsLoading(false);
        message.error(errorMessage);
    };

    const onSuccess = (res) => {
        setIsLoading(false);
        if (res?.data) {
            onSuccessAction && onSuccessAction(res);
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

dealerlocationDataActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { onError, data, onSuccess, setIsLoading } = params;
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
        postRequest: () => console.log('successs'),
    };

    axiosAPICall(apiCallParams);
});

export { dealerlocationDataActions };
