import { GEO_DATA_PINCODE_LOADED, GEO_PINCODE_SET_FORM_IS_VISIBLE, GEO_PINCODE_SET_FORM_DATA,  GEO_PINCODE_DATA_SHOW_LOADING } from 'store/actions/data/geo';

const initialState = {
    isLoaded: false,
    data: [],
    isFormDataLoaded: false,
    formData: undefined,
    isFormVisible: false,
    isLoading: false,
    isHistoryLoaded: false,
    historyData: [],
    isHistoryLoading: false,
    changeHistoryVisible: false,
};

export const PincodeGeo = (state = initialState, action) => {
    switch (action.type) {
        case GEO_DATA_PINCODE_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case GEO_PINCODE_SET_FORM_DATA:
            return { ...state, isFormDataLoaded: action.isFormDataLoaded, formData: action.formData };
        case GEO_PINCODE_SET_FORM_IS_VISIBLE:
            return { ...state, isFormVisible: true };
        case  GEO_PINCODE_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return { ...state };
    }
};
