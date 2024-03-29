/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { BASE_URL_MENU, BASE_URL_MENU_FAVOURITE } from 'constants/routingApi';
import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';

export const MENU_DATA_LOADED = 'MENU_DATA_LOADED';
export const MENU_DATA_FILTER = 'MENU_DATA_FILTER';
export const MENU_DATA_SHOW_LOADING = 'MENU_DATA_SHOW_LOADING';
export const MENU_DATA_CLEAR = 'MENU_DATA_CLEAR';

const receiveData = (data) => ({
    type: MENU_DATA_LOADED,
    isLoaded: true,
    data,
});

const menuDataActions = {};

const baseURLPath = BASE_URL_MENU;

menuDataActions.listShowLoading = (isLoading) => ({
    type: MENU_DATA_SHOW_LOADING,
    isLoading,
});

menuDataActions.setFilter = (filter) => ({
    type: MENU_DATA_FILTER,
    filter,
});

menuDataActions.resetData = () => ({
    type: MENU_DATA_CLEAR,
});

menuDataActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, errorAction, data, userId } = params;
    setIsLoading(true);
    const onError = () => errorAction('Internal Error, Please try again');

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveData(res?.data));
        } else {
            onError();
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
        onTimeout: () => errorAction('Request timed out, Please try again'),
        onUnAuthenticated: () => dispatch(doLogout()),
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

menuDataActions.markFavourite = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, userId, onSuccess } = params;

    setIsLoading(true);

    const apiCallParams = {
        data,
        method: 'put',
        url: BASE_URL_MENU_FAVOURITE,
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

export { menuDataActions };
