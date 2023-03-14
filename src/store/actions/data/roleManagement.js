import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_ROLE_MANAGEMENT } from 'constants/routingApi';
import { message } from 'antd';

export const ROLE_MANAGEMENT_DATA_LOADED = 'ROLE_MANAGEMENT_DATA_LOADED';
export const ROLE_MANAGEMENT_SET_FORM_DATA = 'GEO_SET_FORM_DATA';
export const ROLE_MANAGEMENT_SET_FORM_IS_VISIBLE = 'GEO_SET_FORM_IS_VISIBLE';
export const ROLE_MANAGEMENT_DATA_SHOW_LOADING = 'GEO_DATA_SHOW_LOADING';

const receiveHeaderData = (data) => ({
    type: ROLE_MANAGEMENT_DATA_LOADED,
    isLoaded: true,
    data,
});

const rolemanagementDataActions = {};

const baseURLPath = BASE_URL_ROLE_MANAGEMENT;

rolemanagementDataActions.listShowLoading = (isLoading) => ({
    type: ROLE_MANAGEMENT_SET_FORM_IS_VISIBLE,
    isLoading,
});

rolemanagementDataActions.setFormData = (formData) => ({
    type: ROLE_MANAGEMENT_SET_FORM_DATA,
    isFormDataLoaded: true,
    formData,
});

rolemanagementDataActions.setFormVisible = (isFormVisible) => ({
    type: ROLE_MANAGEMENT_SET_FORM_IS_VISIBLE,
    isFormVisible,
});

rolemanagementDataActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
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
        url: baseURLPath + '?id=Mn',
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

rolemanagementDataActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, userId, onSuccess } = params;

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

export { rolemanagementDataActions };