/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { VEHICLE_INVOICE_SECTION } from 'constants/VehicleInvoiceSection';

export const validateInvoiceMenu = ({ item, otfData }) => {
    switch (item?.id) {
        case VEHICLE_INVOICE_SECTION.EXCHANGE_DETAILS.id:
            return otfData?.loyaltyScheme !== 1;
        case VEHICLE_INVOICE_SECTION.REFERRALS.id:
            return otfData?.referral === 'Y';
        case VEHICLE_INVOICE_SECTION.LOYALTY_SCHEME.id:
            return otfData?.exchange !== 1 && otfData?.loyaltyScheme === 1;
        default:
            return true;
    }
};
