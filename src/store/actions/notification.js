/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const NOTIFICATION_SHOW = 'NOTIFICATION_SHOW';
export const NOTIFICATION_HIDE = 'NOTIFICATION_HIDE';

export const showGlobalNotification = ({ notificationType = 'error', title, message, placement, showTitle, duration, backdrop }) => ({
    type: NOTIFICATION_SHOW,
    visible: true,
    notificationType,
    title,
    message,
    placement,
    showTitle,
    duration,
    backdrop,
});

export const hideGlobalNotification = (data) => ({
    type: NOTIFICATION_HIDE,
    visible: false,
    backdrop: false
});
