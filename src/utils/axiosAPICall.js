import axios from 'axios';
import { clearAllLocalStorage } from 'store/actions/auth';
export const AXIOS_ERROR_WITH_RESPONSE = 'AXIOS_ERROR_WITH_RESPONSE';
export const AXIOS_ERROR_OTHER_ERROR = 'AXIOS_ERROR_OTHER_ERROR';
export const AXIOS_ERROR_NO_RESPONSE = 'AXIOS_ERROR_NO_RESPONSE';
export const AXIOS_ERROR_INTERNAL = 'AXIOS_ERROR_INTERNAL';

const baseAPICall = (params) => {
    const { method, url, data, onSuccess, displayErrorTitle = false, onError, onTimeout, onUnAuthenticated, postRequest, token, accessToken, userId } = params;
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
        const headers = { Authorization: AuthStr, accessToken: accessToken, userId, deviceType: 'W', deviceId: '' };
        axiosConfig = {
            ...axiosConfig,
            headers,
        };
    }

    const unAuthorizedMessage = 'Sorry you are not authorised to view this page. Please login again.';

    const handleErrorMessage = ({ onError, displayErrorTitle, errorTitle, errorMessage }) => {
        onError && (displayErrorTitle ? onError({ title: errorTitle, message: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage }) : onError(errorMessage));
    };
    try {
        axios
            .request(axiosConfig)
            .then((response) => {
                console.log('🚀 ~ file: axiosAPICall.js:39 ~ .then ~ response:', response,response?.data?.statusCode);
                if (response.status === 200) {
                    if (response?.data?.status) {
                        if (response?.data?.statusCode === 200) {
                            onSuccess(response?.data);
                        } else if (response?.data?.statusCode === 404) {
                            handleErrorMessage({ onError, displayErrorTitle, errorTitle: response?.data?.data?.errorTitle, errorMessage: response?.data?.errors || response?.data?.data?.responseMessage });
                        } else if (response?.data?.statusCode === 409) {
                            handleErrorMessage({ onError, displayErrorTitle, errorTitle: response?.data?.data?.errorTitle, errorMessage: response?.data?.errors || response?.data?.data?.responseMessage });
                        } else {
                            handleErrorMessage({ onError, displayErrorTitle, errorTitle: response?.data?.data?.errorTitle, errorMessage: response?.data?.errors || response?.data?.data?.responseMessage });
                        }
                    } else if (response?.statusCode === 401) {
                        onUnAuthenticated && onUnAuthenticated(response?.errors || unAuthorizedMessage);
                        /* To Do : Need to remove Start */
                        // onUnAuthenticated && onUnAuthenticated(response?.responseMessage || unAuthorizedMessage);
                        /* To Do : Need to remove End */
                    } else if (response.statusCode === 403) {
                        onUnAuthenticated && onUnAuthenticated(response?.errors || unAuthorizedMessage);
                    } else if (response.statusCode === 500) {
                        onUnAuthenticated && onUnAuthenticated(response?.errors || unAuthorizedMessage);
                    } else {
                        handleErrorMessage({ onError, displayErrorTitle, errorTitle: 'ERROR', errorMessage: response?.data?.errors || response?.data?.responseMessage });
                    }
                }
            })
            .catch((error) => {
                console.log('🚀 ~ file: axiosAPICall.js:63 ~ baseAPICall ~ error:', error.code);
                // The following code is mostly copy/pasted from axios documentation at https://github.com/axios/axios#handling-errors
                // Added support for handling timeout errors separately, dont use this code in production
                if (error.response) {
                    console.log('We are facing server issue!!');
                } else if (error.code) {
                    // This is a timeout error
                    if (error.code === 'ECONNABORTED') {
                        onTimeout();
                    } else if (error.code === 'ERR_NETWORK') {
                        /* To Do : Need to remove Start */
                        // clearAllLocalStorage();
                        /* To Do : Need to remove End */

                        handleErrorMessage({ onError, displayErrorTitle, errorTitle: 'ERROR', errorMessage: 'We are facing on server' });
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
    } catch (err) {
        console.log('We are facing server issue!!');
    }
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
