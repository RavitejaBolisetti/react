import { crudDataReducer } from 'store/reducers/crud/crudData';
import { TNC_FETCH_CHANGE_HISTORY_LOADING_DATA, TNC_FETCH_CHANGE_HISTORY_LIST_RECIEVE_DATA, TNC_FETCH_CHANGE_HISTORY_FILTERED_LIST_RECIEVE_DATA, TNC_FETCH_CHANGE_HISTORY_RECIEVE_DETAIL_DATA, TNC_FETCH_CHANGE_HISTORY_SAVE_DATA, TNC_FETCH_CHANGE_HISTORY_RESET_DATA } from 'store/actions/data/termsConditions/changeHistoryAction';

export const ChangeHistoryTermsConditions = crudDataReducer(TNC_FETCH_CHANGE_HISTORY_LOADING_DATA, TNC_FETCH_CHANGE_HISTORY_LIST_RECIEVE_DATA, TNC_FETCH_CHANGE_HISTORY_FILTERED_LIST_RECIEVE_DATA, TNC_FETCH_CHANGE_HISTORY_RECIEVE_DETAIL_DATA, TNC_FETCH_CHANGE_HISTORY_SAVE_DATA, TNC_FETCH_CHANGE_HISTORY_RESET_DATA);
