/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_CONFIG_PARAM_EDIT, BASE_URL_CONFIG_PARAM_EDIT_TYPE } from 'constants/routingApi';
import { message } from 'antd';

export const CONFIG_PARAM_EDIT_DATA_LOADED = 'CONFIG_PARAM_EDIT_DATA_LOADED';
export const CONFIG_PARAM_DATA_FILTERED_DATA_LOADED = 'CONFIG_PARAM_DATA_FILTERED_DATA_LOADED';
export const CONFIG_PARAM_EDIT_SHOW_LOADING = 'CONFIG_PARAM_EDIT_SHOW_LOADING';
export const CONFIG_PARAM_DATA_LOADED = 'CONFIG_PARAM_DATA_LOADED';
export const CONFIG_PARAM_EDIT_DATA_SHOW_LOADING = 'CONFIG_PARAM_EDIT_DATA_SHOW_LOADING';
export const CONFIG_PARAM_EDIT_SHOW_LOADING_ON_SAVE = 'CONFIG_PARAM_EDIT_SHOW_LOADING_ON_SAVE';

const receiveParametersData = (data, parameterType) => ({
    type: CONFIG_PARAM_DATA_LOADED,
    isLoaded: true,
    data,
    parameterType,
});

const receiveFilteredParametersData = (data, parameterType) => ({
    type: CONFIG_PARAM_DATA_FILTERED_DATA_LOADED,
    isLoaded: true,
    data,
    parameterType,
});

const receiveData = (data) => ({
    type: CONFIG_PARAM_EDIT_DATA_LOADED,
    isLoaded: true,
    data,
});

const configParamEditActions = {};

const baseURLType = BASE_URL_CONFIG_PARAM_EDIT_TYPE;
// const baseURLType = BASE_URL_CONFIG_PARAM_EDIT;
const baseURLPath = BASE_URL_CONFIG_PARAM_EDIT;

configParamEditActions.saveFormShowLoading = (isLoading) => ({
    type: CONFIG_PARAM_EDIT_SHOW_LOADING_ON_SAVE,
    isLoading,
});

configParamEditActions.listShowLoading = (isLoading) => ({
    type: CONFIG_PARAM_EDIT_SHOW_LOADING_ON_SAVE,
    isLoading,
});

configParamEditActions.changeHistoryShowLoading = (isLoading) => ({
    type: CONFIG_PARAM_EDIT_SHOW_LOADING,
    isLoading,
});

configParamEditActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, parameterType, onSuccessAction } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            onSuccessAction && onSuccessAction(res);
            dispatch(receiveParametersData(res?.data, parameterType));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: baseURLType + (parameterType ? '?parameterType=' + parameterType : ''),
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

configParamEditActions.fetchFilteredList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, parameterType, onSuccessAction } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            onSuccessAction && onSuccessAction(res);
            dispatch(receiveFilteredParametersData(res?.data, parameterType));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: baseURLType + (parameterType ? '?parameterType=' + parameterType : '?ws'),
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

configParamEditActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, onSuccess } = params;

    setIsLoading(true);

    const apiCallParams = {
        data,
        method: 'post',
        url: baseURLPath,
        token,
        userId,
        accessToken,
        onSuccess,
        onError,
        onTimeout: () => onError('Request timed out, Please try again'),
        onUnAuthenticated: () => dispatch(doLogout()),
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

configParamEditActions.fetchDataList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, onSuccessAction, data } = params;
    setIsLoading(true);

    const onSuccess = (res) => {
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

export { configParamEditActions };
