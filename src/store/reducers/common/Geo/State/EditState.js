import { editStateActionConstants } from 'store/actions/common/Geo/State/EditState';
import { crudEditReducer } from 'store/reducers/crud/crudEdit';

export const EditState = crudEditReducer({ editActionConstants: editStateActionConstants });
