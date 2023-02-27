import { CHANGE_PASSWORD_LOADED, CHANGE_PASSWORD_SHOW_LOADING } from 'store/actions/data/changePassword';

const initialState = {
    isLoaded: false,
    data: [],
    isLoading: false,
};

export const ChangePassword = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case CHANGE_PASSWORD_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return { ...state };
    }
};
