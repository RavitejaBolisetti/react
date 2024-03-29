/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_ROLE_MANAGEMENT, BASE_URL_MENU, BASE_URL_ROLE_MANAGEMENT_ROLES } from 'constants/routingApi';
import { message } from 'antd';

export const ROLE_MANAGEMENT_DATA_LOADED = 'ROLE_MANAGEMENT_DATA_LOADED';
export const ROLE_MANAGEMENT_SET_FORM_DATA = 'ROLE_MANAGEMENT_SET_FORM_DATA';
export const ROLE_MANAGEMENT_SET_FORM_IS_VISIBLE = 'ROLE_MANAGEMENT_SET_FORM_IS_VISIBLE';
export const ROLE_MANAGEMENT_DATA_SHOW_LOADING = 'ROLE_MANAGEMENT_DATA_SHOW_LOADING';
export const ROLE_MANAGEMENT_DATA_ON_SAVE_SHOW_LOADING = 'ROLE_MANAGEMENT_DATA_ON_SAVE_SHOW_LOADING';
export const MENU_DATA_LOADED = 'MENU_DATA_LOADED';
export const ROLE_MANAGEMENT_ROLES = 'ROLE_MANAGEMENT_ROLES';

const receiveData = (data) => ({
    type: ROLE_MANAGEMENT_DATA_LOADED,
    isLoaded: true,
    data,
});
const receiveMenuData = (data) => ({
    type: MENU_DATA_LOADED,
    isLoaded: true,
    data,
});
const receiveRoleData = (data) => ({
    type: ROLE_MANAGEMENT_ROLES,
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

rolemanagementDataActions.onSaveShowLoading = (isLoading) => ({
    type: ROLE_MANAGEMENT_DATA_ON_SAVE_SHOW_LOADING,
    isLoading,
});

rolemanagementDataActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, userId } = params;
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

rolemanagementDataActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, userId, onSuccess } = params;

    setIsLoading(true);

    const apiCallParams = {
        data,
        method: 'post',
        url: BASE_URL_ROLE_MANAGEMENT_ROLES,
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
rolemanagementDataActions.fetchMenuList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, errorAction, data, userId } = params;
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
        url: BASE_URL_MENU + '?type=w',
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
rolemanagementDataActions.fetchRole = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, errorAction, data, userId, id } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveRoleData(res?.data));
        } else {
            onError();
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_ROLE_MANAGEMENT_ROLES + '?roleId=' + id,
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

export { rolemanagementDataActions };
