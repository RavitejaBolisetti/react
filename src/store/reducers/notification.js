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
            return { ...state, visible: true, notificationType: action.notificationType, title: action.title, message: action.message, placement: action.placement,showTitle: action.showTitle };
        case NOTIFICATION_HIDE:
            return { ...initialState };
        default:
            return { ...state };
    }
};
