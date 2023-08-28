/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import styles from 'assets/sass/app.module.scss';

export const accordianExpandIcon = ({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />);

export const expandIcon = ({ isActive }) => (isActive ? <MinusOutlined className={styles.iconsColor} /> : <PlusOutlined className={styles.iconsColor} />);

export const expandIconWithText = (isActive, ExpandIcon, InactiveIcon, activeText = 'Edit', inactiveText = 'Edit') => {
    return (
        <div className={styles.accordianIconWithText}>
            {dynamicExpandIcon(isActive, ExpandIcon, InactiveIcon, activeText, inactiveText)}
            {isActive ? <div className={styles.activeTextColor}>{activeText}</div> : inactiveText}
        </div>
    );
};

export const dynamicExpandIcon = (isActive, ExpandIcon = <AiOutlinePlus className={styles.iconsColor} />, InactiveIcon = <AiOutlineMinus className={styles.iconsColor} />, activeText = '', inactiveText = '') => {
    if (isActive) {
        return InactiveIcon;
    }
    return ExpandIcon;
};
