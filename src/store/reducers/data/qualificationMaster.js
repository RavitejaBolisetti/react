import { crudDataReducer } from 'store/reducers/crud/crudData';
import { QUALIFICATION_LOADING_DATA, QUALIFICATION_LIST_RECIEVE_DATA, QUALIFICATION_SAVE_DATA } from 'store/actions/data/qualificationMaster';

export const QualificationMaster = crudDataReducer(QUALIFICATION_LOADING_DATA, QUALIFICATION_LIST_RECIEVE_DATA, QUALIFICATION_SAVE_DATA);
