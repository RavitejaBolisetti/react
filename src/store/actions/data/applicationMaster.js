/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_APPLICATION_DETAILS, BASE_URL_APPLICATION_CRITICALITY_GROUP, BASE_URL_APPLICATION_ACTIONS, BASE_URL_APPLICATION_DEALER_LOCATION, BASE_URL_MENU, BASE_URL_CONFIG_PARAM_EDIT_TYPE } from 'constants/routingApi';
import { message } from 'antd';

export const APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED = 'APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED';
export const APPLICATION_MASTER_APPLICATION_DATA_SHOW_LOADING = 'APPLICATION_MASTER_APPLICATION_DATA_SHOW_LOADING';
export const APPLICATION_CRITICALITY_GROUP_LOADED = 'APPLICATION_CRITICALITY_GROUP_LOADED';
export const DEALER_LOCATIONS_LOADED = 'DEALER_LOCATIONS_LOADED';
export const APPLICATION_ACTON_DATA_LOADED = 'APPLICATION_ACTON_DATA_LOADED';
export const APPLICATION_MASTER_DATA_SHOW_LOADING = 'APPLICATION_MASTER_DATA_SHOW_LOADING';
export const APPLICATION_DATA_LOADED = 'APPLICATION_DATA_LOADED';
export const CONFIG_PARAM_DATA_LOADED = 'CONFIG_PARAM_DATA_LOADED';
export const APPLICATION_ON_SAVE_DATA_SHOW_LOADING = 'APPLICATION_ON_SAVE_DATA_SHOW_LOADING';
export const APPLICATION_MASTER_DETAIL_DATA_SHOW_LOADING = 'APPLICATION_MASTER_DETAIL_DATA_SHOW_LOADING';
export const APPLICATION_LOCATION_DATA = 'APPLICATION_LOCATION_DATA';

const receiveApplicationDetailsData = (data) => ({
    type: APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED,
    isLoaded: false,
    data,
});
const receiveCriticalityGroupData = (data) => ({
    type: APPLICATION_CRITICALITY_GROUP_LOADED,
    isLoaded: true,
    data,
});
const receiveDealerLocationsData = (data) => ({
    type: DEALER_LOCATIONS_LOADED,
    isLoaded: true,
    data,
});
const receiveApplicationActionData = (data) => ({
    type: APPLICATION_ACTON_DATA_LOADED,
    isLoaded: true,
    data,
});
const receiveMenuData = (data) => ({
    type: APPLICATION_DATA_LOADED,
    isLoaded: true,
    data,
});
const receiveParametersData = (data) => ({
    type: CONFIG_PARAM_DATA_LOADED,
    isLoaded: true,
    data,
});

const applicationMasterDataActions = {};

const baseURLPath = BASE_URL_APPLICATION_DETAILS;

applicationMasterDataActions.listShowLoading = (isLoading) => ({
    type: APPLICATION_MASTER_DATA_SHOW_LOADING,
    isLoading,
});
applicationMasterDataActions.detailListShowLoading = (isLoading) => ({
    type: APPLICATION_MASTER_DETAIL_DATA_SHOW_LOADING,
    isLoading,
});
applicationMasterDataActions.onSaveShowLoading = (isSaveLoading) => ({
    type: APPLICATION_ON_SAVE_DATA_SHOW_LOADING,
    isSaveLoading,
});

applicationMasterDataActions.locationDataLoding = (isLoading) => ({
    type: APPLICATION_LOCATION_DATA,
    isLoading,
});

applicationMasterDataActions.fetchApplicationDetails = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, id } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveApplicationDetailsData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: baseURLPath + '?appId=' + id,
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

applicationMasterDataActions.saveApplicationDetails = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
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

applicationMasterDataActions.fetchDealerLocations = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { customURL, setIsLoading, data, searchParam } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveDealerLocationsData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: customURL || BASE_URL_APPLICATION_DEALER_LOCATION + (searchParam ? `?searchParam=${searchParam}` : ''),
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

applicationMasterDataActions.fetchApplicationAction = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, id } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveApplicationActionData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_APPLICATION_ACTIONS + (id ? '?appId=' + id : ''),
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

applicationMasterDataActions.fetchApplicationCriticalityGroup = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveCriticalityGroupData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_APPLICATION_CRITICALITY_GROUP,
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

applicationMasterDataActions.fetchMenuList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, errorAction, data, userId, sid, deviceType } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveMenuData(res?.data));
        } else {
            onError();
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_MENU + (sid ? '?sid=' + sid : ''),
        deviceType,
        token,
        accessToken,
        userId,
        onSuccess,
        onError,
        onTimeout: () => errorAction('Request timed out, Please try again'),
        onUnAuthenticated: () => dispatch(doLogout()),
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

applicationMasterDataActions.fetchConfigurableParameterList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveParametersData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_CONFIG_PARAM_EDIT_TYPE + '?parameterType=APP_TYPE',
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

export { applicationMasterDataActions };
