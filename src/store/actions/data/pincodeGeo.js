import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_GEO_GRAPHY_PINCODE} from 'constants/routingApi';
import { message } from 'antd';

export const GEO_DATA_PINCODE_LOADED = 'GEO_DATA_PINCODE_LOADED';
export const GEO_PINCODE_SET_FORM_DATA = 'GEO_PINCODE_SET_FORM_DATA';
export const GEO_PINCODE_SET_FORM_IS_VISIBLE = 'GEO_PINCODE_SET_FORM_IS_VISIBLE';
export const GEO_PINCODE_DATA_SHOW_LOADING = ' GEO_PINCODE_DATA_SHOW_LOADING';

const receiveData = (data) => ({
    type: GEO_DATA_PINCODE_LOADED,
    isLoaded: true,
    data,
});

const geoPincodeActions = {};

const baseURLPath = BASE_URL_GEO_GRAPHY_PINCODE;

geoPincodeActions.listShowLoading = (isLoading) => ({
    type: GEO_PINCODE_DATA_SHOW_LOADING,
    isLoading,
});

geoPincodeActions.setFormData = (formData) => ({
    type: GEO_PINCODE_SET_FORM_DATA,
    isFormDataLoaded: true,
    formData,
});

geoPincodeActions.setFormVisible = (isFormVisible) => ({
    type: GEO_PINCODE_SET_FORM_IS_VISIBLE,
    isFormVisible,
});

geoPincodeActions.fetchList = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, data } = params;
    setIsLoading(true);
    const onError = (errorMessage) => message.error(errorMessage);

    const onSuccess = (res) => {
        if (res?.data) {
            dispatch(receiveData(res?.data));
        } else {
            onError('Internal Error, Please try again');
        }
    };

    const apiCallParams = {
        data,
        method: 'get',
        url: baseURLPath,
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

geoPincodeActions.saveData = withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
    const { setIsLoading, onError, data, onSuccess } = params;

    setIsLoading(true);

    const apiCallParams = {
        data,
        method: 'post',
        url: baseURLPath,
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

export { geoPincodeActions };
