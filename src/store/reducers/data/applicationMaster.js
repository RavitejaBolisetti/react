/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED, APPLICATION_CRITICALITY_GROUP_LOADED, DEALER_LOCATIONS_LOADED, APPLICATION_MASTER_DATA_SHOW_LOADING, APPLICATION_DATA_LOADED, CONFIG_PARAM_DATA_LOADED, APPLICATION_ACTON_DATA_LOADED, APPLICATION_ON_SAVE_DATA_SHOW_LOADING, APPLICATION_MASTER_DETAIL_DATA_SHOW_LOADING, APPLICATION_LOCATION_DATA, RESET_DEALER_LOCATIONS } from 'store/actions/data/applicationMaster';

const initialState = {
    isLoaded: false,
    isLoading: false,
    applicationDetailsData: [],
    isApplicationDeatilsLoading: false,
    applicationCriticalityGroupData: [],
    isApplicatinoOnSaveLoading: false,
    isLocationsLoading: false,
    isActionsLoading: false,
    isConfigParamsLoading: false,
};

export const ApplicationMaster = (state = initialState, action) => {
    switch (action.type) {
        case APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED:
            return { ...state, isApplicationDeatilsLoading: action.isLoaded, applicationDetailsData: action.data };
        case APPLICATION_CRITICALITY_GROUP_LOADED:
            return { ...state, isactionsLoaded: action.isLoaded, applicationCriticalityGroupData: action.data };
        case DEALER_LOCATIONS_LOADED:
            return { ...state, isLocationsLoading: action.isLoaded, dealerLocations: action.data };
        case APPLICATION_ACTON_DATA_LOADED:
            return { ...state, isActionsLoading: action.isLoaded, actions: action.data };
        case CONFIG_PARAM_DATA_LOADED:
            return { ...state, isConfigParamsLoading: action.isLoaded, configurableParamData: action.data };
        case APPLICATION_DATA_LOADED:
            return { ...state, isLoading: action.isLoading, applicationData: action.data };
        case APPLICATION_MASTER_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        case APPLICATION_ON_SAVE_DATA_SHOW_LOADING:
            return { ...state, isApplicatinoOnSaveLoading: action.isSaveLoading };
        case APPLICATION_LOCATION_DATA:
            return { ...state, isLocationsLoading: action.isLoading };
        case APPLICATION_MASTER_DETAIL_DATA_SHOW_LOADING:
            return { ...state, isApplicationDeatilsLoading: action.isLoading };
        case RESET_DEALER_LOCATIONS:
            return { ...state, dealerLocations: [] };
        default:
            return { ...state };
    }
};
