import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_TERM_CONDITION_DOCUMENT_TYPE } from 'constants/routingApi';

export const RECEIVE_DATA_LOADING_ACTION_CONSTANT = 'TNC_DOCUMENT_TYPE_LOADING_DATA';
export const RECEIVE_DATA_ACTION_CONSTANT = 'TNC_DOCUMENT_TYPE_LIST_RECIEVE_DATA';
export const RECEIVE_FILTERED_DATA_ACTION_CONSTANT = 'TNC_DOCUMENT_TYPE_FILTERED_LIST_RECIEVE_DATA';
export const RECIEVE_DATA_DETAIL_ACTION_CONSTANT = 'TNC_DOCUMENT_TYPE_RECIEVE_DETAIL_DATA';
export const SAVE_DATA_ACTION_CONSTANT = 'TNC_DOCUMENT_TYPE_SAVE_DATA';
export const RESET_DATA_ACTION_CONSTANT = 'TNC_DOCUMENT_TYPE_RESET_DATA';

const baseURL = BASE_URL_TERM_CONDITION_DOCUMENT_TYPE;

export const tncDocumentTypeDataActions = dataActions({
    baseURL,
    moduleName: 'Terms Conditions',
    RECEIVE_DATA_LOADING_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_CONSTANT,
    RECEIVE_FILTERED_DATA_ACTION_CONSTANT,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
    SAVE_DATA_ACTION_CONSTANT,
    RESET_DATA_ACTION_CONSTANT,
});
