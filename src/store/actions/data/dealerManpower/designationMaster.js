import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_DEALER_MANPOWER_DESIGNATION } from 'constants/routingApi';

export const DEALER_MANPOWER_DESIGNATION_MASTER_LOADING_DATA = 'DEALER_MANPOWER_DESIGNATION_MASTER_LOADING_DATA';
export const DEALER_MANPOWER_DESIGNATION_MASTER_LIST_RECIEVE_DATA = 'DEALER_MANPOWER_DESIGNATION_MASTER_LIST_RECIEVE_DATA';
export const DEALER_MANPOWER_DESIGNATION_MASTER_FILTERED_LIST_RECIEVE_DATA = 'DEALER_MANPOWER_DESIGNATION_MASTER_FILTERED_LIST_RECIEVE_DATA';
export const DEALER_MANPOWER_DESIGNATION_MASTER_RECIEVE_DETAIL_DATA = 'DEALER_MANPOWER_DESIGNATION_MASTER_RECIEVE_DETAIL_DATA';
export const DEALER_MANPOWER_DESIGNATION_MASTER_SAVE_DATA = 'DEALER_MANPOWER_DESIGNATION_MASTER_SAVE_DATA';
export const DEALER_MANPOWER_DESIGNATION_MASTER_RESET_DATA = 'DEALER_MANPOWER_DESIGNATION_MASTER_RESET_DATA';
export const DEALER_MANPOWER_DESIGNATION_APPLY_FILTER_CONSTANT = 'DEALER_MANPOWER_DESIGNATION_APPLY_FILTER_CONSTANT';



const baseURL = BASE_URL_DEALER_MANPOWER_DESIGNATION;

export const dealerManpowerDesignationMasterDataActions = dataActions({
    baseURL,
    moduleName: 'Designation Master',
    RECEIVE_DATA_LOADING_ACTION_CONSTANT: DEALER_MANPOWER_DESIGNATION_MASTER_LOADING_DATA,
    RECEIVE_DATA_ACTION_CONSTANT: DEALER_MANPOWER_DESIGNATION_MASTER_LIST_RECIEVE_DATA,
    RECEIVE_FILTERED_DATA_ACTION_CONSTANT: DEALER_MANPOWER_DESIGNATION_MASTER_FILTERED_LIST_RECIEVE_DATA,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT: DEALER_MANPOWER_DESIGNATION_MASTER_RECIEVE_DETAIL_DATA,
    SAVE_DATA_ACTION_CONSTANT: DEALER_MANPOWER_DESIGNATION_MASTER_SAVE_DATA,
    RESET_DATA_ACTION_CONSTANT: DEALER_MANPOWER_DESIGNATION_MASTER_RESET_DATA,
    RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT: DEALER_MANPOWER_DESIGNATION_APPLY_FILTER_CONSTANT,
});
