/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_INDIVIDUAL_NAME_CHANGE_REQUEST } from 'constants/routingApi';

export const RECEIVE_DATA_LOADING_ACTION_CONSTANT = 'NAME_FETCH_CHANGE_HISTORY_LOADING_DATA';
export const RECEIVE_DATA_ACTION_CONSTANT = 'NAME_FETCH_CHANGE_HISTORY_LIST_RECIEVE_DATA';
export const RECIEVE_DATA_DETAIL_ACTION_CONSTANT = 'NAME_FETCH_CHANGE_HISTORY_RECIEVE_DETAIL_DATA';
export const SAVE_DATA_ACTION_CONSTANT = 'NAME_FETCH_CHANGE_HISTORY_SAVE_DATA';
export const RESET_DATA_ACTION_CONSTANT = 'NAME_FETCH_CHANGE_HISTORY_RESET_DATA';

const baseURL = BASE_URL_INDIVIDUAL_NAME_CHANGE_REQUEST;

export const nameChangeRequestDataActions = dataActions({
    baseURL,
    moduleName: 'Name Change Request',
    RECEIVE_DATA_LOADING_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_CONSTANT,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
    SAVE_DATA_ACTION_CONSTANT,
    RESET_DATA_ACTION_CONSTANT,
});
