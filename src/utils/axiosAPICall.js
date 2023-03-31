import { EN } from 'language/en';

import axios from 'axios';
import { clearLocalStorageData } from 'store/actions/auth';
export const AXIOS_ERROR_WITH_RESPONSE = 'AXIOS_ERROR_WITH_RESPONSE';
export const AXIOS_ERROR_OTHER_ERROR = 'AXIOS_ERROR_OTHER_ERROR';
export const AXIOS_ERROR_NO_RESPONSE = 'AXIOS_ERROR_NO_RESPONSE';
export const AXIOS_ERROR_INTERNAL = 'AXIOS_ERROR_INTERNAL';

const baseAPICall = (params) => {
    const { method, url, data, onSuccess, displayErrorTitle = false, onError, onTimeout, postRequest, token, accessToken, userId } = params;
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

    const unAuthorizedTtitle = EN.GENERAL.AUTHORIZED_REQUEST.TITLE;
    const unAuthorizedMessage = EN.GENERAL.AUTHORIZED_REQUEST.MESSAGE;

    const handleErrorMessage = ({ onError, displayErrorTitle, errorTitle, errorMessage }) => {
        onError && (displayErrorTitle ? onError({ title: errorTitle, message: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage }) : onError(errorMessage));
    };

    const onUnAuthenticated = () => {
        clearLocalStorageData();
    };

    try {
        axios
            .request(axiosConfig)
            .then((response) => {
                if (response.status === 200) {
                    if (response?.data?.status) {
                        if (response?.data?.statusCode === 200) {
                            onSuccess(response?.data);
                        } else if (response?.data?.statusCode === 404) {
                            handleErrorMessage({ onError, displayErrorTitle, errorTitle: response?.data?.errorTitle, errorMessage: response?.data?.errors || response?.data?.data?.responseMessage });
                        } else if (response?.data?.statusCode === 409) {
                            handleErrorMessage({ onError, displayErrorTitle, errorTitle: response?.data?.errorTitle, errorMessage: response?.data?.errors || response?.data?.data?.responseMessage });
                        } else {
                            handleErrorMessage({ onError, displayErrorTitle, errorTitle: response?.data?.errorTitle, errorMessage: response?.data?.errors || response?.data?.data?.responseMessage });
                        }
                    } else if (response?.statusCode === 401) {
                        onUnAuthenticated && onUnAuthenticated(response?.errors || unAuthorizedMessage);
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
                onUnAuthenticated();
                // The following code is mostly copy/pasted from axios documentation at https://github.com/axios/axios#handling-errors
                // Added support for handling timeout errors separately, dont use this code in production
                if (error.response) {
                    handleErrorMessage({ onError, displayErrorTitle, errorTitle: EN.GENERAL.ERROR.TITLE, errorMessage: EN.GENERAL.ERROR.MESSAGE });
                } else if (error.code) {
                    if (error.code === 'ECONNABORTED') {
                        handleErrorMessage({ onError, displayErrorTitle, errorTitle: EN.GENERAL.REQUEST_TIMEOUT.TITLE, errorMessage: EN.GENERAL.REQUEST_TIMEOUT.MESSAGE });
                        onTimeout();
                    } else if (error.code === 'ERR_NETWORK') {
                        handleErrorMessage({ onError, displayErrorTitle, errorTitle: EN.GENERAL.AUTHORIZED_REQUEST.TITLE, errorMessage: EN.GENERAL.AUTHORIZED_REQUEST.MESSAGE });
                    } else if (error.code === 'ERR_NAME_NOT_RESOLVED') {
                        handleErrorMessage({ onError, displayErrorTitle, errorTitle: EN.GENERAL.NETWORK_ERROR.TITLE, errorMessage: EN.GENERAL.NETWORK_ERROR.MESSAGE });
                    } else {
                        onError(AXIOS_ERROR_OTHER_ERROR);
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    handleErrorMessage({ onError, displayErrorTitle, errorTitle: EN.GENERAL.NO_RESPONSE.TITLE, errorMessage: EN.GENERAL.NO_RESPONSE.MESSAGE });
                } else {
                    // Something happened in setting up the request that triggered an Error
                    handleErrorMessage({ onError, displayErrorTitle, errorTitle: EN.GENERAL.NO_RESPONSE.TITLE, errorMessage: EN.GENERAL.NO_RESPONSE.MESSAGE });
                }
            })
            .finally(() => {
                postRequest();
            });
    } catch (err) {
        handleErrorMessage({ onError, displayErrorTitle, errorTitle: EN.GENERAL.INTERNAL_SERVER_ERROR.TITLE, errorMessage: EN.GENERAL.INTERNAL_SERVER_ERROR.MESSAGE });
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
