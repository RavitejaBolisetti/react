import { crudDataReducer } from 'store/reducers/crud/crudData';
import { ROLE_MASTER_LOADING_DATA, ROLE_MASTER_LIST_RECIEVE_DATA, ROLE_MASTER_FILTERED_LIST_RECIEVE_DATA, ROLE_MASTER_RECIEVE_DETAIL_DATA, ROLE_MASTER_SAVE_DATA, ROLE_MASTER_RESET_DATA } from 'store/actions/data/dealerManpower/roleMaster';

export const RoleMaster = crudDataReducer(ROLE_MASTER_LOADING_DATA, ROLE_MASTER_LIST_RECIEVE_DATA, ROLE_MASTER_FILTERED_LIST_RECIEVE_DATA, ROLE_MASTER_RECIEVE_DETAIL_DATA, ROLE_MASTER_SAVE_DATA, ROLE_MASTER_RESET_DATA);
