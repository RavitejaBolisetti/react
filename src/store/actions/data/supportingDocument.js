/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { dataActions } from 'store/actions/crud/dataAction';
import { withAuthToken } from 'utils/withAuthToken';
import { axiosAPICall } from 'utils/axiosAPICall';

import { BASE_URL_SUPPORTING_DOCUMENT as baseURL, BASE_URL_DOCUMENT_UPLOAD as baseUploadURL, BASE_URL_DOCUMENT_VIEW_URL as baseDownloadUrl } from 'constants/routingApi';

const PREFIX = 'UPLOAD_';
const moduleName = 'Supporting Document(Vault)';

export const RECEIVE_DATA_LOADING_ACTION_CONSTANT = PREFIX + 'LOADING_DATA';
export const RECEIVE_DATA_ACTION_CONSTANT = PREFIX + 'LIST_RECIEVE_DATA';
export const RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT = PREFIX + 'LIST_APPLY_FILTER_CONSTANT';
export const RECIEVE_DATA_DETAIL_ACTION_CONSTANT = PREFIX + 'RECIEVE_DETAIL_DATA';
export const SAVE_DATA_ACTION_CONSTANT = PREFIX + 'SAVE_DATA';
export const RESET_DATA_ACTION_CONSTANT = PREFIX + 'RESET_DATA';
export const SAVE_FORM_DATA_LOADING_CONSTANT = PREFIX + 'SAVE_FORM_DATA_LOADING_CONSTANT';

const supportingDocumentDataActions = dataActions({
    baseURL,
    moduleName,
    RECEIVE_DATA_LOADING_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
    SAVE_DATA_ACTION_CONSTANT,
    RESET_DATA_ACTION_CONSTANT,
    SAVE_FORM_DATA_LOADING_CONSTANT,
});

supportingDocumentDataActions.uploadFile = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, userId, onSuccess, method = 'post' } = params;
    setIsLoading(true);

    const onSuccessAction = (res) => {
        onSuccess(res.data);
    };

    const apiCallParams = {
        data,
        method: method,
        url: baseUploadURL,
        token,
        accessToken,
        userId,
        onSuccess: onSuccessAction,
        onError,
        onTimeout: () => onError('Request timed out, Please try again'),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

supportingDocumentDataActions.downloadFile = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onErrorAction = undefined, data, userId, onSuccessAction = undefined, method = 'get', extraParams = [] } = params;
    setIsLoading(true);

    let sExtraParamsString = '?';
    extraParams?.forEach((item, index) => {
        sExtraParamsString += item?.value && item?.key ? item?.value && item?.key + '=' + item?.value + '&' : '';
    });
    sExtraParamsString = sExtraParamsString.substring(0, sExtraParamsString.length - 1);

    const onSuccess = (res) => {
        onSuccessAction && onSuccessAction(res);
        let a = document.createElement('a');
        a.href = `data:image/png;base64,${res?.data?.base64}`;
        a.download = res?.data?.fileName;
        a.click();
    };

    const onError = (res) => {
        onErrorAction && onErrorAction(res);
    };
    const apiCallParams = {
        data,
        method: method,
        url: baseDownloadUrl + (sExtraParamsString ? sExtraParamsString : ''),
        token,
        accessToken,
        userId,
        onSuccess,
        onError,
        onTimeout: () => onError('Request timed out, Please try again'),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

export { supportingDocumentDataActions };
