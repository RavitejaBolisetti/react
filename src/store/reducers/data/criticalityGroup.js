import { CRITICALITY_DATA_LOADED, CRITICALITY_SET_FORM_DATA, CRITICALITY_SET_FORM_IS_VISIBLE, CRITICALITY_DATA_SHOW_LOADING } from 'store/actions/data/criticalityGroup';

const initialState = {
    isLoaded: false,
    data: [],
    isFormDataLoaded: false,
    formData: {
        id: '1',
        criticalityGroupId: 'AB234',
        criticalityGroupName: 'hola',
        defaultGroup:'Y',
        Status:'N'
    },
    isFormVisible: false,
    isLoading: false,
};

export const criticalityGroup = (state = initialState, action) => {
    switch (action.type) {
        case CRITICALITY_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case CRITICALITY_SET_FORM_DATA:
            return { ...state, isFormDataLoaded: action.isFormDataLoaded, formData: action.formData };
        case CRITICALITY_SET_FORM_IS_VISIBLE:
            return { ...state, isFormVisible: true };
        case CRITICALITY_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return { ...state };
    }
};
