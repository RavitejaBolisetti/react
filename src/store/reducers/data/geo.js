import { GEO_DATA_LOADED, GEO_DATA_SHOW_LOADING } from 'store/actions/data/geo';

const initialState = {
    isLoaded: false,
    data: [],
    isLoading: false,
};

export const Geo = (state = initialState, action) => {
    switch (action.type) {
        case GEO_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case GEO_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return { ...state };
    }
};
