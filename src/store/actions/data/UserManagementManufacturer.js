import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_USER_MANAGEMENT_DEALER, BASE_URL_USER_MANAGEMENT_MANUFACTURER } from 'constants/routingApi';
import { message } from 'antd';

export const USER_MANAGEMENT_DEALER_DATA_LOADED = 'USER_MANAGEMENT_DEALER_DATA_LOADED';
export const USER_MANAGEMENT_DEALER_DATA_SHOW_LOADING = 'USER_MANAGEMENT_DEALER_DATA_SHOW_LOADING';
export const USER_MANAGEMENT_DEALER_GROUP_LOADED = 'USER_MANAGEMENT_DEALER_GROUP_LOADED';
export const USER_MANAGEMENT_DEALER_SET_FORM_IS_VISIBLE = 'USER_MANAGEMENT_DEALER_SET_FORM_IS_VISIBLE';
export const USER_MANAGEMENT_DEALER_SET_FORM_DATA = 'USER_MANAGEMENT_DEALER_SET_FORM_DATA';
export const USER_MANAGEMENT_MANUFACTURER_DATA_LOADED = 'USER_MANAGEMENT_MANUFACTURER_DATA_LOADED';

const receiveUserManagementDealerdata = (data) => ({
    type: USER_MANAGEMENT_DEALER_DATA_LOADED,
    isLoaded: true,
    data,
});
const receiveUserManagementManufacturerData = (data) => ({
    type: USER_MANAGEMENT_MANUFACTURER_DATA_LOADED,
    isLoaded: true,
    data,
});
const userManagementManufacturerDataActions = {};

const baseURLPath = BASE_URL_USER_MANAGEMENT_DEALER;
const baseURLPathManufacturer = BASE_URL_USER_MANAGEMENT_MANUFACTURER;

userManagementManufacturerDataActions.listShowLoading = (isLoading) => ({
    type: USER_MANAGEMENT_DEALER_DATA_SHOW_LOADING,
    isLoading,
});

userManagementManufacturerDataActions.fetchDealerDetails = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, id } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveUserManagementDealerdata(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: baseURLPath + '?employeeCode=' + id,
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

userManagementManufacturerDataActions.saveDealerDetails = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
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

userManagementManufacturerDataActions.fetchManufacturerDetails = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, id } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveUserManagementManufacturerData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: baseURLPathManufacturer + '?tokenNumber=' + id,
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
userManagementManufacturerDataActions.saveManufacturerDetails = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
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

export { userManagementManufacturerDataActions };
