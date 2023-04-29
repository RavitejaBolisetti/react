import { addActionConstants, addActions } from 'store/actions/crud/crudAdd';
import { prefix } from './prefix';

export const addConfigurableParameterActionConstants = addActionConstants(prefix);
export const addConfigurableParameterActions = addActions(addConfigurableParameterActionConstants);
