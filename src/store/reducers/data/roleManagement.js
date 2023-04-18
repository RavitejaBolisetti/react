import { ROLE_MANAGEMENT_DATA_LOADED, ROLE_MANAGEMENT_SET_FORM_IS_VISIBLE, ROLE_MANAGEMENT_SET_FORM_DATA, ROLE_MANAGEMENT_DATA_SHOW_LOADING, MENU_DATA_LOADED, ROLE_MANAGEMENT_ROLES } from 'store/actions/data/roleManagement';

const initialState = {
    isLoaded: false,
    data: [],
    isFormDataLoaded: false,
    formData: undefined,
    isFormVisible: false,
    isLoading: false,
};

export const RoleManagement = (state = initialState, action) => {
    switch (action.type) {
        case ROLE_MANAGEMENT_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case ROLE_MANAGEMENT_SET_FORM_DATA:
            return { ...state, isFormDataLoaded: action.isFormDataLoaded, formData: action.formData };
        case ROLE_MANAGEMENT_SET_FORM_IS_VISIBLE:
            return { ...state, isFormVisible: true };
        case ROLE_MANAGEMENT_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        case MENU_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, MenuTreeData: action.data };
        case ROLE_MANAGEMENT_ROLES:
            return { ...state, isLoaded: action.isLoaded, RoleData: action.data };
        default:
            return { ...state };
    }
};
