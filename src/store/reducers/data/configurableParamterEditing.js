/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { CONFIG_PARAM_EDIT_SHOW_LOADING_ON_SAVE, CONFIG_PARAM_EDIT_DATA_LOADED, CONFIG_PARAM_DATA_FILTERED_DATA_LOADED, CONFIG_PARAM_EDIT_DATA_SHOW_LOADING, CONFIG_PARAM_EDIT_SHOW_LOADING, CONFIG_PARAM_DATA_LOADED } from 'store/actions/data/configurableParamterEditing';

const initialState = {
    isLoaded: false,
    data: [],
    isFilteredListLoaded: false,
    filteredListData: [],
    paramdata: [],
    isParamLoaded: false,
    isParamLoading: false,
    isLoading: false,
    isLoadingOnSave: false,
};

export const ConfigurableParameterEditing = (state = initialState, action) => {
    switch (action.type) {
        case CONFIG_PARAM_EDIT_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case CONFIG_PARAM_DATA_FILTERED_DATA_LOADED:
            return { ...state, isFilteredListLoaded: action.isLoaded, filteredListData: buildObject(action.data) };
        case CONFIG_PARAM_DATA_LOADED:
            return { ...state, isParamLoaded: action.isLoaded, paramdata: { ...state.paramdata, [action.parameterType]: action.data } };
        case CONFIG_PARAM_EDIT_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        case CONFIG_PARAM_EDIT_SHOW_LOADING:
            return { ...state, isParamLoading: action.isLoading };
        case CONFIG_PARAM_EDIT_SHOW_LOADING_ON_SAVE:
            return { ...state, isLoadingOnSave: action.isLoading };
        default:
            return { ...state };
    }
};

const buildObject = (arr) => {
    const obj = [];
    const unique = [...new Set(arr.map((item) => item.parentKey))];
    for (let i = 0; i < unique.length; i++) {
        obj[unique[i].trim()] = arr?.filter((item) => item.parentKey === unique[i]);
    }
    return obj;
};
