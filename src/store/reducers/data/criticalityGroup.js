import { crudDataReducer } from 'store/reducers/crud/crudData';
import { CRITICALITY_LOADING_DATA, CRITICALITY_LIST_RECIEVE_DATA, CRITICALITY_SAVE_DATA, CRITICALITY_SAVE_DATA_LOADING } from 'store/actions/data/criticalityGroup';

export const CriticalityGroup = crudDataReducer(CRITICALITY_LOADING_DATA, CRITICALITY_LIST_RECIEVE_DATA, CRITICALITY_SAVE_DATA,null, null, null,null, CRITICALITY_SAVE_DATA_LOADING);
