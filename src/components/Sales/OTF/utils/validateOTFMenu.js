/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { OTF_SECTION } from 'constants/OTFSection';
import { OTF_STATUS } from 'constants/OTFStatus';
import { FINANCE_ARRANGED_BY } from 'constants/financeArrangedBy';

export const validateOTFMenu = ({ item, status, otfData }) => {
    if (item?.id === OTF_SECTION.INVOICE_INFORMATION.id) {
        return status === OTF_STATUS?.INVOICED.key || status === OTF_STATUS?.DELIVERED.key;
    }

    switch (item?.id) {
        case OTF_SECTION.FINANCE_DETAILS.id:
            return otfData?.financeArrangedBy === FINANCE_ARRANGED_BY?.DEALER?.key;
        case OTF_SECTION.EXCHANGE_VEHICLE.id:
            return otfData?.exchange === 1;
        case OTF_SECTION.REFERRALS.id:
            return otfData?.referral === 'Y';
        case OTF_SECTION.LOYALTY_SCHEME.id:
            return otfData?.loyaltyScheme === 1;
        case OTF_SECTION.INVOICE_INFORMATION.id:
            return otfData?.loyaltyScheme === 1;
        default:
            return true;
    }
};
