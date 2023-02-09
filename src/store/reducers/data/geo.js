import { GEO_DATA_LOADED, GEO_SET_FORM_DATA, GEO_DATA_SHOW_LOADING } from 'store/actions/data/geo';

const initialState = {
    isLoaded: false,
    data: [],
    isFormDataLoaded: false,
    formData: undefined,
    isLoading: false,
};

export const Geo = (state = initialState, action) => {
    console.log("🚀 ~ file: geo.js:12 ~ Geo ~ action", action)
    switch (action.type) {
        case GEO_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case GEO_SET_FORM_DATA:
            return { ...state, isFormDataLoaded: action.isFormDataLoaded, formData: action.formData };
        case GEO_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return { ...state };
    }
};
