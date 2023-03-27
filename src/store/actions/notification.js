export const NOTIFICATION_SHOW = 'NOTIFICATION_SHOW';
export const NOTIFICATION_HIDE = 'NOTIFICATION_HIDE';

export const showGlobalNotification = ({ notificationType = 'error', title, message }) => ({
    type: NOTIFICATION_SHOW,
    visible: true,
    notificationType,
    title,
    message,
});

export const hideGlobalNotification = (data) => ({
    type: NOTIFICATION_HIDE,
    visible: false,
});
