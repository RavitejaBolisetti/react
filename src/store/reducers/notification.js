import { NOTIFICATION_SHOW, NOTIFICATION_HIDE } from 'store/actions/notification';

const initialState = {
    visible: false,
    notificationType: 'error',
    title: 'Information',
    message: null,
};

export const notification = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATION_SHOW:
            return { ...state, visible: true, notificationType: action.notificationType, title: action.title, message: action.message };
        case NOTIFICATION_HIDE:
            return { ...initialState };
        default:
            return { ...state };
    }
};
