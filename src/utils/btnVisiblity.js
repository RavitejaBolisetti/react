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
export const VIEW_ONLY_ACTION = FROM_ACTION_TYPE?.VIEW_ONLY;
export const NEXT_ACTION = FROM_ACTION_TYPE?.NEXT;
export const CANCEL_ACTION = FROM_ACTION_TYPE?.CANCEL_OTF;
export const TRANSFER_ACTION = FROM_ACTION_TYPE?.TRANSFER_OTF;
export const ALLOT = FROM_ACTION_TYPE?.ALLOT;
export const UNALLOT = FROM_ACTION_TYPE?.UNALLOT;
export const DELETE_ACTION = FROM_ACTION_TYPE?.DELETE;
export const CANCELLN_APPROVE = FROM_ACTION_TYPE?.CANCELLN_APPROVE;
export const CANCELLN_REJECT = FROM_ACTION_TYPE?.CANCELLN_REJECT;
export const UPLOAD_ACTION = FROM_ACTION_TYPE?.UPLOAD;
export const CANCEL_INVOICE = FROM_ACTION_TYPE?.CANCEL_INVOICE;

export const btnVisiblity = ({ defaultBtnVisiblity, buttonAction, saveAndNewBtn = true, orderStatus = false }) => {
    let btnVisibility = defaultBtnVisiblity;
    if (buttonAction === ADD_ACTION) {
        btnVisibility = { ...btnVisibility, saveBtn: true, saveAndNewBtn, cancelBtn: true };
    } else if (buttonAction === VIEW_ACTION) {
        btnVisibility = { ...btnVisibility, closeBtn: true, editBtn: true, nextBtn: true };
    } else if (buttonAction === VIEW_ONLY_ACTION) {
        btnVisibility = { ...btnVisibility, saveBtn: false, cancelBtn: false, closeBtn: true };
    } else if (buttonAction === EDIT_ACTION) {
        btnVisibility = { ...btnVisibility, saveBtn: true, cancelBtn: true, nextBtn: true };
    }

    if (orderStatus) {
        switch (orderStatus) {
            case OTF_STATUS?.BOOKED?.key:
                return { ...btnVisibility, transferOTFBtn: true, allotBtn: true, cancelOTFBtn: true };
            case OTF_STATUS?.ALLOTED?.key:
                return { ...btnVisibility, unAllotBtn: true, invoiceBtn: true };
            case OTF_STATUS?.UNALLOTED?.key:
                return { ...btnVisibility, unAllotBtn: true, invoiceBtn: true };
            case OTF_STATUS?.INVOICED?.key:
                return { ...btnVisibility, editBtn: false, deliveryNoteBtn: true };
            case OTF_STATUS?.TRANSFERRED?.key:
                return { ...btnVisibility, editBtn: false, allotBtn: true, cancelOTFBtn: true };
            case OTF_STATUS?.DELIVERY_NOTE?.key:
                return { ...btnVisibility, editBtn: false };
            case OTF_STATUS?.CANCELLED?.key:
            case OTF_STATUS?.PENDING_FOR_CANCELLATION?.key:
                return { ...btnVisibility, editBtn: false, pendingCancellationOTFBtn: true };
            case OTF_STATUS?.DELIVERED?.key:
                return { ...btnVisibility, editBtn: false };
            default:
                return { ...btnVisibility };
        }
    } else {
        return { ...btnVisibility };
    }
};
