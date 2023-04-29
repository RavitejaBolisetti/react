import { editActionConstants, editActions } from 'store/actions/crud/crudEdit';
import { prefix } from './prefix';

export const editConfigurableParameterActionConstants = editActionConstants(prefix);
export const editConfigurableParameterActions = editActions(editConfigurableParameterActionConstants);
