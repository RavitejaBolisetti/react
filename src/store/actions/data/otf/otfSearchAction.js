/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_OTF_SEARCH_LIST as baseURL, BASE_URL_OTF_TRANSFER, BASE_URL_OTF_DETAILS } from 'constants/routingApi';

import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';

const PREFIX = 'OTF_SEARCH_';
const moduleName = 'OTF Search';

export const RECEIVE_DATA_LOADING_ACTION_CONSTANT = PREFIX + 'LOADING_DATA';
export const RECEIVE_DATA_ACTION_CONSTANT = PREFIX + 'LIST_RECIEVE_DATA';
export const RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT = PREFIX + 'LIST_APPLY_FILTER_CONSTANT';
export const RECIEVE_DATA_DETAIL_ACTION_CONSTANT = PREFIX + 'RECIEVE_DETAIL_DATA';
export const SAVE_DATA_ACTION_CONSTANT = PREFIX + 'SAVE_DATA';
export const RESET_DATA_ACTION_CONSTANT = PREFIX + 'RESET_DATA';

const otfSearchListAction = dataActions({
    baseURL,
    moduleName,
    RECEIVE_DATA_LOADING_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
    SAVE_DATA_ACTION_CONSTANT,
    RESET_DATA_ACTION_CONSTANT,
});

const recieveData = (data) => ({
    type: 'OTF_DETAILS_LIST_RECIEVE_DATA',
    data,
});

otfSearchListAction.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, userId, onSuccess, method = 'post' } = params;
    setIsLoading(true);

    const onSuccessAction = (res) => {
        onSuccess(res);
        //RECEIVE_FILTERED_DATA_ACTION_CONSTANT && dispatch(innerDataActions.fetchFilteredList({ setIsLoading: () => {}, userId }));
    };

    const apiCallParams = {
        data,
        method: method,
        url: BASE_URL_OTF_DETAILS,
        token,
        accessToken,
        userId,
        onSuccess: onSuccessAction,
        onError,
        onTimeout: () => onError('Request timed out, Please try again'),
        onUnAuthenticated: () => dispatch(doLogout()),
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

otfSearchListAction.fetchSeachParameter= withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, type = '', mytype = '', onSuccessAction = undefined, onErrorAction = undefined, extraParams = [] } = params;
    setIsLoading(true);

    const onError = (message) => {
        onErrorAction && onErrorAction(message);
    };

    const onSuccess = (res) => {
        if (res?.data) {
            onSuccessAction && onSuccessAction(res);
            dispatch(recieveData(type ? res?.data?.hierarchyAttribute : res?.data));
        } else {
            dispatch(recieveData([]));
            // onErrorAction(res?.responseMessage || LANGUAGE_EN.INTERNAL_SERVER_ERROR);
        }
    };

    let sExtraParamsString = '?';
    extraParams?.forEach((item, index) => {
        sExtraParamsString += item?.value && item?.key ? item?.value && item?.key + '=' + item?.value + '&' : '';
    });

    sExtraParamsString = sExtraParamsString.substring(0, sExtraParamsString.length - 1);

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_OTF_DETAILS + (type ? '?type=' + type : '') + (mytype ? mytype : '') + (sExtraParamsString ? sExtraParamsString : ''),
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

otfSearchListAction.transferOTF = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, userId, onSuccess } = params;

    setIsLoading(true);

    const apiCallParams = {
        data,
        method: 'put',
        url: BASE_URL_OTF_TRANSFER,
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

export {otfSearchListAction} ;
