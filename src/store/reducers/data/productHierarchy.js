import { PRODUCT_HIERARCHY_DATA_LOADED, PRODUCT_HIERARCHY_DATA_SHOW_LOADING, PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED, PRODUCT_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING } from 'store/actions/data/productHierarchy';

const initialState = {
    isLoaded: false,
    data: [],
    isLoading: false,
    isHistoryLoaded: false,
    historyData: [],
    isHistoryLoading: false,
};

export const ProductHierarchy = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_HIERARCHY_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case PRODUCT_HIERARCHY_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        case PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED:
            return { ...state, isHistoryLoaded: action.isLoaded, historyData: action.data };
        case PRODUCT_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING:
            return { ...state, isHistoryLoading: action.isLoading };
        default:
            return { ...state };
    }
};
