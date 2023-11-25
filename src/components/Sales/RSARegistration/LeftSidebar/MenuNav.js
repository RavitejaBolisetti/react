/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';

import { RSA_LEFTMENU_SECTION } from 'components/Sales/RSARegistration/constant/RSALeftMenuSection';
import { validateRSAMenu } from '../utils/validateRSAMenu';
import { getSelectedMenuAttribute } from 'utils/getSelectedMenuAttribute';

import styles from 'assets/sass/app.module.scss';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, formActionType, setSection, previousSection, selectedOrder: { orderStatus = false } = {} } = props;

    const leftMenuSectionList = Object.values(RSA_LEFTMENU_SECTION);

    const onHandle = ({ key, item }) => {
        setCurrentSection(key);
        setSection(item);
    };

    const className = (id) => {
        if (currentSection === RSA_LEFTMENU_SECTION.THANK_YOU_PAGE.id) return styles.cursorNotAllowed;
        return formActionType?.addMode && id > previousSection ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    const items = leftMenuSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map(
            (item) =>
                validateRSAMenu({ item, status: orderStatus, formActionType }) && {
                    dot: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.menuNavIcon,
                    children: (
                        <div className={className(item?.id)} onClick={() => ((!formActionType?.addMode || (formActionType?.addMode && item?.id <= previousSection)) && currentSection !== RSA_LEFTMENU_SECTION.THANK_YOU_PAGE.id ? onHandle({ item, key: item?.id }) : '')}>
                            {item.title}
                        </div>
                    ),
                    className: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.activeClassName,
                }
        );
    const finalItem = items?.filter((i) => i);

    return finalItem && <Timeline items={finalItem} />;
};

export default MenuNav;
