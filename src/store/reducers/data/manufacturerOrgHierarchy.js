/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { MANUFACTURER_ORG_HIERARCHY_DATA_LOADED, MANUFACTURER_ORG_HIERARCHY_SET_FORM_IS_VISIBLE, MANUFACTURER_ORG_HIERARCHY_SET_FORM_DATA, MANUFACTURER_ORG_HIERARCHY_DATA_SHOW_LOADING, MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_DATA_LOADED, MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING, MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_VISIBLE } from 'store/actions/data/manufacturerOrgHierarchy';

const initialState = {
    isLoaded: false,
    data: [],
    isFormDataLoaded: false,
    formData: undefined,
    isFormVisible: false,
    isLoading: false,
    changeHistoryVisible: false,
    historyData: [],
};

export const ManufacturerOrgHierarchy = (state = initialState, action) => {
    switch (action.type) {
        case MANUFACTURER_ORG_HIERARCHY_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case MANUFACTURER_ORG_HIERARCHY_SET_FORM_DATA:
            return { ...state, isFormDataLoaded: action.isFormDataLoaded, formData: action.formData };
        case MANUFACTURER_ORG_HIERARCHY_SET_FORM_IS_VISIBLE:
            return { ...state, isFormVisible: true };
        case MANUFACTURER_ORG_HIERARCHY_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        case MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_DATA_LOADED:
            return { ...state, isHistoryLoaded: action.isLoaded, historyData: action.historyData };
        case MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING:
            return { ...state, isHistoryLoading: action.isLoading };
        case MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_VISIBLE:
            return { ...state, changeHistoryVisible: action.visible };
        default:
            return { ...state };
    }
};
