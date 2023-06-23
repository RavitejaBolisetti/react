/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_CUSTOMER_MASTER_ADDRESS_CORPORATE as baseURL } from 'constants/routingApi';

const PREFIX = 'CUSTOMER_MASTER_ADDRESS_INDIVIDUAL_';
const moduleName = 'Address Individual';

export const RECEIVE_DATA_LOADING_ACTION_CONSTANT = PREFIX + 'LOADING_DATA';
export const RECEIVE_DATA_ACTION_CONSTANT = PREFIX + 'LIST_RECIEVE_DATA';
export const RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT = PREFIX + 'LIST_APPLY_FILTER_CONSTANT';
export const RECIEVE_DATA_DETAIL_ACTION_CONSTANT = PREFIX + 'RECIEVE_DETAIL_DATA';
export const SAVE_DATA_ACTION_CONSTANT = PREFIX + 'SAVE_DATA';
export const RESET_DATA_ACTION_CONSTANT = PREFIX + 'RESET_DATA';

export const addressCorporateDataActions = dataActions({
    baseURL,
    moduleName,
    RECEIVE_DATA_LOADING_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
    SAVE_DATA_ACTION_CONSTANT,
    RESET_DATA_ACTION_CONSTANT,
});
