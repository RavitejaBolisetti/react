import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_PRODUCT_HIERARCHY, BASE_URL_PRODUCT_HIERARCHY_CHANGE_HISTORY, BASE_URL_PRODUCT_HIERARCHY_SAVE, BASE_URL_PRODUCT_HIERARCHY_SKU, BASE_URL_PRODUCT_NAME_DROPDOWN } from 'constants/routingApi';
import { message } from 'antd';

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

const receiveProductHierarchyData = (data) => ({
    type: PRODUCT_HIERARCHY_DATA_LOADED,
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

const productHierarchyDataActions = {};

productHierarchyDataActions.resetData = (data) => ({
    type: PRODUCT_HIERARCHY_RESET_DATA,
    data,
});

productHierarchyDataActions.listShowLoading = (isHistoryLoading) => ({
    type: PRODUCT_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING,
    isHistoryLoading,
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

productHierarchyDataActions.changeHistoryShowLoading = (isLoading) => ({
    type: PRODUCT_HIERARCHY_DATA_SHOW_LOADING,
    isLoading,
});

productHierarchyDataActions.cardBtnDisableAction = (value) => ({
    type: PRODUCT_HIERARCHY_CARD_BTN_DISABLE,
    isDisable: value,
});

productHierarchyDataActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, errorAction, data, id } = params;
    setIsLoading(true);
    const onError = () => errorAction('Internal Error, Please try again');

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveProductHierarchyData(res?.data));
        } else {
            onError();
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_PRODUCT_HIERARCHY + (id ? '?manufactureOrgId=' + id : ''),
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

export { productHierarchyDataActions };
