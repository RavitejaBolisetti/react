/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
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
const userManagementDataActions = {};

const baseURLPath = BASE_URL_USER_MANAGEMENT_DEALER;
const baseURLPathManufacturer = BASE_URL_USER_MANAGEMENT_MANUFACTURER;

userManagementDataActions.listShowLoading = (isLoading) => ({
    type: USER_MANAGEMENT_DEALER_DATA_SHOW_LOADING,
    isLoading,
});

userManagementDataActions.fetchDealerDetails = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, id, FetchError } = params;
    setIsLoading(true);
    const onError = (errorMessage) => {
        FetchError(errorMessage);
        message.error(errorMessage);
    };

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

userManagementDataActions.saveDealerDetails = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
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

userManagementDataActions.fetchManufacturerDetails = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, applicationId } = params;
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
        url: baseURLPathManufacturer + '?applicationId=' + applicationId,
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
userManagementDataActions.saveManufacturerDetails = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
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

export { userManagementDataActions };
