import { APPLICATION_MASTER_APPLICATION_DATA_SHOW_LOADING, APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED } from 'store/actions/data/applicationMaster';

const initialState = {
    isLoaded: false,
    // data: [],
    isLoading: false,
    isApplicationDeatilsLoaded: false,
    applicationDetailsData: [],
    isApplicationDeatilsLoading: false,
};

export const ApplicationMaster = (state = initialState, action) => {
    switch (action.type) {
        case APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED:
            return { ...state, isApplicationDeatilsLoaded: action.isLoaded, applicationDetailsData: action.data };
        case APPLICATION_MASTER_APPLICATION_DATA_SHOW_LOADING:
            return { ...state, isApplicationDeatilsLoading: action.isLoading };
        default:
            return { ...state };
    }
};
