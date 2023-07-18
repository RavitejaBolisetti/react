import { editActionConstants, editActions } from 'store/actions/crud/crudEdit';
import { prefix } from './prefix';

export const editStateActionConstants = editActionConstants(prefix);
export const editStateActions = editActions(editStateActionConstants);


