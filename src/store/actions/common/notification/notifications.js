/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_NOTIFICATION as baseURL } from 'constants/routingApi';

import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';

const PREFIX = 'HEADER_NOTIFICATION';
const moduleName = 'Header notification';

export const RECEIVE_DATA_LOADING_ACTION_CONSTANT = PREFIX + 'LOADING_DATA';
export const RECEIVE_DATA_ACTION_CONSTANT = PREFIX + 'LIST_RECIEVE_DATA';
export const RECEIVE_COUNT_DATA_ACTION_CONSTANT = PREFIX + 'LIST_RECIEVE_COUNT_DATA';
export const RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT = PREFIX + 'LIST_APPLY_FILTER_CONSTANT';
export const RECIEVE_DATA_DETAIL_ACTION_CONSTANT = PREFIX + 'RECIEVE_DETAIL_DATA';
export const SAVE_DATA_ACTION_CONSTANT = PREFIX + 'SAVE_DATA';
export const RESET_DATA_ACTION_CONSTANT = PREFIX + 'RESET_DATA';

const recieveCountData = (data) => ({
    type: RECEIVE_COUNT_DATA_ACTION_CONSTANT,
    data,
});

const notificationDataActions = dataActions({
    baseURL,
    moduleName,
    RECEIVE_DATA_LOADING_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
    SAVE_DATA_ACTION_CONSTANT,
    RESET_DATA_ACTION_CONSTANT,
});

notificationDataActions.counts = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, type = '', onSuccessAction = undefined, onErrorAction = undefined } = params;
    setIsLoading(true);

    const onError = (message) => {
        onErrorAction && onErrorAction(message);
        dispatch(recieveCountData([]));
    };

    const onSuccess = (res) => {
        if (res?.data) {
            onSuccessAction && onSuccessAction(res);
            dispatch(recieveCountData(type ? res?.data?.hierarchyAttribute : res?.data));
        } else {
            dispatch(recieveCountData([]));
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: baseURL + '/counts',
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

export { notificationDataActions };
