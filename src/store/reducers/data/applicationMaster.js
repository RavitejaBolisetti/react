import { APPLICATION_MASTER_APPLICATION_DATA_SHOW_LOADING, APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED, APPLICATION_CRITICALITY_GROUP_LOADED, DEALER_LOCATIONS_LOADED, APPLICATION_MASTER_DATA_SHOW_LOADING, APPLICATION_DATA_LOADED, CONFIG_PARAM_DATA_LOADED, APPLICATION_ACTON_DATA_LOADED } from 'store/actions/data/applicationMaster';

const initialState = {
    isLoaded: false,
    isLoading: false,
    isApplicationDeatilsLoaded: false,
    applicationDetailsData: [],
    isApplicationDeatilsLoading: false,
    applicationCriticalityGroupData: [],    
};

export const ApplicationMaster = (state = initialState, action) => {
    switch (action.type) {
        case APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED:
            return { ...state, isApplicationDeatilsLoaded: action.isLoaded, applicationDetailsData: action.data };
            // criticality group ookk
        case APPLICATION_CRITICALITY_GROUP_LOADED:
            return { ...state, isCriticalityGroupLoaded: action.isLoaded, applicationCriticalityGroupData: action.data };
        case DEALER_LOCATIONS_LOADED:
            return { ...state, isDealerLocationsLoaded: action.isLoaded, dealerLocations: action.data };
        case APPLICATION_ACTON_DATA_LOADED:
            return { ...state, isActionsLoaded: action.isLoaded, actions: action.data };
        case CONFIG_PARAM_DATA_LOADED:
            return { ...state, isConfigParamsLoaded: action.isLoaded, configurableParamData: action.data };
        case APPLICATION_DATA_LOADED:
            return { ...state, isDataLoading: action.isLoading, applicationData: action.data };
        case APPLICATION_MASTER_DATA_SHOW_LOADING:
            return { ...state, isApplicationDeatilsLoading: action.isLoading };
        default:
            return { ...state };
    }
};
