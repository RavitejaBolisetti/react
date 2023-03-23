import { APPLICATION_MASTER_APPLICATION_DATA_SHOW_LOADING, APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED, APPLICATION_CRITICALITY_GROUP_LOADED, DEALER_LOCATIONS_LOADED, APPLICATION_MASTER_DATA_SHOW_LOADING } from 'store/actions/data/applicationMaster';

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
        case APPLICATION_CRITICALITY_GROUP_LOADED:
            return { ...state, isCriticalityGroupLoaded: action.isLoaded, applicationCriticalityGroupData: action.data };
        case DEALER_LOCATIONS_LOADED:
            return { ...state, isDealerLocationsLoaded: action.isLoaded, dealerLocations: action.data };
        case APPLICATION_MASTER_DATA_SHOW_LOADING:
            return { ...state, isApplicationDeatilsLoading: action.isLoading };
        default:
            return { ...state };
    }
};
