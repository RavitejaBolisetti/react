/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const listActionConstants = (prefix, additionalActions = {}) => ({
    SHOW_LOADING: prefix + 'LIST_SHOW_LOADING',
    FETCH_ERROR: prefix + 'LIST_FETCH_ERROR',
    SET_FILTER_STRING: prefix + 'LIST_FILTER_STRING',
    SET_FILTER_VALUES: prefix + 'LIST_SET_FILTER_VALUES',
    ERROR_CLOSE: prefix + 'ERROR_CLOSE',
    ...additionalActions,
});

export const listActions = (listActionConstants, additionalConstants = {}) => ({
    showLoading: (isLoading = true) => ({
        type: listActionConstants.SHOW_LOADING,
        isLoading,
    }),
    fetchError: (message) => ({
        type: listActionConstants.FETCH_ERROR,
        message,
    }),
    setFilterString: (filterString) => ({
        type: listActionConstants.SET_FILTER_STRING,
        filterString,
    }),
    setFilter: (additionalFilterValues) => ({
        type: listActionConstants.SET_FILTER_VALUES,
        additionalFilterValues,
    }),
    errorClose: () => ({
        type: listActionConstants.ERROR_CLOSE,
    }),
    ...additionalConstants,
});
