import { message } from 'antd';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { doLogout, unAuthenticateUser } from '../../actions/auth';
import { LANGUAGE_EN } from 'language/en';

export const dataActions = (params) => {
    const { baseURL: inBaseURL, RECEIVE_DATA_LOADING_ACTION_CONSTANT, RECEIVE_DATA_ACTION_CONSTANT, RECEIVE_FILTERED_DATA_ACTION_CONSTANT, SAVE_DATA_ACTION_CONSTANT, RECIEVE_DETAIL_ACTION_CONSTANT, RESET_DATA_ACTION_CONSTANT } = params;

    const listShowLoading = (isLoading) => ({
        type: RECEIVE_DATA_LOADING_ACTION_CONSTANT,
        isLoading,
    });

    const recieveData = (data) => ({
        type: RECEIVE_DATA_ACTION_CONSTANT,
        data,
    });

    const filteredRecieveData = (filteredListData) => ({
        type: RECEIVE_FILTERED_DATA_ACTION_CONSTANT,
        filteredListData,
    });

    const recieveDataDetail = (data, id) => ({
        type: RECIEVE_DETAIL_ACTION_CONSTANT,
        data,
        id,
    });

    const saveData = (data) => ({
        type: SAVE_DATA_ACTION_CONSTANT,
        data,
    });

    const resetData = () => ({
        type: RESET_DATA_ACTION_CONSTANT,
    });

    const innerDataActions = {
        fetchList: withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
            const { setIsLoading, data, type = '' } = params;
            setIsLoading(true);
            const onError = (errorMessage) => message.error(errorMessage);

            const onSuccess = (res) => {
                if (res?.data) {
                    dispatch(recieveData(type ? res?.data?.hierarchyAttribute : res?.data));
                } else {
                    onError(LANGUAGE_EN.INTERNAL_SERVER_ERROR);
                }
            };

            const apiCallParams = {
                data,
                method: 'get',
                url: inBaseURL + (type ? '?type=' + type : ''),
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
        }),

        fetchFilteredList: withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
            const { setIsLoading, data } = params;
            setIsLoading(true);
            const onError = (errorMessage) => message.error(errorMessage);

            const onSuccess = (res) => {
                if (res?.data) {
                    dispatch(filteredRecieveData(res?.data));
                } else {
                    onError(LANGUAGE_EN.INTERNAL_SERVER_ERROR);
                }
            };

            const apiCallParams = {
                data,
                method: 'get',
                url: inBaseURL,
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
        }),

        fetchDetail: withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
            const { setIsLoading, data, id = '' } = params;
            setIsLoading(true);
            const onError = (errorMessage) => message.error(errorMessage);

            const onSuccess = (res) => {
                if (res?.data) {
                    dispatch(recieveDataDetail(res?.data, id));
                } else {
                    onError(LANGUAGE_EN.INTERNAL_SERVER_ERROR);
                }
            };

            const apiCallParams = {
                data,
                method: 'get',
                url: inBaseURL + (id ? '?id=' + id : ''),
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
        }),

        saveData: withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
            const { setIsLoading, onError, data, userId, onSuccess, method = 'post' } = params;
            setIsLoading(true);

            const onSuccessAction = (res) => {
                onSuccess(res);
            };

            const apiCallParams = {
                data,
                method: method,
                url: inBaseURL,
                token,
                accessToken,
                userId,
                onSuccess: onSuccessAction,
                onError,
                onTimeout: () => onError('Request timed out, Please try again'),
                onUnAuthenticated: () => dispatch(doLogout()),
                onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
                postRequest: () => setIsLoading(false),
            };

            axiosAPICall(apiCallParams);
        }),
        reset: () => (dispatch) => {
            dispatch(resetData());
        },
        listShowLoading: (isLoading) => (dispatch) => {
            dispatch(listShowLoading(isLoading));
        },
    };
    return innerDataActions;
};
