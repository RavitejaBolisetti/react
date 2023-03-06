import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_DEALER_HIERARCHY, BASE_URL_DEALER_HIERARCHY_SAVE } from 'constants/routingApi';

export const DEALER_HIERARCHY_DATA_LOADED = 'DEALER_HIERARCHY_DATA_LOADED';
export const DEALER_HIERARCHY_DATA_SHOW_LOADING = 'DEALER_HIERARCHY_DATA_SHOW_LOADING';
export const DEALER_HIERARCHY_SET_FORM_IS_VISIBLE = 'DEALER_HIERARCHY_SET_FORM_IS_VISIBLE';
export const DEALER_HIERARCHY_SET_FORM_DATA = 'DEALER_HIERARCHY_SET_FORM_DATA';

const receiveDealerHierarchyData = (data) => ({
    type: DEALER_HIERARCHY_DATA_LOADED,
    isLoaded: true,
    data,
});

const dealerHierarchyDataActions = {};

dealerHierarchyDataActions.listShowLoading = (isLoading) => ({
    type: DEALER_HIERARCHY_DATA_SHOW_LOADING,
    isLoading,
});

dealerHierarchyDataActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, errorAction, data } = params;
    setIsLoading(true);
    const onError = () => errorAction('Internal Error, Please try again');

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveDealerHierarchyData(res?.data));
        } else {
            onError();
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: BASE_URL_DEALER_HIERARCHY,
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

dealerHierarchyDataActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, method, onSuccess } = params;

    setIsLoading(true);

    const apiCallParams = {
        data,
        // method: 'post',
        method,
        url: BASE_URL_DEALER_HIERARCHY_SAVE,
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

export { dealerHierarchyDataActions };
