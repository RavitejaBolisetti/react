/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { message } from 'antd';
import { axiosAPICall } from 'utils/axiosAPICall';
import { withAuthToken } from 'utils/withAuthToken';
import { doLogout, unAuthenticateUser } from '../../actions/auth';
import { LANGUAGE_EN } from 'language/en';

export const dataActions = (params) => {
    const { baseURL: inBaseURL, RECEIVE_DATA_LOADING_ACTION_CONSTANT, RECEIVE_DATA_ACTION_CONSTANT, RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT, RECEIVE_FILTERED_DATA_ACTION_CONSTANT, RECIEVE_DATA_DETAIL_ACTION_CONSTANT, RESET_DATA_ACTION_CONSTANT, SAVE_FORM_DATA_LOADING_CONSTANT, RECEIVE_CHANGE_HISTORY_DATA_ACTION_CONSTANT, RECEIVE_CHANGE_HISTORY_DATA_LOADING_ACTION_CONSTANT, RESET_DETAIL_DATA_ACTION_CONSTANT } = params;

    const saveFormShowLoading = (isLoading) => ({
        type: SAVE_FORM_DATA_LOADING_CONSTANT,
        isLoading,
    });

    const listShowLoading = (isLoading) => ({
        type: RECEIVE_DATA_LOADING_ACTION_CONSTANT,
        isLoading,
    });

    const recieveData = (data) => ({
        type: RECEIVE_DATA_ACTION_CONSTANT,
        data,
    });

    const recieveChangeHistoryData = (data) => ({
        type: RECEIVE_CHANGE_HISTORY_DATA_ACTION_CONSTANT,
        data,
    });

    const listShowChangeHistoryLoading = (isLoading) => ({
        type: RECEIVE_CHANGE_HISTORY_DATA_LOADING_ACTION_CONSTANT,
        isLoading,
    });

    const setFilter = (filter) => ({
        type: RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT,
        filter,
    });

    const filteredRecieveData = (filteredListData) => ({
        type: RECEIVE_FILTERED_DATA_ACTION_CONSTANT,
        filteredListData,
    });

    const recieveDataDetail = (data) => ({
        type: RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
        data,
    });

    const resetData = () => ({
        type: RESET_DATA_ACTION_CONSTANT,
    });
    const resetDetailData = () => ({
        type: RESET_DETAIL_DATA_ACTION_CONSTANT,
    });

    const innerDataActions = {
        fetchList: withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
            const { customURL = '', setIsLoading, data, type = '', mytype = '', tempRespone = false, onSuccessAction = undefined, onErrorAction = undefined, extraParams = [] } = params;
            setIsLoading(true);

            const onError = (message) => {
                onErrorAction && onErrorAction(message);
                dispatch(recieveData([]));
            };

            const onSuccess = (res) => {
                if (res?.data) {
                    onSuccessAction && onSuccessAction(res);
                    dispatch(recieveData(type ? res?.data?.hierarchyAttribute : res?.data));
                } else {
                    dispatch(recieveData([]));
                    // onErrorAction(res?.responseMessage || LANGUAGE_EN.INTERNAL_SERVER_ERROR);
                }
            };

            let sExtraParamsString = '?';
            extraParams?.forEach((item, index) => {
                sExtraParamsString += item?.value && item?.key ? item?.value && item?.key + '=' + item?.value + '&' : '';
            });

            sExtraParamsString = sExtraParamsString.substring(0, sExtraParamsString.length - 1);

            const apiCallParams = {
                tempRespone,
                data,
                method: 'get',
                url: (customURL || inBaseURL) + (type ? '?type=' + type : '') + (mytype ? mytype : '') + (sExtraParamsString ? sExtraParamsString : ''),
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

            const onError = (errorMessage) => {
                message.error(errorMessage);
                dispatch(filteredRecieveData([]));
            };

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
                url: inBaseURL + '/lov',
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
            const { customURL = '', setIsLoading, data, code = '', onErrorAction = undefined, partyCode = '', parameterType = '', onSuccessAction = undefined, id = '', type = '', customerId = '', extraParams = [] } = params;
            setIsLoading(true);

            const onError = (message) => {
                onErrorAction(message);
                dispatch(recieveDataDetail([]));
            };

            const onSuccess = (res) => {
                if (res?.data) {
                    onSuccessAction && onSuccessAction(res);
                    dispatch(recieveDataDetail(res?.data));
                } else {
                    dispatch(recieveDataDetail([]));

                    onError(LANGUAGE_EN.INTERNAL_SERVER_ERROR);
                }
            };

            let sExtraParamsString = '?';
            extraParams?.forEach((item, index) => {
                sExtraParamsString += item?.value && item?.key ? item?.value && item?.key + '=' + item?.value + '&' : '';
            });

            sExtraParamsString = sExtraParamsString.substring(0, sExtraParamsString.length - 1);

            const apiCallParams = {
                data,
                method: 'get',
                url: (customURL || inBaseURL) + (id ? '?id=' + id : '') + (type ? '?type=' + type : '') + (code ? '?code=' + code : '') + (partyCode ? '?partyCode=' + partyCode : '') + (parameterType ? '?parameterType=' + parameterType : '') + (customerId ? '?customerId=' + customerId : '') + (sExtraParamsString ? sExtraParamsString : ''),
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
            const { setIsLoading, onError, data, userId, onSuccess, method = 'post', customURL } = params;
            setIsLoading(true);

            const onSuccessAction = (res) => {
                onSuccess(res);
                // RECEIVE_DATA_ACTION_CONSTANT && dispatch(innerDataActions.fetchList({ setIsLoading: () => {}, userId, extraParams }));
                RECEIVE_FILTERED_DATA_ACTION_CONSTANT && dispatch(innerDataActions.fetchFilteredList({ setIsLoading: () => {}, userId }));
            };

            const apiCallParams = {
                data,
                method: method,
                url: customURL || inBaseURL,
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

        fetchData: withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
            const { setIsLoading, onSuccessAction = undefined, onErrorAction = undefined, extraParams = [], customURL = '' } = params;
            setIsLoading(true);

            const onError = (message) => {
                onErrorAction && onErrorAction(message);
            };

            const onSuccess = (res) => {
                if (res?.data) {
                    onSuccessAction && onSuccessAction(res);
                } else {
                    onErrorAction(res?.responseMessage);
                }
            };

            let sExtraParamsString = '?';
            extraParams?.forEach((item, index) => {
                sExtraParamsString += item?.value && item?.key ? item?.value && item?.key + '=' + item?.value + '&' : '';
            });

            sExtraParamsString = sExtraParamsString.substring(0, sExtraParamsString.length - 1);

            const apiCallParams = {
                method: 'get',
                url: (customURL || inBaseURL) + (sExtraParamsString ? sExtraParamsString : ''),
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

        changeHistory: withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
            const { customURL = '', setIsLoading, data, onSuccessAction = undefined, onErrorAction = undefined, extraParams = [] } = params;
            setIsLoading(true);

            const onError = (message) => {
                dispatch(recieveChangeHistoryData([]));
                onErrorAction && onErrorAction(message);
            };

            const onSuccess = (res) => {
                if (res?.data) {
                    onSuccessAction && onSuccessAction(res);
                    dispatch(recieveChangeHistoryData(res?.data));
                } else {
                    dispatch(recieveChangeHistoryData([]));
                }
            };

            let sExtraParamsString = '?';
            extraParams?.forEach((item, index) => {
                sExtraParamsString += item?.value && item?.key ? item?.value && item?.key + '=' + item?.value + '&' : '';
            });

            sExtraParamsString = sExtraParamsString.substring(0, sExtraParamsString.length - 1);

            const apiCallParams = {
                data,
                method: 'get',
                url: (customURL ? customURL : inBaseURL + '/changehistory') + (sExtraParamsString ? sExtraParamsString : ''),
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

        exportToExcel: withAuthToken((params) => ({ token, accessToken, userId }) => (dispatch) => {
            const { setIsLoading, data, type = '', mytype = '', onErrorAction = undefined, extraParams = [] } = params;
            setIsLoading(true);

            const onError = (message) => {
                onErrorAction(message);
            };

            const onSuccess = (response) => {
                //console.log('res', response.blob());
                // if (response) {
                //     response.blob().then((blob) => {
                //         let url = window.URL.createObjectURL(blob.blob());
                //         let a = document.createElement('a');
                //         a.href = url;
                //         a.download = 'employees.csv';
                //         a.click();
                //     });
                // }
                // if (data) {
                //     const blob = new Blob([data], { type: 'text/csv' });
                //     // Creating an object for downloading url
                //     const href = window.URL.createObjectURL(blob)
                //     // console.log('res?.data', data);
                //     // onSuccessAction && onSuccessAction(res);
                //     // dispatch(recieveData(type ? res?.data?.hierarchyAttribute : res?.data));
                //     // create file link in browser's memory
                //     // const href = URL.createObjectURL(res);
                //     // create "a" HTML element with href to file & click
                //     const link = document.createElement('a');
                //     link.href = href;
                //     link.setAttribute('download', 'file.csv'); //or any other extension
                //     document.body.appendChild(link);
                //     link.click();
                //     // clean up "a" element & remove ObjectURL
                //     document.body.removeChild(link);
                //     URL.revokeObjectURL(href);
                // } else {
                //     onError(LANGUAGE_EN.INTERNAL_SERVER_ERROR);
                // }
            };

            let sExtraParamsString = '?';
            extraParams?.forEach((item, index) => {
                sExtraParamsString += item?.value && item?.key ? item?.value && item?.key + '=' + item?.value + '&' : '';
            });

            sExtraParamsString = sExtraParamsString.substring(0, sExtraParamsString.length - 1);

            const apiCallParams = {
                data,
                method: 'get',
                url: inBaseURL + '/report' + (type ? '?type=' + type : '') + (mytype ? mytype : '') + (sExtraParamsString ? sExtraParamsString : ''),
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

            // const { setIsLoading, errorAction, studyId, data = undefined, extraParams = undefined, siteId = undefined, eProId = undefined, surveyId = undefined, assessmentId = undefined } = params;
            // setIsLoading(true);

            // const onError = () => errorAction(language_common.ERROR_INTERNAL);

            // const onSuccess = (res) => {
            //     if (res.data) {
            //         if (res.data.fileNameHash) {
            //             message.info(res.data.message);
            //             const dataExtractionFileURL = URL_DOWNLOAD_PREFIX + (res.data && res.data.fileNameHash) + '?download=true&originalFilename=true&token=' + token;
            //             downloadReportFile(dataExtractionFileURL, res.data.originalFileName);
            //         } else if (res.data.message) {
            //             message.error(res.data.message);
            //         }
            //     } else {
            //         onError();
            //     }
            // };
            // const onWarning = (warningMessage) => message.error(warningMessage);
            // const baseURL = studySiteSpecific && studyId && siteId ? inBaseURL + '/' + studyId + '/sites/' + siteId + '/' + studyUrl : studySpecific && !studyProSpecific ? inBaseURL + '/' + studyId + '/' + studyUrl : studySpecific && studyProSpecific ? inBaseURL + '/' + studyId + '/' + studyUrl + '/' + eProId + '/' + (versionUrl ? versionUrl : '') : eLearningSpecific ? inBaseURL + '/' + assessmentId + '/' + studyUrl : surveySpecific ? inBaseURL + '/' + surveyId + '/' + studyUrl : siteSpecific ? inBaseURL + '/' + siteId + '/' + (siteUrl ? siteUrl : '') : inBaseURL;
            // const extraURLParam = extraParams ? '&' + extraParams : '';
            // const apiCallParams = {
            //     method: 'get',
            //     url: baseURL + '/ExportToExcel?FileType=EXCEL' + extraURLParam,
            //     data,
            //     token,
            //     onSuccess,
            //     onError,
            //     onWarning,
            //     onUnAuthenticated: () => {
            //         dispatch(doLogout());
            //     },
            //     onTimeout: () => errorAction(language_common.ERROR_REQUEST_TIMED_OUT),
            //     onUnauthorized: (message) => dispatch(unAuthenticateUser(message)),
            //     postRequest: () => setIsLoading(false),
            // };

            // axiosAPICall(apiCallParams);
        }),

        reset: () => (dispatch) => {
            dispatch(resetData());
        },
        resetDetail: () => (dispatch) => {
            dispatch(resetDetailData());
        },
        setFilter: (filter) => (dispatch) => {
            dispatch(setFilter(filter));
        },
        listShowLoading: (isLoading) => (dispatch) => {
            dispatch(listShowLoading(isLoading));
        },
        listShowChangeHistoryLoading: (isLoading) => (dispatch) => {
            dispatch(listShowChangeHistoryLoading(isLoading));
        },
        saveFormShowLoading: (isLoading) => (dispatch) => {
            dispatch(saveFormShowLoading(isLoading));
        },
    };
    return innerDataActions;
};
