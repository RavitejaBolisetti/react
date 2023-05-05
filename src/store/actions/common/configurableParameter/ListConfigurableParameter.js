import { listActionConstants, listActions } from 'store/actions/crud/crudList';
import { prefix } from './prefix';

export const listConfigurableParameterActionConstants = listActionConstants(prefix);
export const listConfigurableParameterActions = listActions(listConfigurableParameterActionConstants);
