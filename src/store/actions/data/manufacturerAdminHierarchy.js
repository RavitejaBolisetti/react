import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_MANUFACTURER_ADMINISTRATION_HIERARCHY,BASE_URL_MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY, BASE_URL_MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY, BASE_URL_MANUFACTURER_ADMIN_HIERARCHY_SAVE } from 'constants/routingApi';

export const MANUFACTURER_ADMIN_HIERARCHY_DATA_LOADED = 'MANUFACTURER_ADMIN_HIERARCHY_DATA_LOADED';
export const MANUFACTURER_ADMIN_HIERARCHY_DATA_SHOW_LOADING = 'MANUFACTURER_ADMIN_HIERARCHY_DATA_SHOW_LOADING';
export const MANUFACTURER_ADMIN_HIERARCHY_SET_FORM_IS_VISIBLE = 'MANUFACTURER_ADMIN_HIERARCHY_SET_FORM_IS_VISIBLE';
export const MANUFACTURER_ADMIN_HIERARCHY_SET_FORM_DATA = 'MANUFACTURER_ADMIN_HIERARCHY_SET_FORM_DATA';

export const MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_DATA_LOADED = 'MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_DATA_LOADED';
export const MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING = 'MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING';
export const MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_VISIBLE = 'MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_VISIBLE';
export const MANUFACTURER_ADMIN_HIERARCHY_UPLOAD_VISIBLE = 'MANUFACTURER_ADMIN_HIERARCHY_UPLOAD_VISIBLE';

export const MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_DATA_LOADED = 'MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_DATA_LOADED';
export const MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_SHOW_LOADING = 'MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_SHOW_LOADING';
export const MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_VISIBLE = 'MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_VISIBLE';
export const MANUFACTURER_ADMIN_AUTHORITY_UPLOAD_VISIBLE = 'MANUFACTURER_ADMIN_AUTHORITY_UPLOAD_VISIBLE';



const receiveManufacturerAdminHierarchyData = (data) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_DATA_LOADED,
    isLoaded: true,
    data,
});

const receiveChangeHistoryData = (data) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_DATA_LOADED,
    isLoaded: true,
    data,
});
const receiveAuthorityChangeHistoryData = (data) => ({
    type: MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_DATA_LOADED,
    isLoaded: true,
    data,
});
const manufacturerAdminHierarchyDataActions = {};

manufacturerAdminHierarchyDataActions.listShowLoading = (isLoading) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING,
    isLoading,
});

manufacturerAdminHierarchyDataActions.changeHistoryModelOpen = (visible) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_VISIBLE,
    visible: true,
});

manufacturerAdminHierarchyDataActions.changeHistoryModelClose = (visible) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_VISIBLE,
    visible: false,
});
manufacturerAdminHierarchyDataActions.listShowLoading = (isLoading) => ({
    type: MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_SHOW_LOADING,
    isLoading,
});
manufacturerAdminHierarchyDataActions.changeHistoryAuthorityModelOpen = (visible) => ({
    type: MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_VISIBLE,
    visible: true,
});

manufacturerAdminHierarchyDataActions.changeHistoryAuthorityModelClose = (visible) => ({
    type: MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_VISIBLE,
    visible: false,
});
manufacturerAdminHierarchyDataActions.changeHistoryAuthorityShowLoading = (isLoading) => ({
    type: MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_SHOW_LOADING,
    isLoading,
});

manufacturerAdminHierarchyDataActions.changeHistoryShowLoading = (isLoading) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_DATA_SHOW_LOADING,
    isLoading,
});

manufacturerAdminHierarchyDataActions.uploadModelOpen = (visible) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_UPLOAD_VISIBLE,
    visible: true,
});

manufacturerAdminHierarchyDataActions.uploadModelClose = (visible) => ({
    type: MANUFACTURER_ADMIN_HIERARCHY_UPLOAD_VISIBLE,
    visible: false,
});

manufacturerAdminHierarchyDataActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, errorAction, data } = params;
    setIsLoading(true);
    const onError = () => errorAction('Internal Error, Please try again');

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveManufacturerAdminHierarchyData(res?.data));
        } else {
            onError();
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_MANUFACTURER_ADMINISTRATION_HIERARCHY,
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

manufacturerAdminHierarchyDataActions.fetchChangeHistoryList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
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
        url: BASE_URL_MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY,
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
manufacturerAdminHierarchyDataActions.fetchAuthorityChangeHistoryList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data } = params;
    setIsLoading(true);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveAuthorityChangeHistoryData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY,
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


manufacturerAdminHierarchyDataActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, onSuccess } = params;

    setIsLoading(true);

    const apiCallParams = {
        data,
        method: 'post',
        url: BASE_URL_MANUFACTURER_ADMIN_HIERARCHY_SAVE,
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

export { manufacturerAdminHierarchyDataActions };
