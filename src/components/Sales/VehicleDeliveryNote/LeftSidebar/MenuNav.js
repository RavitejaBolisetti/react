/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';

import { VEHICLE_DELIVERY_NOTE_SECTION } from 'constants/vehicleDeliveryNoteSection';
import { getSelectedMenuAttribute } from 'utils/getSelectedMenuAttribute';
import styles from 'assets/sass/app.module.scss';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, previousSection, formActionType, selectedOrder } = props;
    const deliveryNoteSectionList = Object.values(VEHICLE_DELIVERY_NOTE_SECTION);

    const className = (id) => {
        return formActionType?.addMode && id > previousSection ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    const onHandle = (key) => {
        selectedOrder && setCurrentSection(key);
    };

    const items = deliveryNoteSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map((item) => ({
            dot: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.menuNavIcon,
            // children: <p onClick={() => onHandle(item?.id)}>{item?.title}</p>,
            children: (
                <div className={className(item?.id)} onClick={() => (!formActionType?.addMode || (formActionType?.addMode && item?.id <= previousSection) ? onHandle(item?.id) : '')}>
                    {item.title}
                </div>
            ),
            className: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.activeClassName,
        }));
    const finalItem = items?.filter((i) => i);

    return finalItem && <Timeline items={finalItem} />;
};

export default MenuNav;
