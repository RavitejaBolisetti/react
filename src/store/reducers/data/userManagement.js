/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { USER_MANAGEMENT_DEALER_DATA_LOADED, USER_MANAGEMENT_DEALER_DATA_SHOW_LOADING, USER_MANAGEMENT_DEALER_SET_FORM_IS_VISIBLE, USER_MANAGEMENT_DEALER_SET_FORM_DATA, USER_MANAGEMENT_MANUFACTURER_DATA_LOADED } from 'store/actions/data/userManagement';

const initialState = {
    isLoaded: false,
    data: [],
    isFormDataLoaded: false,
    formData: undefined,
    isFormVisible: false,
    isLoading: false,
};

export const UserManagement = (state = initialState, action) => {
    switch (action.type) {
        case USER_MANAGEMENT_DEALER_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data };
        case USER_MANAGEMENT_DEALER_SET_FORM_DATA:
            return { ...state, isFormDataLoaded: action.isFormDataLoaded, formData: action.formData };
        case USER_MANAGEMENT_DEALER_SET_FORM_IS_VISIBLE:
            return { ...state, isFormVisible: true };
        case USER_MANAGEMENT_DEALER_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        case USER_MANAGEMENT_MANUFACTURER_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, ManufacturerData: action.data };

        default:
            return { ...state };
    }
};
