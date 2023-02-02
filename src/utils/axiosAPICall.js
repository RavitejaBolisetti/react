import axios from 'axios';

export const AXIOS_ERROR_WITH_RESPONSE = 'AXIOS_ERROR_WITH_RESPONSE';
export const AXIOS_ERROR_OTHER_ERROR = 'AXIOS_ERROR_OTHER_ERROR';
export const AXIOS_ERROR_NO_RESPONSE = 'AXIOS_ERROR_NO_RESPONSE';
export const AXIOS_ERROR_INTERNAL = 'AXIOS_ERROR_INTERNAL';

const baseAPICall = (params) => {
    const { method, url, data, onSuccess, onError, onWarning = undefined, onTimeout, onUnauthorized, onUnAuthenticated, postRequest, token, userId, onErrorModal = undefined } = params;
    let axiosConfig = {
        timeout: process.env.REACT_APP_API_CALL_TIMEOUT,
        method,
        url,
    };
    if (data) {
        axiosConfig = {
            ...axiosConfig,
            data,
        };
    }

    if (token) {
        const AuthStr = 'Bearer '.concat(token);
        const headers = { Authorization: AuthStr, token, userId };
        axiosConfig = {
            ...axiosConfig,
            headers,
        };
    }

    //console.dir(axiosConfig);

    axios
        .request(axiosConfig)
        .then(onSuccess)
        .catch((error) => {
            // The following code is mostly copy/pasted from axios documentation at https://github.com/axios/axios#handling-errors
            // Added support for handling timeout errors separately, dont use this code in production
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status === 401) {
                    onUnAuthenticated && onUnAuthenticated(error.response.data.message);
                } else if (error.response.status === 403) {
                    //message.info('You are not authorised to view this page. Please login again.');
                    onUnauthorized('Sorry you are not authorised to view this page. Please login again.');
                } else if (error.response.status === 409) {
                    var message = error?.response?.data?.message || undefined;
                    var title = error?.response?.data?.title || undefined;
                    onWarning && message ? onWarning(message, title) : onError(AXIOS_ERROR_WITH_RESPONSE, error.response.status, message);

                    var validationMessages = error?.response?.data?.validationMessages || [];

                    onErrorModal && !onWarning && message && validationMessages && validationMessages.length > 0 ? onErrorModal(message, validationMessages) : onErrorModal && message && !onWarning ? onError('ERROR', [message]) : !onWarning && onError(AXIOS_ERROR_WITH_RESPONSE, error.response.status, message);
                } else {
                    onError(AXIOS_ERROR_WITH_RESPONSE, error.response.status);
                }
            } else if (error.code) {
                // This is a timeout error
                if (error.code === 'ECONNABORTED') {
                    onTimeout();
                } else {
                    onError(AXIOS_ERROR_OTHER_ERROR);
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                onError(AXIOS_ERROR_NO_RESPONSE);
            } else {
                // Something happened in setting up the request that triggered an Error
                onError(AXIOS_ERROR_INTERNAL);
            }
        })
        .finally(() => {
            postRequest();
        });
};

let axiosAPICall = baseAPICall;

if (process.env.NODE_ENV !== 'production' && process.env.REACT_APP_API_CALL_USE_DEV_DELAY === 'true') {
    axiosAPICall = (...rest) => {
        setTimeout(() => {
            baseAPICall(...rest);
        }, process.env.REACT_APP_API_CALL_DEV_DELAY);
    };
}

export { axiosAPICall };
