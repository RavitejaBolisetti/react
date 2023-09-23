/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';

import { VEHICLE_INVOICE_SECTION } from 'constants/VehicleInvoiceSection';
import { getSelectedMenuAttribute } from 'utils/getSelectedMenuAttribute';

export const validateOTFMenu = ({ item, status, otfData }) => {
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

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, selectedOtfNumber, formActionType, vehicleInvoiceMasterData, selectedOrder: { orderStatus = false } = {} } = props;
    const receiptSectionList = Object.values(VEHICLE_INVOICE_SECTION);
    const otfData = vehicleInvoiceMasterData?.invoiceDetails?.otfDetailsRequest;

    const onHandle = (key) => {
        selectedOtfNumber && setCurrentSection(key);
    };

    const items = receiptSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map(
            (item) =>
                validateOTFMenu({ item, status: orderStatus, otfData }) && {
                    dot: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.menuNavIcon,
                    children: <p onClick={() => onHandle(item?.id)}>{item?.title}</p>,
                    className: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.activeClassName,
                }
        );

    const finalItem = items?.filter((i) => i);

    return finalItem && <Timeline items={finalItem} />;
};

export default MenuNav;
