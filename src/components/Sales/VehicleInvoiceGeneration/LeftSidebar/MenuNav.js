/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';

import { VEHICLE_INVOICE_SECTION } from 'constants/VehicleInvoiceSection';
import { getSelectedMenuAttribute } from 'utils/getSelectedMenuAttribute';
import styles from 'assets/sass/app.module.scss';

export const validateInvoiceMenu = ({ item, otfData }) => {
    switch (item?.id) {
        case VEHICLE_INVOICE_SECTION.EXCHANGE_DETAILS.id:
            return otfData?.loyaltyScheme !== 1;
        case VEHICLE_INVOICE_SECTION.REFERRALS.id:
            return otfData?.referral === 'Y';
        case VEHICLE_INVOICE_SECTION.LOYALTY_SCHEME.id:
            return otfData?.exchange !== 1 && otfData?.loyaltyScheme === 10;
        default:
            return true;
    }
};

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, formActionType, otfData, previousSection = 1 } = props;

    const receiptSectionList = Object.values(VEHICLE_INVOICE_SECTION);

    const onHandle = (key) => {
        setCurrentSection(key);
    };
    const className = (id) => {
        return formActionType?.addMode && id > previousSection ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    const items = receiptSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map((item) => {
            const { menuNavIcon, activeClassName } = getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType });
            return (
                validateInvoiceMenu({ item, otfData }) && {
                    dot: menuNavIcon,
                    children: (
                        <div className={className(item?.id)} onClick={() => (!formActionType?.addMode || (formActionType?.addMode && item?.id <= previousSection) ? onHandle(item?.id) : '')}>
                            {item.title}
                        </div>
                    ),
                    className: activeClassName,
                }
            );
        })
        ?.filter((i) => i);

    return items && <Timeline items={items} />;
};

export default MenuNav;
