/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { ReceiptType } from './ReceiptType';
import { RECEIPT_SECTION } from 'constants/ReceiptSection';

export const validateReceiptMenu = ({ item, receipt }) => {
    if (item?.id === RECEIPT_SECTION?.APPORTION_DETAILS?.id) {
        if (receipt) {
            return receipt !== ReceiptType?.ADVANCE?.key;
        }
        return false;
    }
    return true;
};
