import { addActionConstants, addActions } from "store/actions/crud/crudAdd";
import { prefix } from "./prefix";

export const addStateActionConstants = addActionConstants(prefix);
export const addStateActions = addActions(addStateActionConstants);
