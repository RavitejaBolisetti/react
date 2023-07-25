/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_MANUFACTURER_ORGANIZATION_HIERARCHY, BASE_URL_MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY, BASE_URL_MANUFACTURER_ORG_HIERARCHY_SAVE } from 'constants/routingApi';

export const MANUFACTURER_ORG_HIERARCHY_DATA_LOADED = 'MANUFACTURER_ORG_HIERARCHY_DATA_LOADED';
export const MANUFACTURER_ORG_HIERARCHY_DATA_SHOW_LOADING = 'MANUFACTURER_ORG_HIERARCHY_DATA_SHOW_LOADING';
export const MANUFACTURER_ORG_HIERARCHY_SET_FORM_IS_VISIBLE = 'MANUFACTURER_ORG_HIERARCHY_SET_FORM_IS_VISIBLE';
export const MANUFACTURER_ORG_HIERARCHY_SET_FORM_DATA = 'MANUFACTURER_ORG_HIERARCHY_SET_FORM_DATA';
export const MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_DATA_LOADED = 'MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_DATA_LOADED';
export const MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING = 'MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING';
export const MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_VISIBLE = 'MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_VISIBLE';

const receiveManufacturerOrgHierarchyData = (data) => ({
    type: MANUFACTURER_ORG_HIERARCHY_DATA_LOADED,
    isLoaded: true,
    data,
});

const receiveChangeHistoryData = (historyData) => ({
    type: MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_DATA_LOADED,
    isLoaded: true,
    historyData,
});

const manufacturerOrgHierarchyDataActions = {};

manufacturerOrgHierarchyDataActions.listShowLoading = (isLoading) => ({
    type: MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING,
    isLoading,
});

manufacturerOrgHierarchyDataActions.changeHistoryModelOpen = (visible) => ({
    type: MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_VISIBLE,
    visible: true,
});

manufacturerOrgHierarchyDataActions.changeHistoryModelClose = (visible) => ({
    type: MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_VISIBLE,
    visible: false,
});

manufacturerOrgHierarchyDataActions.changeHistoryShowLoading = (isLoading) => ({
    type: MANUFACTURER_ORG_HIERARCHY_DATA_SHOW_LOADING,
    isLoading,
});

manufacturerOrgHierarchyDataActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, errorAction, data } = params;
    setIsLoading(true);
    const onError = () => 'Internal Error, Please try again';

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveManufacturerOrgHierarchyData(res?.data));
        } else {
            onError();
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_MANUFACTURER_ORGANIZATION_HIERARCHY,
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

manufacturerOrgHierarchyDataActions.fetchChangeHistoryList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
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
        url: BASE_URL_MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY,
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

manufacturerOrgHierarchyDataActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, onSuccess } = params;

    setIsLoading(true);

    const apiCallParams = {
        data,
        method: 'post',
        url: BASE_URL_MANUFACTURER_ORG_HIERARCHY_SAVE,
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

export { manufacturerOrgHierarchyDataActions };
