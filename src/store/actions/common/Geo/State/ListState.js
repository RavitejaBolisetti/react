import { listActionConstants, listActions } from "store/actions/crud/crudList";
import { prefix } from "./prefix";

export const listStateActionConstants = listActionConstants(prefix);
export const listStateActions = listActions(listStateActionConstants);
