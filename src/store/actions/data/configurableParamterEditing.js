import { doLogout, unAuthenticateUser } from 'store/actions/auth';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { BASE_URL_CONFIG_PARAM_EDIT } from 'constants/routingApi';
import { message } from 'antd';

export const CONFIG_PARAM_EDIT_DATA_LOADED = 'CONFIG_PARAM_EDIT_DATA_LOADED';
export const CONFIG_PARAM_EDIT__DATA_SHOW_LOADING = 'CONFIG_PARAM_EDIT_DATA_SHOW_LOADING';

const receiveHeaderData = (data) => ({
    type: CONFIG_PARAM_EDIT_DATA_LOADED,
    isLoaded: true,
    data,
});

const configparameditActions = {};

const baseURLPath = BASE_URL_CONFIG_PARAM_EDIT;

configparameditActions.listShowLoading = (isLoading) => ({
    type: CONFIG_PARAM_EDIT__DATA_SHOW_LOADING,
    isLoading,
});

configparameditActions.fetchList = withAuthToken((params) => (token) => (dispatch) => {
    const { setIsLoading, data, userId, parameterType = '' } = params;
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
        url: baseURLPath + (parameterType ? '?parameterType=' + parameterType : ''),
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

// configparameditActions.saveData = withAuthToken((params) => (token) => (dispatch) => {
//     const { setIsLoading, errorAction, data, userId } = params;
//     setIsLoading(true);
//     const onError = () => errorAction('Internal Error, Please try again');

//     const onSuccess = (res) => {
//         if (res?.data) {
//             setIsLoading();
//             // dispatch(receiveHeaderData(res?.data));
//         } else {
//             onError();
//         }
//     };

//     const apiCallParams = {
//         data,
//         method: 'post',
//         url: baseURLPath,
//         token,
//         userId,
//         onSuccess,
//         onError,
//         onTimeout: () => errorAction('Request timed out, Please try again'),
//         onUnAuthenticated: () => dispatch(doLogout()),
//         onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
//         postRequest: () => setIsLoading(false),
//     };

//     axiosAPICall(apiCallParams);
// });

export { configparameditActions };
