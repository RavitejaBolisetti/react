/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';

import { VEHICLE_DELIVERY_NOTE_SECTION } from 'constants/vehicleDeliveryNoteSection';
import { validateDeliveryNote } from 'components/Sales/VehicleDeliveryNote/utils/validateDeliveryNote';
import { getSelectedMenuAttribute } from 'utils/getSelectedMenuAttribute';
import styles from 'assets/sass/app.module.scss';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, previousSection, formActionType, selectedOrder, soldByDealer, sectionName, setSection } = props;
    const deliveryNoteSectionList = Object.values(VEHICLE_DELIVERY_NOTE_SECTION);

    const className = (id) => {
        if (currentSection === VEHICLE_DELIVERY_NOTE_SECTION.THANK_YOU_PAGE.id) return styles.cursorNotAllowed;
        return formActionType?.addMode && id > previousSection ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    const onHandle = ({ key, item }) => {
        selectedOrder && setCurrentSection(key);
        selectedOrder && setSection(item);
    };

    const items = deliveryNoteSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map(
            (item) =>
                validateDeliveryNote({ item, soldByDealer }) && {
                    dot: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.menuNavIcon,
                    children: (
                        <div className={className(item?.id)} onClick={() => ((!formActionType?.addMode || (formActionType?.addMode && item?.id <= previousSection)) && currentSection !== VEHICLE_DELIVERY_NOTE_SECTION.THANK_YOU_PAGE.id ? onHandle({ item, key: item?.id }) : '')}>
                            {item.title}
                        </div>
                    ),
                    className: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.activeClassName,
                }
        )
        .filter((i) => i);

    return items && <Timeline items={items} />;
};

export default MenuNav;
