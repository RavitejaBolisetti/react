/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_MANUFACTURER_ADMINISTRATION_HIERARCHY, BASE_URL_MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY, BASE_URL_MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY, BASE_URL_MANUFACTURER_ADMIN_HIERARCHY_SAVE, BASE_URL_MANUFACTURER_ADMIN_HIERARCHY_SEARCH, BASE_URL_MANUFACTURER_AUTHORITY_TYPE_DROPDOWN } from 'constants/routingApi';
import { message } from 'antd';
export const MANUFACTURER_ADMIN_HIERARCHY_DATA_LOADED = 'MANUFACTURER_ADMIN_HIERARCHY_DATA_LOADED';
export const MANUFACTURER_ADMIN_HIERARCHY_DATA_SHOW_LOADING = 'MANUFACTURER_ADMIN_HIERARCHY_DATA_SHOW_LOADING';

export const MANUFACTURER_ADMIN_HIERARCHY_DETAIL_DATA_LOADED = 'MANUFACTURER_ADMIN_HIERARCHY_DETAIL_DATA_LOADED';
export const MANUFACTURER_ADMIN_HIERARCHY_DETAIL_DATA_SHOW_LOADING = 'MANUFACTURER_ADMIN_HIERARCHY_DETAIL_DATA_SHOW_LOADING';

export const MANUFACTURER_ADMIN_HIERARCHY_SET_FORM_IS_VISIBLE = 'MANUFACTURER_ADMIN_HIERARCHY_SET_FORM_IS_VISIBLE';
export const MANUFACTURER_ADMIN_HIERARCHY_SET_FORM_DATA = 'MANUFACTURER_ADMIN_HIERARCHY_SET_FORM_DATA';

export const MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_DATA_LOADED = 'MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_DATA_LOADED';
export const MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING = 'MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING';
export const MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_VISIBLE = 'MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_VISIBLE';
export const MANUFACTURER_ADMIN_HIERARCHY_UPLOAD_VISIBLE = 'MANUFACTURER_ADMIN_HIERARCHY_UPLOAD_VISIBLE';
export const MANUFACTURER_AUTHORITY_DATA_VIEW = 'MANUFACTURER_AUTHORITY_DATA_VIEW';

export const MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_DATA_LOADED = 'MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_DATA_LOADED';
export const MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_SHOW_LOADING = 'MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_SHOW_LOADING';
export const MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_VISIBLE = 'MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_VISIBLE';
export const MANUFACTURER_ADMIN_AUTHORITY_UPLOAD_VISIBLE = 'MANUFACTURER_ADMIN_AUTHORITY_UPLOAD_VISIBLE';
export const MANUFACTURER_ADMIN_HIERARCHY_SEARCH_DATA_LOADED = 'MANUFACTURER_ADMIN_HIERARCHY_SEARCH_DATA_LOADED';
export const MANUFACTURER_AUTHORITY_HIERARCHY_DROPDOWN = 'MANUFACTURER_AUTHORITY_HIERARCHY_DROPDOWN';
export const CARD_BTN_DISABLE = 'CARD_BTN_DISABLE';
export const ON_ERROR_TOKEN_VALIDATION = 'ON_ERROR_TOKEN_VALIDATION';

const receiveData = (data) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_DATA_LOADED,
    isLoaded: true,
    data,
});

const receiveDetailData = (data) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_DETAIL_DATA_LOADED,
    isDetailLoaded: true,
    data,
});

const reciveManufacturerSearchData = (data, recordId) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_SEARCH_DATA_LOADED,
    isLoaded: true,
    data,
    recordId,
});

const receiveChangeHistoryData = (data) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_DATA_LOADED,
    isLoaded: true,
    data,
});

const receiveAuthorityChangeHistoryData = (data) => ({
    type: MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_DATA_LOADED,
    isLoaded: true,
    data,
});

const receiveAuthorityTypeData = (data) => ({
    type: MANUFACTURER_AUTHORITY_HIERARCHY_DROPDOWN,
    isLoaded: true,
    data,
});

const manufacturerAdminHierarchyDataActions = {};

manufacturerAdminHierarchyDataActions.errorTokenValidate = ({ message, isUpdating }) => ({
    type: ON_ERROR_TOKEN_VALIDATION,
    data: message,
    isUpdating: isUpdating,
});

manufacturerAdminHierarchyDataActions.cardBtnDisableAction = (value) => ({
    type: CARD_BTN_DISABLE,
    isDisable: value,
});

manufacturerAdminHierarchyDataActions.listShowLoading = (isLoading) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING,
    isLoading,
});

manufacturerAdminHierarchyDataActions.changeHistoryModelOpen = (visible) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_VISIBLE,
    visible: true,
});

manufacturerAdminHierarchyDataActions.changeHistoryModelClose = (visible) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_VISIBLE,
    visible: false,
});
manufacturerAdminHierarchyDataActions.listShowLoading = (isLoading) => ({
    type: MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_SHOW_LOADING,
    isLoading,
});
manufacturerAdminHierarchyDataActions.changeHistoryAuthorityModelOpen = (visible) => ({
    type: MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_VISIBLE,
    visible: true,
});

manufacturerAdminHierarchyDataActions.changeHistoryAuthorityModelClose = (visible) => ({
    type: MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_VISIBLE,
    visible: false,
});
manufacturerAdminHierarchyDataActions.changeHistoryAuthorityShowLoading = (isLoading) => ({
    type: MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_SHOW_LOADING,
    isLoading,
});

manufacturerAdminHierarchyDataActions.changeHistoryShowLoading = (isLoading) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_DATA_SHOW_LOADING,
    isLoading,
});

manufacturerAdminHierarchyDataActions.uploadModelOpen = (visible) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_UPLOAD_VISIBLE,
    visible: true,
});

manufacturerAdminHierarchyDataActions.uploadModelClose = (visible) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_UPLOAD_VISIBLE,
    visible: false,
});

manufacturerAdminHierarchyDataActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, errorAction, data, id = '', manufacturerOrgId = '' } = params;

    setIsLoading(true);
    const onError = () => errorAction('Internal Error, Please try again');

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(id ? receiveDetailData(res?.data) : receiveData(res?.data));
        } else {
            onError();
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_MANUFACTURER_ADMINISTRATION_HIERARCHY + (manufacturerOrgId ? `?manufacturerOrgId=${manufacturerOrgId}` : id ? `?manufacturerAdminId=${id}` : ''),
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

manufacturerAdminHierarchyDataActions.fetchChangeHistoryList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data } = params;
    setIsLoading(true);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveChangeHistoryData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY,
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

manufacturerAdminHierarchyDataActions.fetchAuthorityChangeHistoryList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data } = params;
    setIsLoading(true);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveAuthorityChangeHistoryData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY,
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

manufacturerAdminHierarchyDataActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, onSuccess } = params;

    setIsLoading(true);

    const apiCallParams = {
        data,
        method: 'post',
        url: BASE_URL_MANUFACTURER_ADMIN_HIERARCHY_SAVE,
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

manufacturerAdminHierarchyDataActions.searchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, errorAction, data, recordId = '', tokenNumber } = params;
    console.log('🚀 ~ file: manufacturerAdminHierarchy.js:238 ~ manufacturerAdminHierarchyDataActions.searchList=withAuthToken ~ recordId:', recordId);
    setIsLoading(true);
    const onError = () => message.error('Internal Error, Please try again');

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(reciveManufacturerSearchData(res?.data, recordId));
        } else {
            onError();
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_MANUFACTURER_ADMIN_HIERARCHY_SEARCH + (tokenNumber ? `?tokenNumber=${tokenNumber}` : ''),
        token,
        accessToken,
        userId,
        onSuccess,
        onError: errorAction,
        onTimeout: () => errorAction('Request timed out, Please try again'),
        onUnAuthenticated: () => dispatch(doLogout()),
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

manufacturerAdminHierarchyDataActions.authTypeDropdown = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, errorAction, data } = params;
    setIsLoading(true);
    const onError = () => message.error('Internal Error, Please try again');

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveAuthorityTypeData(res?.data));
        } else {
            onError();
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_MANUFACTURER_AUTHORITY_TYPE_DROPDOWN + '?parameterType=AUTH_TYPE',
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

export { manufacturerAdminHierarchyDataActions };
