import { crudDataReducer } from 'store/reducers/crud/crudData';
import { CRITICALITY_LOADING_DATA, CRITICALITY_LIST_RECIEVE_DATA, CRITICALITY_SAVE_DATA } from 'store/actions/data/criticalityGroup';

export const CriticalityGroup = crudDataReducer(CRITICALITY_LOADING_DATA, CRITICALITY_LIST_RECIEVE_DATA, CRITICALITY_SAVE_DATA);
