/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { LANGUAGE_EN } from 'language/en';
import axios from 'axios';
import { clearLocalStorageData } from 'store/actions/auth';
export const AXIOS_ERROR_WITH_RESPONSE = 'AXIOS_ERROR_WITH_RESPONSE';
export const AXIOS_ERROR_OTHER_ERROR = 'AXIOS_ERROR_OTHER_ERROR';
export const AXIOS_ERROR_NO_RESPONSE = 'AXIOS_ERROR_NO_RESPONSE';
export const AXIOS_ERROR_INTERNAL = 'AXIOS_ERROR_INTERNAL';

const baseAPICall = async (params) => {
    const { method, url, data, onSuccess, displayErrorTitle = false, onError, tempRespone = false, onTimeout, postRequest, token, accessToken, userId, deviceType } = params;
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
        const headers = { Authorization: AuthStr, userId, accessToken: accessToken, deviceType: deviceType || 'W', deviceId: '' };
        axiosConfig = {
            ...axiosConfig,
            headers,
        };
    }

    const unAuthorizedMessage = LANGUAGE_EN.GENERAL.AUTHORIZED_REQUEST.MESSAGE;

    const handleErrorMessage = ({ onError, displayErrorTitle, errorData = false, errorSection = undefined, errorTitle, errorMessage }) => {
        onError && (displayErrorTitle ? onError({ title: errorTitle, message: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage }) : errorData || errorSection ? onError(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage, errorData, errorSection) : onError(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage));
    };

    const onUnAuthenticated = (message = '') => {
        clearLocalStorageData();
        onError && onError(message);
    };

    try {
        await axios
            .request(axiosConfig)
            .then((response) => {
                if (tempRespone && response) {
                    onSuccess(response);
                    return false;
                }
                if (response.status === 200) {
                    if (response?.data?.status) {
                        if (response?.data?.statusCode === 200) {
                            onSuccess(response?.data);
                        } else if (response?.data?.statusCode === 400) {
                            handleErrorMessage({ onError, displayErrorTitle, errorSection: response?.data?.errorSection, errorData: response?.data?.data, errorTitle: response?.data?.errorTitle, errorMessage: response?.data?.errors || response?.data?.data?.responseMessage || response?.data?.responseMessage });
                        } else if (response?.data?.statusCode === 404) {
                            handleErrorMessage({ onError, displayErrorTitle, errorTitle: response?.data?.errorTitle, errorMessage: response?.data?.errors || response?.data?.data?.responseMessage });
                        } else if (response?.data?.statusCode === 409) {
                            handleErrorMessage({ onError, displayErrorTitle, errorTitle: response?.data?.errorTitle, errorMessage: response?.data?.errors || response?.data?.data?.responseMessage });
                        } else {
                            handleErrorMessage({ onError, displayErrorTitle, errorTitle: response?.data?.errorTitle, errorMessage: response?.data?.errors || response?.data?.data?.responseMessage });
                        }
                    } else if (response?.statusCode === 401) {
                        onUnAuthenticated(response?.errors || unAuthorizedMessage);
                    } else if (response.statusCode === 403) {
                        onError && onError(response?.errors || unAuthorizedMessage);
                    } else if (response.statusCode === 500) {
                        onError && onError(response?.errors || unAuthorizedMessage);
                    } else {
                        handleErrorMessage({ onError, displayErrorTitle, errorTitle: LANGUAGE_EN.GENERAL.INTERNAL_SERVER_ERROR.TITLE, errorMessage: response?.data?.errors || response?.data?.responseMessage || LANGUAGE_EN.GENERAL.INTERNAL_SERVER_ERROR.MESSAGE });
                    }
                }
            })
            .catch((error) => {
                // onUnAuthenticated();
                // The following code is mostly copy/pasted from axios documentation at https://github.com/axios/axios#handling-errors
                // Added support for handling timeout errors separately, dont use this code in production
                if (error.response) {
                    handleErrorMessage({ onError, displayErrorTitle, errorTitle: LANGUAGE_EN.GENERAL.ERROR.TITLE, errorMessage: LANGUAGE_EN.GENERAL.ERROR.MESSAGE });
                } else if (error.code) {
                    if (error.code === 'ECONNABORTED') {
                        handleErrorMessage({ onError, displayErrorTitle, errorTitle: LANGUAGE_EN.GENERAL.REQUEST_TIMEOUT.TITLE, errorMessage: LANGUAGE_EN.GENERAL.REQUEST_TIMEOUT.MESSAGE });
                        onTimeout();
                    } else if (error.code === 'ERR_NETWORK') {
                        handleErrorMessage({ onError, displayErrorTitle, errorTitle: LANGUAGE_EN.GENERAL.REQUEST_TIMEOUT.TITLE, errorMessage: LANGUAGE_EN.GENERAL.REQUEST_TIMEOUT.MESSAGE });
                    } else if (error.code === 'ERR_NAME_NOT_RESOLVED') {
                        handleErrorMessage({ onError, displayErrorTitle, errorTitle: LANGUAGE_EN.GENERAL.NETWORK_ERROR.TITLE, errorMessage: LANGUAGE_EN.GENERAL.NETWORK_ERROR.MESSAGE });
                    } else {
                        onError(AXIOS_ERROR_OTHER_ERROR);
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    handleErrorMessage({ onError, displayErrorTitle, errorTitle: LANGUAGE_EN.GENERAL.NO_RESPONSE.TITLE, errorMessage: LANGUAGE_EN.GENERAL.NO_RESPONSE.MESSAGE });
                } else {
                    // Something happened in setting up the request that triggered an Error
                    handleErrorMessage({ onError, displayErrorTitle, errorTitle: LANGUAGE_EN.GENERAL.NO_RESPONSE.TITLE, errorMessage: LANGUAGE_EN.GENERAL.NO_RESPONSE.MESSAGE });
                }
            })
            .finally(() => {
                postRequest();
            });
    } catch (err) {
        handleErrorMessage({ onError, displayErrorTitle, errorTitle: LANGUAGE_EN.GENERAL.INTERNAL_SERVER_ERROR.TITLE, errorMessage: LANGUAGE_EN.GENERAL.INTERNAL_SERVER_ERROR.MESSAGE });
    }
};

let axiosAPICall = baseAPICall;

if (process.env.NODE_ENV !== 'production' && process.env.REACT_APP_API_CALL_USE_DEV_DELAY) {
    axiosAPICall = (...rest) => {
        setTimeout(() => {
            baseAPICall(...rest);
        }, process.env.REACT_APP_API_CALL_DEV_DELAY);
    };
}

export { axiosAPICall };
