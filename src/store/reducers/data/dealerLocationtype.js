import { DEALERLOCATION_DATA_LOADED, DEALERLOCATION_SET_FORM_DATA, DEALERLOCATION_SET_FORM_IS_VISIBLE, DEALERLOCATION_DATA_SHOW_LOADING, DEALERLOCATION_DATA_ON_SAVE_SHOW_LOADING } from 'store/actions/data/dealerLocationType';

const initialState = {
    isLoaded: false,
    data: [],
    isFormDataLoaded: false,
    formData: undefined,
    isFormVisible: false,
    isLoading: false,
    isLoadingOnSave: false,
};

export const DealerLocationType = (state = initialState, action) => {
    switch (action.type) {
        case DEALERLOCATION_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, dealerlocationData: action.data };
        case DEALERLOCATION_SET_FORM_DATA:
            return { ...state, isFormDataLoaded: action.isFormDataLoaded, formData: action.formData };
        case DEALERLOCATION_SET_FORM_IS_VISIBLE:
            return { ...state, isFormVisible: true };
        case DEALERLOCATION_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        case DEALERLOCATION_DATA_ON_SAVE_SHOW_LOADING:
            return { ...state, isLoadingOnSave: action.isLoading };
        default:
            return { ...state };
    }
};
