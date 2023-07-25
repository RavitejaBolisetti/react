/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { VEHICLE_RECEIPT_SECTION } from 'constants/VehicleReceiptSection';
import { VEHICLE_RECEIPT_STATUS } from 'constants/VehicleReceiptStatus';

export const validateVehicleReceiptMenu = ({ item, status, otfData }) => {
    if (item?.id === VEHICLE_RECEIPT_SECTION.SUPPLIER_INVOICE_DETAILS.id) {
        return status === VEHICLE_RECEIPT_STATUS?.INVOICED.key || status === VEHICLE_RECEIPT_STATUS?.DELIVERED.key;
    }
    switch (item?.id) {
        case VEHICLE_RECEIPT_SECTION.SUPPLIER_INVOICE_DETAILS.id:
            return otfData?.financeArrangedBy === 'DLR';
        case VEHICLE_RECEIPT_SECTION.VEHICLE_DETAILS.id:
            return otfData?.exchange === 1;
        default:
            return true;
    }
};
