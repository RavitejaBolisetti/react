import { MANUFACTURER_ORG_HIERARCHY_DATA_LOADED, MANUFACTURER_ORG_HIERARCHY_SET_FORM_IS_VISIBLE, MANUFACTURER_ORG_HIERARCHY_SET_FORM_DATA, MANUFACTURER_ORG_HIERARCHY_DATA_SHOW_LOADING } from 'store/actions/data/manufacturerOrgHierarchy';

const initialState = {
    isLoaded: false,
    data: [],
    isFormDataLoaded: false,
    formData: undefined,
    isFormVisible: false,
    isLoading: false,
};

export const ManufacturerOrgHierarchy = (state = initialState, action) => {
    switch (action.type) {
        case MANUFACTURER_ORG_HIERARCHY_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case MANUFACTURER_ORG_HIERARCHY_SET_FORM_DATA:
            return { ...state, isFormDataLoaded: action.isFormDataLoaded, formData: action.formData };
        case MANUFACTURER_ORG_HIERARCHY_SET_FORM_IS_VISIBLE:
            return { ...state, isFormVisible: true };
        case MANUFACTURER_ORG_HIERARCHY_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return { ...state };
    }
};
