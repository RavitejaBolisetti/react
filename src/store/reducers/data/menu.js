import { MENU_DATA_LOADED, MENU_DATA_FILTER, MENU_DATA_SHOW_LOADING } from 'store/actions/data/menu';

const initialState = {
    isLoaded: false,
    data: [],
    filter: undefined,
    isLoading: false,
};

export const Menu = (state = initialState, action) => {
    switch (action.type) {
        case MENU_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case MENU_DATA_FILTER:
            return { ...state, filter: action.filter };
        case MENU_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return { ...state };
    }
};
