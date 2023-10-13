/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';

import { CHARGER_INSTALLATION_SECTION } from 'constants/ChargerInstallationConstant';
import { getSelectedMenuAttribute } from 'utils/getSelectedMenuAttribute';


const MenuNav = (props) => {
    const { currentSection, setCurrentSection, selectedOtfNumber, formActionType, vehicleInvoiceMasterData, selectedOrder: { orderStatus = false } = {} } = props;
    const receiptSectionList = Object.values(CHARGER_INSTALLATION_SECTION);

    const onHandle = (key) => {
        selectedOtfNumber && setCurrentSection(key);
    };

    const items = receiptSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map(
            (item) => ({
                dot: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.menuNavIcon,
                children: <p onClick={() => onHandle(item?.id)}>{item?.title}</p>,
                className: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.activeClassName,
            })
        );

    const finalItem = items?.filter((i) => i);

    return finalItem && <Timeline items={finalItem} />;
};

export default MenuNav;
