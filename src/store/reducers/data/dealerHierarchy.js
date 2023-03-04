import { DEALER_HIERARCHY_DATA_LOADED, DEALER_HIERARCHY_DATA_SHOW_LOADING, DEALER_HIERARCHY_SET_FORM_DATA,DEALER_HIERARCHY_SET_FORM_IS_VISIBLE, } from 'store/actions/data/';

const initialState = {
    isLoaded: false,
    data: [],
    isLoading: false,
    isHistoryLoaded: false,
    historyData: [],
    isHistoryLoading: false,
};

export const ManufacturerAdminHierarchy = (state = initialState, action) => {
    switch (action.type) {
        case DEALER_HIERARCHY_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case DEALER_HIERARCHY_SET_FORM_DATA:
            return { ...state, isFormDataLoaded: action.isFormDataLoaded, formData: action.formData };
        case DEALER_HIERARCHY_SET_FORM_IS_VISIBLE:
            return { ...state, isFormVisible: true };
        case DEALER_HIERARCHY_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return { ...state };
    }
};
