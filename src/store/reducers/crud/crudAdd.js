/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { showLoadingCF } from 'utils/reducerCF/showLoadingCF';

export const initialState = {
    isLoading: false,
    isVisible: false,
    isError: false,
    isAdded: false,
    message: '',
    data: null,
};

const addSuccessCF = (state, action) => ({
    isError: false,
    isAdded: true,
    message: action.message,
    isVisible: action.isFormShown,
    data: action.data,
});

const addSuccessCloseCF = (state, action) => ({
    ...state,
    isAdded: false,
});

const addErrorCF = (state, action) => ({
    isError: true,
    isAdded: false,
    isVisible: true,
    message: action.message,
});

const addErrorCloseCF = (state, action) => ({
    ...state,
    isError: false,
});

const addShowFormCF = (state, action) => ({
    isAdded: false,
    isError: false,
    isVisible: true,
    message: action.message,
});

const addHideFormCF = (state, action) => ({
    isAdded: false,
    isError: false,
    isVisible: false,
    message: action.message,
});

export const crudAddReducer =
    (addActionConstants, myInitialState = initialState) =>
    (state = myInitialState, action) => {
        switch (action.type) {
            case addActionConstants.SUCCESS:
                return addSuccessCF(state, action);

            case addActionConstants.ERROR:
                return addErrorCF(state, action);

            case addActionConstants.SHOW_FORM:
                return addShowFormCF(state, action);

            case addActionConstants.HIDE_FORM:
                return addHideFormCF(state, action);

            case addActionConstants.SHOW_LOADING:
                return showLoadingCF(state, action);

            case addActionConstants.SUCCESS_CLOSE:
                return addSuccessCloseCF(state, action);

            case addActionConstants.ERROR_CLOSE:
                return addErrorCloseCF(state, action);

            default:
                return state;
        }
    };
