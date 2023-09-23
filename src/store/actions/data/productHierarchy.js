/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_PRODUCT_HIERARCHY, BASE_URL_PRODUCT_HIERARCHY_DETAIL, BASE_URL_PRODUCT_HIERARCHY_CHANGE_HISTORY, BASE_URL_PRODUCT_HIERARCHY_SAVE, BASE_URL_PRODUCT_HIERARCHY_SKU, BASE_URL_PRODUCT_NAME_DROPDOWN } from 'constants/routingApi';
import { message } from 'antd';
import { LANGUAGE_EN } from 'language/en';

export const PRODUCT_HIERARCHY_DATA_LOADED = 'PRODUCT_HIERARCHY_DATA_LOADED';
export const PRODUCT_HIERARCHY_DATA_SHOW_LOADING = 'PRODUCT_HIERARCHY_DATA_SHOW_LOADING';
export const PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED = 'PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED';
export const PRODUCT_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING = 'PRODUCT_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING';
export const PRODUCT_HIERARCHY_CHANGE_HISTORY_VISIBLE = 'PRODUCT_HIERARCHY_CHANGE_HISTORY_VISIBLE';
export const PRODUCT_HIERARCHY_DATA_LOADED_SKU = 'PRODUCT_HIERARCHY_DATA_LOADED_SKU';
export const PRODUCT_HIERARCHY_CARD_BTN_DISABLE = 'PRODUCT_HIERARCHY_CARD_BTN_DISABLE';
export const PRODUCT_HIERARCHY_ATTRIBUTE_NAME_DROPDOWN = 'PRODUCT_HIERARCHY_ATTRIBUTE_NAME_DROPDOWN';
export const PRODUCT_HIERARCHY_SELECTED_ORGANIZATION_ID = 'PRODUCT_HIERARCHY_SELECTED_ORGANIZATION_ID';
export const PRODUCT_HIERARCHY_RESET_DATA = 'PRODUCT_HIERARCHY_RESET_DATA';
export const PRODUCT_HIERARCHY_FILTERED_DATA_ACTION_CONSTANT = 'PRODUCT_HIERARCHY_FILTERED_DATA_ACTION_CONSTANT';
export const PRODUCT_HIERARCHY_DETAIL_DATA = 'PRODUCT_HIERARCHY_DETAIL_DATA';

const receiveProductHierarchyData = (data, productCode) => ({
    type: PRODUCT_HIERARCHY_DATA_LOADED,
    isLoaded: true,
    data,
    productCode,
});

const receiveProductHierarchyDetailData = (data) => ({
    type: PRODUCT_HIERARCHY_DETAIL_DATA,
    isLoaded: true,
    data,
});

const receiverProductHierarchyData = (data) => ({
    type: PRODUCT_HIERARCHY_DATA_LOADED_SKU,
    isLoaded: true,
    data,
});

const receiveChangeHistoryData = (data) => ({
    type: PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED,
    isLoaded: true,
    data,
});

const receiverProductAttributeName = (data) => ({
    type: PRODUCT_HIERARCHY_ATTRIBUTE_NAME_DROPDOWN,
    isLoaded: true,
    data,
});
const filteredRecieveData = (filteredListData) => ({
    type: PRODUCT_HIERARCHY_FILTERED_DATA_ACTION_CONSTANT,
    filteredListData,
});

const productHierarchyDataActions = {};

productHierarchyDataActions.resetData = (data) => ({
    type: PRODUCT_HIERARCHY_RESET_DATA,
    data,
});

productHierarchyDataActions.listShowLoading = (isLoading) => ({
    type: PRODUCT_HIERARCHY_DATA_SHOW_LOADING,
    isLoading,
});

productHierarchyDataActions.changeHistoryModelOpen = (visible) => ({
    type: PRODUCT_HIERARCHY_CHANGE_HISTORY_VISIBLE,
    visible: true,
});

productHierarchyDataActions.setSelectedOrganizationId = (organizationId) => ({
    type: PRODUCT_HIERARCHY_SELECTED_ORGANIZATION_ID,
    organizationId: organizationId,
});

productHierarchyDataActions.changeHistoryModelClose = (visible) => ({
    type: PRODUCT_HIERARCHY_CHANGE_HISTORY_VISIBLE,
    visible: false,
});

productHierarchyDataActions.changeHistoryShowLoading = (isHistoryLoading) => ({
    type: PRODUCT_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING,
    isHistoryLoading,
});

productHierarchyDataActions.cardBtnDisableAction = (value) => ({
    type: PRODUCT_HIERARCHY_CARD_BTN_DISABLE,
    isDisable: value,
});

productHierarchyDataActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, extraParams } = params;
    setIsLoading(true);

    const onSuccess = (res) => {
        if (res?.data) {
            const productCode = extraParams?.find((i) => i?.key === 'prodctCode');
            if (productCode) {
                dispatch(receiveProductHierarchyData(res?.data, productCode?.value));
            } else {
                dispatch(receiveProductHierarchyData(res?.data));
            }
        } else {
            dispatch(receiveProductHierarchyData([]));
            onError && onError();
        }
    };

    const onErrorAction = () => {
        dispatch(receiveProductHierarchyData([]));
        onError && onError();
    };

    let sExtraParamsString = '?';
    extraParams?.forEach((item, index) => {
        sExtraParamsString += item?.value && item?.key ? item?.value && item?.key + '=' + item?.value + '&' : '';
    });

    sExtraParamsString = sExtraParamsString.substring(0, sExtraParamsString.length - 1);

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_PRODUCT_HIERARCHY + sExtraParamsString,
        token,
        accessToken,
        userId,
        onSuccess,
        onError: onErrorAction,
        onTimeout: () => onError('Request timed out, Please try again'),
        onUnAuthenticated: () => dispatch(doLogout()),
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

productHierarchyDataActions.fetchDetail = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, extraParams } = params;
    setIsLoading(true);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveProductHierarchyDetailData(res?.data));
        } else {
            dispatch(receiveProductHierarchyDetailData([]));
            onError && onError();
        }
    };

    const onErrorAction = () => {
        dispatch(receiveProductHierarchyDetailData([]));
        onError && onError();
    };

    let sExtraParamsString = '?';
    extraParams?.forEach((item, index) => {
        sExtraParamsString += item?.value && item?.key ? item?.value && item?.key + '=' + item?.value + '&' : '';
    });

    sExtraParamsString = sExtraParamsString.substring(0, sExtraParamsString.length - 1);

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_PRODUCT_HIERARCHY_DETAIL + sExtraParamsString,
        token,
        accessToken,
        userId,
        onSuccess,
        onError: onErrorAction,
        onTimeout: () => onError('Request timed out, Please try again'),
        onUnAuthenticated: () => dispatch(doLogout()),
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

productHierarchyDataActions.fetchChangeHistoryList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, manufactureOrgId } = params;
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
        url: BASE_URL_PRODUCT_HIERARCHY_CHANGE_HISTORY + (manufactureOrgId ? '?manufactureOrgId=' + manufactureOrgId : ''),
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

productHierarchyDataActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, userId, onSuccess } = params;

    setIsLoading(true);

    const apiCallParams = {
        data,
        method: 'post',
        url: BASE_URL_PRODUCT_HIERARCHY_SAVE,
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

productHierarchyDataActions.skulist = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, skuId = '' } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiverProductHierarchyData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_PRODUCT_HIERARCHY_SKU + (skuId ? '?skuId=' + skuId : ''),
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

productHierarchyDataActions.fetchAttributeNameList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiverProductAttributeName(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_PRODUCT_NAME_DROPDOWN,
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
productHierarchyDataActions.fetchFilteredList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data, extraParams } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(filteredRecieveData(res?.data));
        } else {
            onError(LANGUAGE_EN.INTERNAL_SERVER_ERROR);
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
        url: BASE_URL_PRODUCT_HIERARCHY + '/lov' + sExtraParamsString,
        // url: BASE_URL_PRODUCT_HIERARCHY + '/lov' + (extraparams ? '?' + extraparams['0']['key'] + '=' + extraparams['0']['value'] : ''),
        token,
        accessToken,
        userId,
        onSuccess,
        onError,
        onTimeout: () => onError(LANGUAGE_EN.REQUEST_TIMEOUT),
        onUnAuthenticated: () => dispatch(doLogout()),
        onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
        postRequest: () => setIsLoading(false),
    };

    axiosAPICall(apiCallParams);
});

export { productHierarchyDataActions };
