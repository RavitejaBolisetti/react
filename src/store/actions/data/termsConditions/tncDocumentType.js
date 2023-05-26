import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_TERM_CONDITION_DOCUMENT_TYPE } from 'constants/routingApi';

export const TNC_DOCUMENT_TYPE_LOADING_DATA = 'TNC_DOCUMENT_TYPE_LOADING_DATA';
export const TNC_DOCUMENT_TYPE_LIST_RECIEVE_DATA = 'TNC_DOCUMENT_TYPE_LIST_RECIEVE_DATA';
export const TNC_DOCUMENT_TYPE_FILTERED_LIST_RECIEVE_DATA = 'TNC_DOCUMENT_TYPE_FILTERED_LIST_RECIEVE_DATA';
export const TNC_DOCUMENT_TYPE_RECIEVE_DETAIL_DATA = 'TNC_DOCUMENT_TYPE_RECIEVE_DETAIL_DATA';
export const TNC_DOCUMENT_TYPE_SAVE_DATA = 'TNC_DOCUMENT_TYPE_SAVE_DATA';
export const TNC_DOCUMENT_TYPE_RESET_DATA = 'TNC_DOCUMENT_TYPE_RESET_DATA';

const baseURL = BASE_URL_TERM_CONDITION_DOCUMENT_TYPE;

export const tncDocumentTypeDataActions = dataActions({
    baseURL,
    moduleName: 'Terms Conditions',
    RECEIVE_DATA_LOADING_ACTION_CONSTANT: TNC_DOCUMENT_TYPE_LOADING_DATA,
    RECEIVE_DATA_ACTION_CONSTANT: TNC_DOCUMENT_TYPE_LIST_RECIEVE_DATA,
    RECEIVE_FILTERED_DATA_ACTION_CONSTANT: TNC_DOCUMENT_TYPE_FILTERED_LIST_RECIEVE_DATA,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT: TNC_DOCUMENT_TYPE_RECIEVE_DETAIL_DATA,
    SAVE_DATA_ACTION_CONSTANT: TNC_DOCUMENT_TYPE_SAVE_DATA,
    RESET_DATA_ACTION_CONSTANT: TNC_DOCUMENT_TYPE_RESET_DATA,
});
