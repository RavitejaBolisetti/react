import { HIERARCHY_ATTRIBUTE_MASTER_DATA_LOADED, HIERARCHY_ATTRIBUTE_MASTER_DATA_SHOW_LOADING, HIERARCHY_ATTRIBUTE_MASTER_DETAIL_DATA_LOADED, HIERARCHY_ATTRIBUTE_MASTER_DETAIL_DATA_SHOW_LOADING, HIERARCHY_ATTRIBUTE_ON_SAVE_DATA_SHOW_LOADING } from 'store/actions/data/hierarchyAttributeMaster';

const initialState = {
    isLoaded: false,
    data: [],
    isLoading: false,
    isDataLoading: false,
    isLoadingOnSave: false,
};

export const HierarchyAttributeMaster = (state = initialState, action) => {
    switch (action.type) {
        case HIERARCHY_ATTRIBUTE_MASTER_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action?.data?.hierarchyAttribute || action?.data };
        case HIERARCHY_ATTRIBUTE_MASTER_DETAIL_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, detailData: action?.data };
        case HIERARCHY_ATTRIBUTE_MASTER_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        case HIERARCHY_ATTRIBUTE_MASTER_DETAIL_DATA_SHOW_LOADING:
            return { ...state, isDataLoading: action.isLoading };
        case HIERARCHY_ATTRIBUTE_ON_SAVE_DATA_SHOW_LOADING:
            return { ...state, isLoadingOnSave: action.isLoading };
        default:
            return { ...state };
    }
};
