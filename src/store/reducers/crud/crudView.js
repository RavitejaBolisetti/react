/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const initialState = {
    id: null,
    isVisible: false,
};
const viewShowModalCF = (state, action) => ({
    isVisible: true,
    id: action.id,
});

const viewHideModalCF = (state, action) => ({
    isVisible: false,
});

export const crudViewReducer =
    (viewActionConstants, myInitialState = initialState) =>
    (state = myInitialState, action) => {
        switch (action.type) {
            case viewActionConstants.SHOW_MODAL:
                return viewShowModalCF(state, action);
            case viewActionConstants.HIDE_MODAL:
                return viewHideModalCF(state, action);
            default:
                return state;
        }
    };
