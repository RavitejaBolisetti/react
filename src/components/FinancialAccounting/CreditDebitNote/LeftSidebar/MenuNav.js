/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';
import styles from 'assets/sass/app.module.scss';

import { CREDIT_DEBIT_SECTION } from 'constants/CreditDebitSection';
import { getSelectedMenuAttribute } from 'utils/getSelectedMenuAttribute';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, formActionType, previousSection = 1 } = props;
    const creditDebitSectionList = Object.values(CREDIT_DEBIT_SECTION);

    const onHandle = (key) => {
        setCurrentSection(key);
    };

    const className = (id) => {
        return formActionType?.addMode && id > previousSection ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    const items = creditDebitSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map((item) => ({
            dot: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.menuNavIcon,
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
