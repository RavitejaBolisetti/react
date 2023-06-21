/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

import { CUSTOMER_INDIVIDUAL_SECTION } from 'constants/CustomerIndividualSection';
import { CUSTOMER_CORPORATE_SECTION } from 'constants/CustomerCorporateSection';
import { CUSTOMER_TYPE } from 'constants/CustomerType';

import styles from 'components/common/Common.module.css';

const MenuNav = (props) => {
    const { customerType, currentSection, setCurrentSection, formActionType: { addMode, editMode, viewMode } = undefined } = props;

    const profileOptions = customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION : CUSTOMER_CORPORATE_SECTION;

    const onHandle = (item) => {
        if ((addMode && item.enableOnAdd) || editMode || viewMode) {
            setCurrentSection(item?.id);
        }
    };

    const className = (item) => {
        return addMode && !item.enableOnAdd ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    const items = Object.values(profileOptions)?.map((i) => ({
        dot: addMode && !i.enableOnAdd ? <BsRecordCircleFill className={className(i)} color={'grey'} /> : i.id === currentSection ? <BsRecordCircleFill className={`${styles.activeForm} ${className(i)}`} /> : <FaCheckCircle className={className(i)} />,
        children: (
            <div style={{ margin: '10px 0px' }} className={className(i)} onClick={() => onHandle(i)}>
                {i.title}
            </div>
        ),
    }));

    return <Timeline items={items} />;
};

export default MenuNav;
