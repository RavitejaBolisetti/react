import { HEADER_USER_DATA_LOADED, HEADER_USER_DATA_SHOW_LOADING } from 'store/actions/common/header';

const initialState = {
    isLoaded: false,
    data: [],
    isLoading: false,
};

export const Header = (state = initialState, action) => {
    switch (action.type) {
        case HEADER_USER_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case HEADER_USER_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return { ...state };
    }
};