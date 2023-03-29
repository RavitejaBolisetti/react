import { UPDATE_PASSWORD_LOADED, UPDATE_PASSWORD_SHOW_LOADING } from 'store/actions/data/updatePassword';

const initialState = {
    isLoaded: false,
    data: [],
    isLoading: false,
};

export const UpdatePassword = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case UPDATE_PASSWORD_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return { ...state };
    }
};
