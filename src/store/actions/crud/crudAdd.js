/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const addActionConstants = (prefix) => ({
    SUCCESS: prefix + 'ADD_SUCCESS',
    ERROR: prefix + 'ADD_ERROR',
    SHOW_FORM: prefix + 'ADD_SHOW_FORM',
    HIDE_FORM: prefix + 'ADD_HIDE_FORM',
    SHOW_LOADING: prefix + 'ADD_SHOW_LOADING',
    FILE_UPLOAD_SUCCESS: prefix + 'FILE_UPLOAD_SUCCESS',
    SUCCESS_CLOSE: prefix + 'SUCCESS_CLOSE',
    ERROR_CLOSE: prefix + 'ERROR_CLOSE',
});

export const addActions = (addActionConstants) => ({
    success: (message, isFormShown, newItemId) => ({
        type: addActionConstants.SUCCESS,
        message,
        isFormShown,
        newItemId,
    }),
    error: (message) => ({
        type: addActionConstants.ERROR,
        message,
    }),
    showForm: () => ({
        type: addActionConstants.SHOW_FORM,
    }),
    hideForm: () => ({
        type: addActionConstants.HIDE_FORM,
    }),
    showLoading: (isLoading = false) => ({
        type: addActionConstants.SHOW_LOADING,
        isLoading,
    }),
    setFileHash: (fileData = {}) => ({
        type: addActionConstants.FILE_UPLOAD_SUCCESS,
        fileData,
    }),
    successClose: () => ({
        type: addActionConstants.SUCCESS_CLOSE,
    }),
    errorClose: () => ({
        type: addActionConstants.ERROR_CLOSE,
    }),
});
