import { CONFIG_PARAM_EDIT_DATA_LOADED, CONFIG_PARAM_EDIT__DATA_SHOW_LOADING } from 'store/actions/data/configParamEditing';

const initialState = {
    isLoaded: false,
    data: [],
    isLoading: false,
};

export const ConfigurableParameterEditing = (state = initialState, action) => {
    switch (action.type) {
        case CONFIG_PARAM_EDIT_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case CONFIG_PARAM_EDIT__DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return { ...state };
    }
};
