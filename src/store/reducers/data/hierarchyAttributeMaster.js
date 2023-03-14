import { HIERARCHY_ATTRIBUTE_MASTER_DATA_LOADED, HIERARCHY_ATTRIBUTE_MASTER_DATA_SHOW_LOADING, HIERARCHY_ATTRIBUTE_MASTER_DETAIL_DATA_LOADED } from 'store/actions/data/hierarchyAttributeMaster';

const initialState = {
    isLoaded: false,
    data: [],
    isLoading: false,
};

export const HierarchyAttributeMaster = (state = initialState, action) => {
    switch (action.type) {
        case HIERARCHY_ATTRIBUTE_MASTER_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action?.data?.hierarchyAttribute || action?.data };
        case HIERARCHY_ATTRIBUTE_MASTER_DETAIL_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, detailData: action?.data };
        case HIERARCHY_ATTRIBUTE_MASTER_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return { ...state };
    }
};
