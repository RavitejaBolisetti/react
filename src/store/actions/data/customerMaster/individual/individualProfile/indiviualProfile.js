import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_INDIVIUAL_PROFILE_CUSTOMER_MASTER } from 'constants/routingApi';

const PREFIX = 'INDIVIUAL_PROFILE_';

export const RECEIVE_DATA_LOADING_ACTION_CONSTANT = PREFIX + 'LOADING_DATA';
export const RECEIVE_DATA_ACTION_CONSTANT = PREFIX + 'LIST_RECIEVE_DATA';
export const RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT = PREFIX + 'LIST_APPLY_FILTER_CONSTANT';
export const RECIEVE_DATA_DETAIL_ACTION_CONSTANT = PREFIX + 'RECIEVE_DETAIL_DATA';
export const SAVE_DATA_ACTION_CONSTANT = PREFIX + 'SAVE_DATA';
export const RESET_DATA_ACTION_CONSTANT = PREFIX + 'RESET_DATA';

const baseURL = BASE_URL_INDIVIUAL_PROFILE_CUSTOMER_MASTER;

export const indiviualProfileDataActions = dataActions({
    baseURL,
    moduleName: 'Indiviual Profile',
    RECEIVE_DATA_LOADING_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
    SAVE_DATA_ACTION_CONSTANT,
    RESET_DATA_ACTION_CONSTANT,
});
