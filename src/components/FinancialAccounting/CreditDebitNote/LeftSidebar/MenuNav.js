/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';
import { CREDIT_DEBIT_SECTION } from 'constants/CreditDebitSection';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection } = props;
    const creditDebitSectionList = Object.values(CREDIT_DEBIT_SECTION);

    const onHandle = (key, isClickable) => {
        isClickable && setCurrentSection(key);
    };

    const items = creditDebitSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map((item) => ({
            dot: item?.id === currentSection ? <BsRecordCircleFill className={styles.activeForm} /> : <FaCheckCircle />,
            children: <p onClick={() => onHandle(item?.id, item?.clickable)}>{item?.title}</p>,
            className: item?.id === currentSection ? 'active' : 'noactive',
        }));

    const finalItem = items?.filter((i) => i);

    return finalItem && <Timeline items={finalItem} />;
};

export default MenuNav;
