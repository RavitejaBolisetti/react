/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const viewActionConstants = (prefix) => ({
    SHOW_MODAL: prefix + 'VIEW_SHOW_MODAL',
    HIDE_MODAL: prefix + 'VIEW_HIDE_MODAL',
});

export const viewActions = (viewActionConstants) => ({
    showModal: (id) => ({
        type: viewActionConstants.SHOW_MODAL,
        id,
    }),
    hideModal: () => ({
        type: viewActionConstants.HIDE_MODAL,
    }),
});
