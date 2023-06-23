/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const editActionConstants = (prefix) => ({
    SUCCESS: prefix + 'EDIT_SUCCESS',
    ERROR: prefix + 'EDIT_ERROR',
    SHOW_LOADING: prefix + 'EDIT_SHOW_LOADING',
    SHOW_FORM: prefix + 'EDIT_SHOW_FORM',
    HIDE_FORM: prefix + 'EDIT_HIDE_FORM',
    FILE_UPLOAD_SUCCESS: prefix + 'FILE_UPLOAD_SUCCESS',
    ERROR_CLOSE: prefix + 'ERROR_CLOSE',
});

export const editActions = (editActionConstants) => ({
    success: (message, isFormShown) => ({
        type: editActionConstants.SUCCESS,
        message,
        isFormShown,
    }),
    error: (message) => ({
        type: editActionConstants.ERROR,
        message,
    }),
    showLoading: (isLoading = true) => ({
        type: editActionConstants.SHOW_LOADING,
        isLoading,
    }),
    hideForm: () => ({
        type: editActionConstants.HIDE_FORM,
    }),
    showForm: (id, manageCountryMilestone = false) => ({
        type: editActionConstants.SHOW_FORM,
        id,
        manageCountryMilestone,
    }),
    setFileHash: (fileData = {}) => ({
        type: editActionConstants.FILE_UPLOAD_SUCCESS,
        fileData,
    }),
    errorClose: () => ({
        type: editActionConstants.ERROR_CLOSE,
    }),
});
