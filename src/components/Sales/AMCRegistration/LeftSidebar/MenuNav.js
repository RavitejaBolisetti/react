/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';

import { AMC_REGISTRATION_SECTION } from 'constants/AMCRegistrationSection';
import { getSelectedMenuAttribute } from 'utils/getSelectedMenuAttribute';
import styles from 'assets/sass/app.module.scss';

export const validateAMCRegistrationMenu = ({ item, status, formActionType }) => {
    switch (item?.id) {
        case AMC_REGISTRATION_SECTION.REQUEST_DETAILS.id:
            return formActionType?.viewMode;
        default:
            return true;
    }
};

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, formActionType, selectedOrder: { orderStatus = false } = {}, previousSection = 1 } = props;

    const onHandle = (key) => {
        setCurrentSection(key);
    };
    const className = (id) => {
        return formActionType?.addMode && id > previousSection ? styles.cursorNotAllowed : styles.cursorPointer; //to be uncommented after deve;lopement
    };

    const items = Object.values(AMC_REGISTRATION_SECTION)
        ?.filter((i) => i?.displayOnList)
        ?.map(
            (item) =>
                validateAMCRegistrationMenu({ item, status: orderStatus, formActionType }) && {
                    dot: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.menuNavIcon,
                    children: (
                        <div className={className(item?.id)} onClick={() => !formActionType?.addMode || (formActionType?.addMode && item?.id <= previousSection && currentSection !== AMC_REGISTRATION_SECTION.THANK_YOU_PAGE.id ? onHandle(item?.id) : '')}>
                            {item.title}
                        </div>
                    ),
                    className: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.activeClassName,
                }
        )
        ?.filter((i) => i);

    return items && <Timeline items={items} />;
};

export default MenuNav;
