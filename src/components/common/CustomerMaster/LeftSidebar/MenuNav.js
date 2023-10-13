/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';

import { CUSTOMER_INDIVIDUAL_SECTION } from 'constants/CustomerIndividualSection';
import { CUSTOMER_CORPORATE_SECTION } from 'constants/CustomerCorporateSection';
import { CUSTOMER_TYPE } from 'constants/CustomerType';

import styles from 'assets/sass/app.module.scss';
import { getSelectedMenuAttribute } from 'utils/getSelectedMenuAttribute';

const MenuNav = (props) => {
    const { customerType, currentSection, setCurrentSection, formActionType } = props;
    const profileOptions = customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? Object.values(CUSTOMER_INDIVIDUAL_SECTION) : Object.values(CUSTOMER_CORPORATE_SECTION);
    const { previousSection } = props;

    const className = (id) => {
        return formActionType?.addMode && id > previousSection ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    const onHandle = (key) => {
        setCurrentSection(key);
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
