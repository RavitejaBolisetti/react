/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';

import { GST_CLAIM_SECTION } from 'constants/modules/IncentiveScheme/GstClaimSection';

import { validateDeliveryNote } from 'components/Sales/VehicleDeliveryNote/utils/validateDeliveryNote';
import { getSelectedMenuAttribute } from 'utils/getSelectedMenuAttribute';
import styles from 'assets/sass/app.module.scss';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, previousSection, formActionType, selectedOrder, soldByDealer, setIsUnsavedDataPopup, localFormValueChange, setSection, setItemKey } = props;
    const deliveryNoteSectionList = Object.values(GST_CLAIM_SECTION);

    const className = (id) => {
        return formActionType?.addMode && id > previousSection ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    const onHandle = ({ key, item }) => {
        setCurrentSection(key);
        setSection(item);
    };

    const items = deliveryNoteSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map(
            (item) =>
                validateDeliveryNote({ item, soldByDealer }) && {
                    dot: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.menuNavIcon,
                    children: (
                        <div className={className(item?.id)} onClick={() => (!formActionType?.addMode || (formActionType?.addMode && item?.id <= previousSection) ? onHandle({ item, key: item?.id }) : '')}>
                            {item?.title}
                        </div>
                    ),
                    className: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.activeClassName,
                }
        )
        .filter((i) => i);

    return items && <Timeline items={items} />;
};

export default MenuNav;
