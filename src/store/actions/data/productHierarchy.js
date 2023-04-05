import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_PRODUCT_HIERARCHY, BASE_URL_PRODUCT_HIERARCHY_CHANGE_HISTORY, BASE_URL_PRODUCT_HIERARCHY_SAVE } from 'constants/routingApi';

export const PRODUCT_HIERARCHY_DATA_LOADED = 'PRODUCT_HIERARCHY_DATA_LOADED';
export const PRODUCT_HIERARCHY_DATA_SHOW_LOADING = 'PRODUCT_HIERARCHY_DATA_SHOW_LOADING';
export const PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED = 'PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED';
export const PRODUCT_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING = 'PRODUCT_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING';
export const PRODUCT_HIERARCHY_CHANGE_HISTORY_VISIBLE = 'PRODUCT_HIERARCHY_CHANGE_HISTORY_VISIBLE';

const receiveProductHierarchyData = (data) => ({
    type: PRODUCT_HIERARCHY_DATA_LOADED,
    isLoaded: true,
    data,
});

const receiveChangeHistoryData = (data) => ({
    type: PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED,
    isLoaded: true,
    data,
});

const productHierarchyDataActions = {};

productHierarchyDataActions.listShowLoading = (isLoading) => ({
    type: PRODUCT_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING,
    isLoading,
});

productHierarchyDataActions.changeHistoryVisible = (visible) => ({
    type: PRODUCT_HIERARCHY_CHANGE_HISTORY_VISIBLE,
    visible: true,
});

productHierarchyDataActions.changeHistoryShowLoading = (isLoading) => ({
    type: PRODUCT_HIERARCHY_DATA_SHOW_LOADING,
    isLoading,
});

productHierarchyDataActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, errorAction, data } = params;
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
        url: BASE_URL_PRODUCT_HIERARCHY,
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
        url: BASE_URL_PRODUCT_HIERARCHY_CHANGE_HISTORY,
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

export { productHierarchyDataActions };
