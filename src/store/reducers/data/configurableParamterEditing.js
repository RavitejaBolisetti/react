import {CONFIG_PARAM_EDIT_SHOW_LOADING_ON_SAVE, CONFIG_PARAM_EDIT_DATA_LOADED, CONFIG_PARAM_EDIT_DATA_SHOW_LOADING, CONFIG_PARAM_EDIT_SHOW_LOADING, CONFIG_PARAM_DATA_LOADED } from 'store/actions/data/configurableParamterEditing';

const initialState = {
    isLoaded: false,
    data: [],
    paramdata: [],
    isParamLoaded: false,
    isParamLoading: false,
    isLoading: false,
    isLoadingOnSave: false,
};

export const ConfigurableParameterEditing = (state = initialState, action) => {
    switch (action.type) {
        case CONFIG_PARAM_EDIT_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case CONFIG_PARAM_DATA_LOADED:
            return { ...state, isParamLoaded: action.isLoaded, paramdata: { ...state.paramdata, [action.parameterType]: action.data } };
        case CONFIG_PARAM_EDIT_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        case CONFIG_PARAM_EDIT_SHOW_LOADING:
            return { ...state, isParamLoading: action.isLoading };
            case CONFIG_PARAM_EDIT_SHOW_LOADING_ON_SAVE:
                return { ...state, isLoadingOnSave: action.isLoading };
        default:
            return { ...state };
    }
};
