import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_DEALER_PARENT } from 'constants/routingApi';

export const DEALER_PARENT_LOADING_DATA = 'DEALER_PARENT_LOADING_DATA';
export const DEALER_PARENT_LIST_RECIEVE_DATA = 'DEALER_PARENT_LIST_RECIEVE_DATA';
export const DEALER_PARENT_FILTERED_LIST_RECIEVE_DATA = 'DEALER_PARENT_FILTERED_LIST_RECIEVE_DATA';
export const DEALER_PARENT_RECIEVE_DETAIL_DATA = 'DEALER_PARENT_RECIEVE_DETAIL_DATA';
export const DEALER_PARENT_SAVE_DATA = 'DEALER_PARENT_SAVE_DATA';
export const DEALER_PARENT_RESET_DATA = 'DEALER_PARENT_RESET_DATA';

const baseURL = BASE_URL_DEALER_PARENT;

export const dealerParentDataActions = dataActions({
    baseURL,
    moduleName: 'Dealer Parent',
    RECEIVE_DATA_LOADING_ACTION_CONSTANT: DEALER_PARENT_LOADING_DATA,
    RECEIVE_DATA_ACTION_CONSTANT: DEALER_PARENT_LIST_RECIEVE_DATA,
    RECEIVE_FILTERED_DATA_ACTION_CONSTANT: DEALER_PARENT_FILTERED_LIST_RECIEVE_DATA,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT: DEALER_PARENT_RECIEVE_DETAIL_DATA,
    SAVE_DATA_ACTION_CONSTANT: DEALER_PARENT_SAVE_DATA,
    RESET_DATA_ACTION_CONSTANT: DEALER_PARENT_RESET_DATA,
});