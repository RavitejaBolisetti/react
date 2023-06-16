import { crudDataReducer } from 'store/reducers/crud/crudData';
import { RECEIVE_DATA_LOADING_ACTION_CONSTANT, RECEIVE_DATA_ACTION_CONSTANT, RECIEVE_DATA_DETAIL_ACTION_CONSTANT, SAVE_DATA_ACTION_CONSTANT, RESET_DATA_ACTION_CONSTANT } from 'store/actions/data/termsConditions/termsConditionsManufacturerAction';

export const ManufacturerTermsConditions = crudDataReducer({
    RECEIVE_DATA_LOADING_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_CONSTANT,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
    SAVE_DATA_ACTION_CONSTANT,
    RESET_DATA_ACTION_CONSTANT,
});
