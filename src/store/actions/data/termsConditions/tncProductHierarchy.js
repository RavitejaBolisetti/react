/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_TERM_CONDITION_PRODUCT_HIERARCHY } from 'constants/routingApi';

export const RECEIVE_DATA_LOADING_ACTION_CONSTANT = 'TNC_PRODUCT_HIERARCHY_LOADING_DATA';
export const RECEIVE_DATA_ACTION_CONSTANT = 'TNC_PRODUCT_HIERARCHY_LIST_RECIEVE_DATA';
export const RECEIVE_FILTERED_DATA_ACTION_CONSTANT = 'TNC_PRODUCT_HIERARCHY_FILTERED_LIST_RECIEVE_DATA';
export const RECIEVE_DATA_DETAIL_ACTION_CONSTANT = 'TNC_PRODUCT_HIERARCHY_RECIEVE_DETAIL_DATA';
export const SAVE_DATA_ACTION_CONSTANT = 'TNC_PRODUCT_HIERARCHY_SAVE_DATA';
export const RESET_DATA_ACTION_CONSTANT = 'TNC_PRODUCT_HIERARCHY_RESET_DATA';

const baseURL = BASE_URL_TERM_CONDITION_PRODUCT_HIERARCHY;

export const tncProductHierarchyDataActions = dataActions({
    baseURL,
    moduleName: 'Terms Conditions',
    RECEIVE_DATA_LOADING_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_CONSTANT,
    RECEIVE_FILTERED_DATA_ACTION_CONSTANT,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
    SAVE_DATA_ACTION_CONSTANT,
    RESET_DATA_ACTION_CONSTANT,
});
