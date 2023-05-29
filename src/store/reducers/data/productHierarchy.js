import { PRODUCT_HIERARCHY_DATA_LOADED, PRODUCT_HIERARCHY_DATA_LOADED_SKU, PRODUCT_HIERARCHY_DATA_SHOW_LOADING, PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED, PRODUCT_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING, PRODUCT_HIERARCHY_CHANGE_HISTORY_VISIBLE, PRODUCT_HIERARCHY_CARD_BTN_DISABLE, PRODUCT_HIERARCHY_ATTRIBUTE_NAME_DROPDOWN, PRODUCT_HIERARCHY_SELECTED_ORGANIZATION_ID, PRODUCT_HIERARCHY_RESET_DATA } from 'store/actions/data/productHierarchy';

const initialState = {
    isLoaded: false,
    data: [],
    isSkuLoaded: false,
    skudata: [],
    isLoading: false,
    isHistoryLoaded: false,
    historyData: [],
    isHistoryLoading: false,
    changeHistoryVisible: false,
    actionVisible: false,
    organizationId: false,
};

export const ProductHierarchy = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_HIERARCHY_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case PRODUCT_HIERARCHY_DATA_LOADED_SKU:
            return { ...state, isSkuLoaded: action.isLoaded, skudata: action.data };
        case PRODUCT_HIERARCHY_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        case PRODUCT_HIERARCHY_CHANGE_HISTORY_DATA_LOADED:
            return { ...state, isHistoryLoaded: action.isLoaded, historyData: action.data };
        case PRODUCT_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING:
            return { ...state, isHistoryLoading: action.isLoading };
        case PRODUCT_HIERARCHY_CHANGE_HISTORY_VISIBLE:
            return { ...state, changeHistoryVisible: action.visible };
        case PRODUCT_HIERARCHY_CARD_BTN_DISABLE:
            return { ...state, actionVisible: action.isDisable };
        case PRODUCT_HIERARCHY_ATTRIBUTE_NAME_DROPDOWN:
            return { ...state, isLoaded: action.isLoaded, attributeData: action.data };
        case PRODUCT_HIERARCHY_SELECTED_ORGANIZATION_ID:
            return { ...state, organizationId: action.organizationId };
        case PRODUCT_HIERARCHY_RESET_DATA:
            return { ...initialState };
        default:
            return { ...state };
    }
};
