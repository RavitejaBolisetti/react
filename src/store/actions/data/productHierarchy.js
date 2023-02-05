import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_PRODUCT_HIERARCHY, BASE_URL_PRODUCT_HIERARCHY_CHANGE_HISTORY } from 'constants/routingApi';

export const PRODUCT_HIERARCHY_DATA_LOADED = 'PRODUCT_HIERARCHY_DATA_LOADED';
export const PRODUCT_HIERARCHY_DATA_SHOW_LOADING = 'PRODUCT_HIERARCHY_DATA_SHOW_LOADING';

const receiveHeaderData = (data) => ({
    type: PRODUCT_HIERARCHY_DATA_LOADED,
    isLoaded: true,
    data,
});

const productHierarchyDataActions = {};

const baseURLPath = BASE_URL_PRODUCT_HIERARCHY;

productHierarchyDataActions.listShowLoading = (isLoading) => ({
    type: PRODUCT_HIERARCHY_DATA_SHOW_LOADING,
    isLoading,
});

productHierarchyDataActions.fetchList = withAuthToken((params) => (token) => (dispatch) => {
    const { setIsLoading, errorAction, data, userId } = params;
    setIsLoading(true);
    const onError = () => errorAction('Internal Error, Please try again');

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveHeaderData(res?.data));
        } else {
            onError();
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_PRODUCT_HIERARCHY_CHANGE_HISTORY,
        token,
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

export { productHierarchyDataActions };
