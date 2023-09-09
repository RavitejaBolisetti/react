/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { NOTIFICATION_SHOW, NOTIFICATION_HIDE } from 'store/actions/notification';

const initialState = {
    visible: false,
    showTitle: true,
    notificationType: 'error',
    title: 'ERROR',
    message: null,
    placement: null,
};

export const notification = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATION_SHOW:
            return { ...state, visible: true, notificationType: action.notificationType, title: action.title, message: action.message, placement: action.placement, showTitle: action.showTitle };
        case NOTIFICATION_HIDE:
            return { ...initialState };
        default:
            return { ...state };
    }
};
