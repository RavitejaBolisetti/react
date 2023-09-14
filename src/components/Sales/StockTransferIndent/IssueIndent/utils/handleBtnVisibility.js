/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { ISSUE_CONSTANT } from '../Constants';
import { STOCK_TRANSFER } from 'constants/StockTransfer';

export const handleBtnVisibility = ({ toggleButton = undefined, checkKey = undefined, defaultVisibility }) => {
    console.log('checkKey', checkKey,toggleButton);
    switch (toggleButton) {
        case STOCK_TRANSFER?.RAISED?.key: {
            switch (checkKey) {
                case ISSUE_CONSTANT?.CANCEL?.key: {
                    return { canReceive: false, canCancel: false, canReturn: false, canPrint: true };
                }
                case ISSUE_CONSTANT?.RECEIVED?.key: {
                    return { canReceive: false, canCancel: false, canReturn: true, canPrint: true };
                }
                case ISSUE_CONSTANT?.RETURNED?.key: {
                    return { canReceive: false, canCancel: false, canReturn: false, canPrint: true };
                }
                case ISSUE_CONSTANT?.ISSUED?.key: {
                    return { canReceive: false, canCancel: true, canReturn: false, canPrint: true };
                }
                default: {
                    return { ...defaultVisibility };
                }
            }
        }
        case STOCK_TRANSFER?.RECEIVED?.key: {
            switch (checkKey) {
                case ISSUE_CONSTANT?.CANCEL?.key: {
                    return { canReceive: false, canCancel: false, canReturn: false, canPrint: true };
                }
                case ISSUE_CONSTANT?.RECEIVED?.key: {
                    return { canReceive: false, canCancel: false, canReturn: false, canPrint: true };
                }
                case ISSUE_CONSTANT?.RETURNED?.key: {
                    return { canReceive: false, canCancel: false, canReturn: true, canPrint: true };
                }
                case ISSUE_CONSTANT?.ISSUED?.key: {
                    return { canReceive: false, canCancel: true, canReturn: false, canPrint: true };
                }
                default: {
                    return { ...defaultVisibility };
                }
            }
        }
        default: {
            return { canReceive: false, canCancel: false, canReturn: false, canPrint: false };
        }
    }
};
