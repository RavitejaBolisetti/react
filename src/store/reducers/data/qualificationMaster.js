import { QUALIFICATION_DATA_LOADED, QUALIFICATION_SET_FORM_DATA, QUALIFICATION_SET_FORM_IS_VISIBLE, QUALIFICATION_DATA_SHOW_LOADING, QUALIFICATION_DATA_ON_SAVE_SHOW_LOADING } from 'store/actions/data/qualificationMaster';

const initialState = {
    isLoaded: false,
    data: [],
    isFormDataLoaded: false,
    formData: undefined,
    isFormVisible: false,
    isLoading: false,
    isLoadingOnSave: false,
};

export const QualificationMaster = (state = initialState, action) => {
    switch (action.type) {
        case QUALIFICATION_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, qualificationData: action.data };
        case QUALIFICATION_SET_FORM_DATA:
            return { ...state, isFormDataLoaded: action.isFormDataLoaded, formData: action.formData };
        case QUALIFICATION_SET_FORM_IS_VISIBLE:
            return { ...state, isFormVisible: true };
        case QUALIFICATION_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        case QUALIFICATION_DATA_ON_SAVE_SHOW_LOADING:
            return { ...state, isLoadingOnSave: action.isLoading };
        default:
            return { ...state };
    }
};
