import {
    MANUFACTURER_ADMIN_HIERARCHY_DATA_LOADED,
    MANUFACTURER_ADMIN_HIERARCHY_DATA_SHOW_LOADING,
    MANUFACTURER_ADMIN_HIERARCHY_DETAIL_DATA_LOADED,
    MANUFACTURER_ADMIN_HIERARCHY_DETAIL_DATA_SHOW_LOADING,
    MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_DATA_LOADED,
    MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_SHOW_LOADING,
    MANUFACTURER_ADMIN_HIERARCHY_SET_FORM_DATA,
    MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_VISIBLE,
    MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_DATA_LOADED,
    MANUFACTURER_ADMIN_HIERARCHY_SET_FORM_IS_VISIBLE,
    MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING,
    MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_VISIBLE,
    MANUFACTURER_ADMIN_HIERARCHY_UPLOAD_VISIBLE,
    MANUFACTURER_ADMIN_HIERARCHY_SEARCH_DATA_LOADED,
    MANUFACTURER_AUTHORITY_HIERARCHY_DROPDOWN,
    CARD_BTN_DISABLE,
    ON_ERROR_TOKEN_VALIDATION,
} from 'store/actions/data/manufacturerAdminHierarchy';

const initialState = {
    isLoaded: false,
    data: [],
    isLoading: false,
    isDetailLoaded: false,
    detailData: [],
    isDetailLoading: false,
    isHistoryLoaded: false,
    historyData: [],
    isHistoryLoading: false,
    changeHistoryVisible: false,
    changeHistoryAuthorityVisible: false,
    uploadVisible: false,
    authorityVisible: true,
    recordId: '',
};

export const ManufacturerAdminHierarchy = (state = initialState, action) => {
    switch (action.type) {
        case MANUFACTURER_ADMIN_HIERARCHY_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };

        case MANUFACTURER_ADMIN_HIERARCHY_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };

        case MANUFACTURER_ADMIN_HIERARCHY_DETAIL_DATA_LOADED:
            return { ...state, isDetailLoaded: action.isDetailLoaded, detailData: action.data };

        case MANUFACTURER_ADMIN_HIERARCHY_DETAIL_DATA_SHOW_LOADING:
            return { ...state, isDetailLoading: action.isLoading };

        case MANUFACTURER_ADMIN_HIERARCHY_SET_FORM_DATA:
            return { ...state, isFormDataLoaded: action.isFormDataLoaded, formData: action.formData };

        case MANUFACTURER_ADMIN_HIERARCHY_SET_FORM_IS_VISIBLE:
            return { ...state, isFormVisible: true };

        case MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_VISIBLE:
            return { ...state, changeHistoryVisible: action.visible };

        case MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_VISIBLE:
            return { ...state, changeHistoryAuthorityVisible: action.visible };

        case MANUFACTURER_ADMIN_HIERARCHY_UPLOAD_VISIBLE:
            return { ...state, uploadVisible: action.visible };

        case CARD_BTN_DISABLE:
            return { ...state, authorityVisible: action.isDisable };

        case MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_DATA_LOADED:
            return { ...state, isHistoryLoaded: action.isLoaded, historyData: action.data };

        case MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING:
            return { ...state, isHistoryLoading: action.isLoading };

        case MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_DATA_LOADED:
            return { ...state, isHistoryLoaded: action.isLoaded, authHistoryData: action.data };

        case MANUFACTURER_ADMIN_HIERARCHY_SEARCH_DATA_LOADED:
            return { ...state, isHistoryLoaded: action.isLoaded, tokenNumber: action.data, errorMessage: '', recordId: action.id };

        case ON_ERROR_TOKEN_VALIDATION:
            return { ...state, isHistoryLoaded: action.isLoaded, tokenNumber: [], isUpdating: action?.isUpdating, errorMessage: action?.data, recordId: action?.id };

        case MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY_SHOW_LOADING:
            return { ...state, isHistoryLoading: action.isLoading };

        case MANUFACTURER_AUTHORITY_HIERARCHY_DROPDOWN:
            return { ...state, authTypeDropdown: action.data };
        default:
            return { ...state };
    }
};
