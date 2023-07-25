import { listStateActionConstants } from 'store/actions/common/Geo/State/ListState';
import { crudListReducer } from 'store/reducers/crud/crudList';

export const ListState = crudListReducer(listStateActionConstants);
