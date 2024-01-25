/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';

import styles from 'assets/sass/app.module.scss';
import { getSelectedMenuAttribute } from 'utils/getSelectedMenuAttribute';
import { VEHICLERELATED_SECTION } from 'constants/modules/VehicleRelated/VehicleRelatedSections';

const MenuNav = (props) => {
    const { customerType, currentSection, setCurrentSection, formActionType, buttonData, setIsUnsavedDataPopup, setNextCurrentSection } = props;
    const profileOptions = Object.values(VEHICLERELATED_SECTION);
    const { previousSection } = props;

    const className = (id) => {
        return formActionType?.addMode && id > previousSection ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    const onHandle = (key) => {
        if (buttonData?.formBtnActive) {
            setIsUnsavedDataPopup(true);
            setNextCurrentSection(key);
        } else {
            setCurrentSection(key);
        }
    };

    const items = profileOptions
        ?.filter((i) => i?.displayOnList)
        ?.map((item) => ({
            dot: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.menuNavIcon,
            children: (
                <div className={className(item?.id)} onClick={() => (!formActionType?.addMode || (formActionType?.addMode && item?.id <= previousSection) ? onHandle(item?.id) : '')}>
                    {item.title}
                </div>
            ),
            className: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.activeClassName,
        }))
        .filter((i) => i);

    return items && <Timeline items={items} />;
};

export default MenuNav;
