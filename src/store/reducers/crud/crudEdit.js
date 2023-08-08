/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { showLoadingCF } from 'utils/reducerCF/showLoadingCF';

export const initialState = {
    id: null,
    isVisible: false,
    isUpdated: false,
    isError: false,
    message: '',
};

const editSuccessCF = (state, action) => ({
    isError: false,
    isVisible: false,
    isUpdated: true,
});

// const editSuccessCloseCF = (state, action) => ({
//     ...state,
//     isAdded: false,
// });

const editErrorCF = (state, action) => ({
    ...state,
    isError: true,
    message: action.message,
    isUpdated: false,
});

const editShowFormCF = (state, action) => ({
    isVisible: true,
    id: action.id,
});

const editHideFormCF = (state, action) => ({
    isVisible: false,
});

const addErrorCloseCF = (state, action) => ({
    ...state,
    isError: false,
});

export const crudEditReducer =
    ({ editActionConstants, myInitialState = initialState, additionalReducer = (state, action) => state }) =>
    (state = myInitialState, action) => {
        switch (action.type) {
            case editActionConstants.SUCCESS:
                return editSuccessCF(state, action);
            case editActionConstants.ERROR:
                return editErrorCF(state, action);
            case editActionConstants.SHOW_LOADING:
                return showLoadingCF(state, action);
            case editActionConstants.SHOW_FORM:
                return editShowFormCF(state, action);
            case editActionConstants.HIDE_FORM:
                return editHideFormCF(state, action);
            case editActionConstants.ERROR_CLOSE:
                return addErrorCloseCF(state, action);
            default:
                return additionalReducer(state, action);
        }
    };
