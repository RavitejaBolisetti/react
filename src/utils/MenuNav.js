/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';
import { getSelectedMenuAttribute } from 'utils/getSelectedMenuAttribute';

import styles from 'assets/sass/app.module.scss';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, formActionType, previousSection = 1, handleUnSavedChangeFn = undefined, menuItem } = props;

    const onHandle = (key) => (handleUnSavedChangeFn ? handleUnSavedChangeFn(() => setCurrentSection(key)) : setCurrentSection(key));
    const className = (id) => {
        return formActionType?.addMode && id > previousSection ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    const items = menuItem
        ?.flatMap((item) => {
            if (item?.displayOnList) {
                const { menuNavIcon, activeClassName } = getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType });
                return {
                    dot: menuNavIcon,
                    children: (
                        <div className={className(item?.id)} onClick={() => (!formActionType?.addMode || (formActionType?.addMode && item?.id <= previousSection) ? onHandle(item?.id) : '')}>
                            {item?.title}
                        </div>
                    ),
                    className: activeClassName,
                };
            }
            return undefined;
        })
        ?.filter((i) => i);

    return items && <Timeline items={items} />;
};

export default MenuNav;
