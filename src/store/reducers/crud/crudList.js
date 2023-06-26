/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { showLoadingCF } from 'utils/reducerCF/showLoadingCF';

export const initialState = {
    isError: false,
    isLoading: false,
    filterString: '',
    selectedData: undefined,
    message: '',
    isDeleteLoading: false,
    isModalShown: false,
    isCustomeModalShown: false,
    isCardModalShown: false,
};

const fetchErrorCF = (state, action) => ({
    ...state,
    isError: true,
    message: action.message,
});

const setFilterStringCF = (state, action) => ({
    ...state,
    filterString: action.filterString,
});

const setFilterDataCF = (state, action) => ({
    ...state,
    additionalFilterValues: action.additionalFilterValues,
});

export const crudListReducer =
    (listActionConstants, myInitialState = initialState) =>
    (state = myInitialState, action) => {
        switch (action.type) {
            case listActionConstants.SHOW_LOADING:
                return showLoadingCF(state, action);
            case listActionConstants.FETCH_ERROR:
                return fetchErrorCF(state, action);
            case listActionConstants.SET_FILTER_STRING:
                return setFilterStringCF(state, action);
            case listActionConstants.SET_FILTER_VALUES:
                return setFilterDataCF(state, action);
            default:
                return state;
        }
    };
