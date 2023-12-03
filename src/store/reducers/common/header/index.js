/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { HEADER_USER_DATA_LOADED, HEADER_USER_DATA_SHOW_LOADING, HEADER_USER_DATA_CLEAR } from 'store/actions/common/header';

const initialState = {
    isLoaded: false,
    data: [],
    isLoading: false,
};

export const Header = (state = initialState, action) => {
    switch (action.type) {
        case HEADER_USER_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: action.data, dealerLocationId: action?.data?.dealerLocations?.find((i) => i?.isDefault)?.locationId };
        case HEADER_USER_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        case HEADER_USER_DATA_CLEAR:
            return { ...initialState };
        default:
            return { ...state };
    }
};
