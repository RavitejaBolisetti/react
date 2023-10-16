/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { ISSUE_ACTION_LIST } from '../constants';
import { STOCK_TRANSFER } from 'constants/StockTransfer';

export const handleBtnVisibility = ({ toggleButton = undefined, checkKey = undefined, defaultVisibility }) => {
    switch (toggleButton) {
        case STOCK_TRANSFER?.RAISED?.key: {
            switch (checkKey) {
                case ISSUE_ACTION_LIST?.CANCEL?.key: {
                    return { canReceive: false, canCancel: false, canReturn: false, canPrint: false };
                }
                case ISSUE_ACTION_LIST?.RECEIVED?.key: {
                    return { canReceive: false, canCancel: false, canReturn: false, canPrint: true };
                }
                case ISSUE_ACTION_LIST?.RETURNED?.key: {
                    return { canReceive: false, canCancel: false, canReturn: false, canPrint: false };
                }
                case ISSUE_ACTION_LIST?.ISSUED?.key: {
                    return { canReceive: true, canCancel: false, canReturn: true, canPrint: true };
                }
                default: {
                    return { ...defaultVisibility, canAdd: false };
                }
            }
        }
        case STOCK_TRANSFER?.RECEIVED?.key: {
            switch (checkKey) {
                case ISSUE_ACTION_LIST?.CANCEL?.key: {
                    return { canReceive: false, canCancel: false, canReturn: false, canPrint: false };
                }
                case ISSUE_ACTION_LIST?.RECEIVED?.key: {
                    return { canReceive: false, canCancel: false, canReturn: false, canPrint: true };
                }
                case ISSUE_ACTION_LIST?.RETURNED?.key: {
                    return { canReceive: false, canCancel: false, canReturn: false, canPrint: false };
                }
                case ISSUE_ACTION_LIST?.ISSUED?.key: {
                    return { canReceive: false, canCancel: true, canReturn: false, canPrint: true };
                }
                default: {
                    return { ...defaultVisibility };
                }
            }
        }
        default: {
            return { ...defaultVisibility };
        }
    }
};
