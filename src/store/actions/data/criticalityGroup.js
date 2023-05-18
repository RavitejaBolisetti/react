import { dataActions } from 'store/actions/crud/dataAction';
import { BASE_URL_CRITICALITY_GROUP } from 'constants/routingApi';

export const CRITICALITY_LOADING_DATA = 'CRITICALITY_LOADING_DATA';
export const CRITICALITY_LIST_RECIEVE_DATA = 'CRITICALITY_LIST_RECIEVE_DATA';
export const CRITICALITY_SAVE_DATA = 'CRITICALITY_SAVE_DATA';

const baseURL = BASE_URL_CRITICALITY_GROUP;

export const criticalityDataActions = dataActions({
    baseURL,
    moduleName: 'Application Criticality Group',
    RECEIVE_DATA_LOADING_ACTION_CONSTANT: CRITICALITY_LOADING_DATA,
    RECEIVE_DATA_ACTION_CONSTANT: CRITICALITY_LIST_RECIEVE_DATA,
    SAVE_DATA_ACTION_CONSTANT: CRITICALITY_SAVE_DATA,
});
