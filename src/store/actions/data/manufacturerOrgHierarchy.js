import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_MANUFACTURER_ORGANIZATION_HIERARCHY } from 'constants/routingApi';
import { message } from 'antd';

export const MANUFACTURER_ORG_HIERARCHY_DATA_LOADED = 'MANUFACTURER_ORG_HIERARCHY_DATA_LOADED';
export const MANUFACTURER_ORG_HIERARCHY_SET_FORM_DATA = 'MANUFACTURER_ORG_HIERARCHY_SET_FORM_DATA';
export const MANUFACTURER_ORG_HIERARCHY_SET_FORM_IS_VISIBLE = 'MANUFACTURER_ORG_HIERARCHY_SET_FORM_IS_VISIBLE';
export const MANUFACTURER_ORG_HIERARCHY_DATA_SHOW_LOADING = 'MANUFACTURER_ORG_HIERARCHY_DATA_SHOW_LOADING';
export const MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_DATA_LOADED = 'PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED';
export const MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING = 'PRODUCT_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING';

const receiveHeaderData = (data) => ({
    type: MANUFACTURER_ORG_HIERARCHY_DATA_LOADED,
    isLoaded: true,
    data,
});

const manufacturerOrgHierarchyDataActions = {};

const baseURLPath = BASE_URL_MANUFACTURER_ORGANIZATION_HIERARCHY;

manufacturerOrgHierarchyDataActions.listShowLoading = (isLoading) => ({
    type: MANUFACTURER_ORG_HIERARCHY_DATA_SHOW_LOADING,
    isLoading,
});

manufacturerOrgHierarchyDataActions.setFormData = (formData) => ({
    type: MANUFACTURER_ORG_HIERARCHY_SET_FORM_DATA,
    isFormDataLoaded: true,
    formData,
});

const receiveChangeHistoryData = (data) => ({
    type: MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_DATA_LOADED,
    isLoaded: true,
    data,
});

const productHierarchyDataActions = {};

productHierarchyDataActions.listShowLoading = (isLoading) => ({
    type: MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING,
    isLoading,
});

manufacturerOrgHierarchyDataActions.setFormVisible = (isFormVisible) => ({
    type: MANUFACTURER_ORG_HIERARCHY_SET_FORM_IS_VISIBLE,
    isFormVisible,
});

manufacturerOrgHierarchyDataActions.fetchList = withAuthToken((params) => (token) => (dispatch) => {
    const { setIsLoading, data, userId } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveHeaderData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: baseURLPath,
        token,
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

manufacturerOrgHierarchyDataActions.saveData = withAuthToken((params) => (token) => (dispatch) => {
    const { setIsLoading, onError, data, userId, onSuccess } = params;

    setIsLoading(true);

    const apiCallParams = {
        data,
        method: 'post',
        url: baseURLPath,
        token,
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

export { manufacturerOrgHierarchyDataActions };
