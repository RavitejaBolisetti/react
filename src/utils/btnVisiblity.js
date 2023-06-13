import { FROM_ACTION_TYPE } from 'constants/formActionType';

const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

export const btnVisiblity = ({ defaultBtnVisiblity, buttonAction, saveAndNewBtn = true }) => {
    if (buttonAction === VIEW_ACTION) {
        return { ...defaultBtnVisiblity, closeBtn: true, editBtn: true };
    } else if (buttonAction === EDIT_ACTION) {
        return { ...defaultBtnVisiblity, saveBtn: true, cancelBtn: true };
    } else {
        return { ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: saveAndNewBtn, cancelBtn: true };
    }
};
