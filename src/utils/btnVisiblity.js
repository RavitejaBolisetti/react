/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { OTF_STATUS } from 'constants/OTFStatus';

export const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
export const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
export const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;
export const NEXT_ACTION = FROM_ACTION_TYPE?.NEXT;

export const btnVisiblity = ({ defaultBtnVisiblity, buttonAction, saveAndNewBtn = true, orderStatus = false }) => {
    let btnVisibility = defaultBtnVisiblity;
    if (buttonAction === VIEW_ACTION) {
        btnVisibility = { ...btnVisibility, closeBtn: true, editBtn: true, nextBtn: true };
    } else if (buttonAction === EDIT_ACTION) {
        btnVisibility = { ...btnVisibility, saveBtn: true, cancelBtn: true };
    } else {
        btnVisibility = { ...btnVisibility, saveBtn: true, saveAndNewBtn: saveAndNewBtn, cancelBtn: true };
    }

    if (orderStatus) {
        switch (orderStatus) {
            case OTF_STATUS?.BOOKED?.title:
                return { ...btnVisibility, transferBtn: true, allotBtn: true, cancelOtfBtn: true };
            case OTF_STATUS?.ALLOTED?.title:
                return { ...btnVisibility, transferBtn: true, unAllotBtn: true, invoiceBtn: true };
            case OTF_STATUS?.CANCELLED?.title:
            case OTF_STATUS?.DELIVERED?.title:
                return { ...btnVisibility, editBtn: false };
            default:
                return { ...btnVisibility };
        }
    } else {
        return { ...btnVisibility };
    }
};
