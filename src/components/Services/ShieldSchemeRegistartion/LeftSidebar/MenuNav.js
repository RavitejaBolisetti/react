/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';

import { SHIELD_REGISTRATION_SECTION } from 'constants/ShieldSchemeRegistrationSection';
import { validateShieldRegistrationMenu } from '../utils/validateShieldMenu';
import { getSelectedMenuAttribute } from 'utils/getSelectedMenuAttribute';

import styles from 'assets/sass/app.module.scss';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, formActionType, setSection } = props;
    const { previousSection } = props;
    const shieldSectionList = Object.values(SHIELD_REGISTRATION_SECTION);

    const className = (id) => {
        if (currentSection === SHIELD_REGISTRATION_SECTION.THANK_YOU_PAGE.id) return styles.cursorNotAllowed;
        return formActionType?.addMode && id > previousSection ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    const onHandle = ({ key, item }) => {
        setCurrentSection(key);
        setSection(item);
    };

    const items = shieldSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map(
            (item) =>
                validateShieldRegistrationMenu({ item, formActionType }) && {
                    dot: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.menuNavIcon,
                    children: (
                        <div className={className(item?.id)} onClick={() => ((!formActionType?.addMode || (formActionType?.addMode && item?.id <= previousSection)) && currentSection !== SHIELD_REGISTRATION_SECTION.THANK_YOU_PAGE.id ? onHandle({ item, key: item?.id }) : '')}>
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
