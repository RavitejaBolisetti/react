/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';

import { RECEIPT_SECTION } from 'constants/ReceiptSection';
import { validateReceiptMenu } from '../utils/validateReceiptMenu';
import { getSelectedMenuAttribute } from 'utils/getSelectedMenuAttribute';

import styles from 'assets/sass/app.module.scss';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, receipt, formActionType, previousSection } = props;
    const receiptSectionList = Object.values(RECEIPT_SECTION);

    const onHandle = (key) => {
        setCurrentSection(key);
    };

    const className = (id) => {
        return formActionType?.addMode && id > previousSection ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    const items = receiptSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map(
            (item) =>
                validateReceiptMenu({ item, receipt }) && {
                    dot: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.menuNavIcon,
                    // dot: getSelectedMenuAttribute(item?.id)?.menuNavIcon ? <BsRecordCircleFill className={styles.activeForm} /> : <FaCheckCircle />,
                    children: (
                        <div className={className(item?.id)} onClick={() => (!formActionType?.addMode || (formActionType?.addMode && item?.id <= previousSection) ? onHandle(item?.id) : '')}>
                            {item.title}
                        </div>
                    ),
                    className: getSelectedMenuAttribute({ id: item?.id, currentSection, formActionType })?.activeClassName,
                    // className: getSelectedMenuAttribute(item?.id) ? 'active' : 'noactive',
                }
        );
    const finalItem = items?.filter((i) => i);

    return finalItem && <Timeline items={finalItem} />;
};

export default MenuNav;
