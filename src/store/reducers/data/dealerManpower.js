import { DEALER_MANPOWER_DATA_LOADED, DEALER_MANPOWER_SET_FORM_DATA, DEALER_MANPOWER_SET_FORM_VISIBLE, DEALER_MANPOWER_DATA_SHOW_LOADING } from 'store/actions/data/dealerManpower';

const initialState = {
    isLoaded: false,
    data: [],
    isFormDataLoaded: false,
    formData: undefined,
    isFormVisible: false,
    isLoading: false,
};

export const dealerManpower = (state = initialState, action) => {
    switch (action.type) {
        case DEALER_MANPOWER_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case DEALER_MANPOWER_SET_FORM_DATA:
            return { ...state, isFormDataLoaded: action.isFormDataLoaded, formData: action.formData };
        case DEALER_MANPOWER_SET_FORM_VISIBLE:
            return { ...state, isFormVisible: true };
        case DEALER_MANPOWER_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return { ...state };
    }
};
