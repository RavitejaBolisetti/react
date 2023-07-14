/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { BASE_URL_HEADER_DETAIL } from 'constants/routingApi';
import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';

export const HEADER_USER_DATA_LOADED = 'HEADER_USER_DATA_LOADED';
export const HEADER_USER_DATA_SHOW_LOADING = 'HEADER_USER_DATA_SHOW_LOADING';
export const HEADER_USER_DATA_CLEAR = 'HEADER_USER_DATA_CLEAR';

const receiveData = (data) => ({
    type: HEADER_USER_DATA_LOADED,
    isLoaded: true,
    data,
});

export const clearData = (data) => ({
    type: HEADER_USER_DATA_CLEAR,
});

const headerDataActions = {};

const baseURLPath = BASE_URL_HEADER_DETAIL;

headerDataActions.listShowLoading = (isLoading) => ({
    type: HEADER_USER_DATA_SHOW_LOADING,
    isLoading,
});

headerDataActions.fetchData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data } = params;
    setIsLoading(true);

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

export { headerDataActions };
