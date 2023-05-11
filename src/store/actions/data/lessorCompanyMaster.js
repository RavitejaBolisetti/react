import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_LESSOR_COMPANY_MASTER } from 'constants/routingApi';

export const LESSOR_COMPANY_MASTER_LOADING_DATA = 'LESSOR_COMPANY_MASTER_LOADING_DATA';
export const LESSOR_COMPANY_MASTER_LIST_RECIEVE_DATA = 'LESSOR_COMPANY_MASTER_LIST_RECIEVE_DATA';
export const LESSOR_COMPANY_MASTER_FILTERED_LIST_RECIEVE_DATA = 'LESSOR_COMPANY_MASTER_FILTERED_LIST_RECIEVE_DATA';
export const LESSOR_COMPANY_MASTER_RECIEVE_DETAIL_DATA = 'LESSOR_COMPANY_MASTER_RECIEVE_DETAIL_DATA';
export const LESSOR_COMPANY_MASTER_SAVE_DATA = 'LESSOR_COMPANY_MASTER_SAVE_DATA';
export const LESSOR_COMPANY_MASTER_RESET_DATA = 'LESSOR_COMPANY_MASTER_RESET_DATA';

const baseURL = BASE_URL_LESSOR_COMPANY_MASTER;

export const lessorCompanyMasterDataActions = dataActions({
    baseURL,
    moduleName: 'Lessor Company Master',
    RECEIVE_DATA_LOADING_ACTION_CONSTANT: LESSOR_COMPANY_MASTER_LOADING_DATA,
    RECEIVE_DATA_ACTION_CONSTANT: LESSOR_COMPANY_MASTER_LIST_RECIEVE_DATA,
    RECEIVE_FILTERED_DATA_ACTION_CONSTANT: LESSOR_COMPANY_MASTER_FILTERED_LIST_RECIEVE_DATA,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT: LESSOR_COMPANY_MASTER_RECIEVE_DETAIL_DATA,
    SAVE_DATA_ACTION_CONSTANT: LESSOR_COMPANY_MASTER_SAVE_DATA,
    RESET_DATA_ACTION_CONSTANT: LESSOR_COMPANY_MASTER_RESET_DATA,
});
