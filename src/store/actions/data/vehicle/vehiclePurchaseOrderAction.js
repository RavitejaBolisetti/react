/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_SAVE_VEHICLE_PURCHASE_ORDER_DETAILS as baseURL } from 'constants/routingApi';

const PREFIX = 'VEHICLE_PURCHASE_ORDER_DETAILS_';
const moduleName = 'vehicle Purchase Order Details';

export const RECEIVE_DATA_LOADING_ACTION_CONSTANT = PREFIX + 'LOADING_DATA';
export const RECEIVE_DATA_ACTION_CONSTANT = PREFIX + 'LIST_RECIEVE_DATA';
// export const RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT = PREFIX + 'LIST_APPLY_FILTER_CONSTANT';
// export const RECEIVE_FILTERED_DATA_ACTION_CONSTANT = PREFIX + 'FILTERED_LIST_RECIEVE_DATA';
export const RECIEVE_DATA_DETAIL_ACTION_CONSTANT = PREFIX + 'RECIEVE_DETAIL_DATA';
export const SAVE_DATA_ACTION_CONSTANT = PREFIX + 'SAVE_DATA';
export const RESET_DATA_ACTION_CONSTANT = PREFIX + 'RESET_DATA';

export const saveVPODataActions = dataActions({
    baseURL,
    moduleName,
    RECEIVE_DATA_LOADING_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_CONSTANT,
    // RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT,
    // RECEIVE_FILTERED_DATA_ACTION_CONSTANT,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
    SAVE_DATA_ACTION_CONSTANT,
    RESET_DATA_ACTION_CONSTANT,
});
