import { crudDataReducer } from 'store/reducers/crud/crudData';
import { RECEIVE_DATA_LOADING_ACTION_CONSTANT, RECEIVE_DATA_ACTION_CONSTANT, RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT, RECIEVE_DATA_DETAIL_ACTION_CONSTANT, SAVE_DATA_ACTION_CONSTANT, RESET_DATA_ACTION_CONSTANT, SAVE_FORM_DATA_LOADING_CONSTANT } from 'store/actions/data/supportingDocument';

export const SupportingDocument = crudDataReducer({
    RECEIVE_DATA_LOADING_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
    SAVE_DATA_ACTION_CONSTANT,
    RESET_DATA_ACTION_CONSTANT,
    SAVE_FORM_DATA_LOADING_CONSTANT,
});
