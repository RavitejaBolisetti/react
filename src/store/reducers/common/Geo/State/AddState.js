import { addStateActionConstants } from 'store/actions/common/Geo/State/AddState';
import { crudAddReducer } from 'store/reducers/crud/crudAdd';

export const AddState = crudAddReducer(addStateActionConstants);
