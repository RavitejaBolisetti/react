/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { FROM_ACTION_TYPE } from 'constants/formActionType';

export const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
export const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
export const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;
export const NEXT_ACTION = FROM_ACTION_TYPE?.NEXT;

export const btnVisiblity = ({ defaultBtnVisiblity, buttonAction, saveAndNewBtn = true }) => {
    if (buttonAction === VIEW_ACTION) {
        return { ...defaultBtnVisiblity, closeBtn: true, editBtn: true, nextBtn: true };
    } else if (buttonAction === EDIT_ACTION) {
        return { ...defaultBtnVisiblity, saveBtn: true, cancelBtn: true };
    } else {
        return { ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: saveAndNewBtn, cancelBtn: true };
    }
};
