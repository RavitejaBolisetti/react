/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

import { CUSTOMER_INDIVIDUAL_SECTION } from 'constants/CustomerIndividualSection';
import { CUSTOMER_CORPORATE_SECTION } from 'constants/CustomerCorporateSection';
import { CUSTOMER_TYPE } from 'constants/CustomerType';

import styles from 'assets/sass/app.module.scss';

const MenuNav = (props) => {
    const { customerType, currentSection, setCurrentSection, formActionType: { addMode } = undefined, selectedCustomerId, buttonData, setIsUnsavedDataPopup, setButtonData, setNextCurrentSection } = props;

    const profileOptions = customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION : CUSTOMER_CORPORATE_SECTION;

    useEffect(() => {
        if (currentSection) {
            const TimeLineClass = document.getElementsByClassName('ant-timeline-item');
            for (let i = 0; i < TimeLineClass.length; i++) {
                const activeForm = TimeLineClass[i]['children']['1']['children']['0']['classList']['0'];
                if (activeForm !== undefined && activeForm.match('Common_activeForm')) {
                    TimeLineClass[i].firstChild.style.backgroundColor = '#ff3e5b';
                    TimeLineClass[i].lastChild.firstChild.style.color = '#ff3e5b';
                } else {
                    TimeLineClass[i].firstChild.style.backgroundColor = '#b6b6b6';
                    TimeLineClass[i].lastChild.firstChild.style.color = '#0b0b0c';
                }
            }
            TimeLineClass[TimeLineClass?.length - 1].firstChild.style.display = 'none';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection]);

    const onHandle = (item) => {
        setCurrentSection(item?.id);
    };

    const className = (item) => {
        return !selectedCustomerId && !item.enableOnAdd ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    // dot: addMode && !i.enableOnAdd ? <BsRecordCircleFill className={className(i)} color={'grey'} /> : i.id === currentSection ? <BsRecordCircleFill className={`${styles.activeForm} ${className(i)}`} /> : <FaCheckCircle className={className(i)} />,
    const items = Object.values(profileOptions)?.map((i) => ({
        dot: i.id === currentSection ? <BsRecordCircleFill className={`${styles.activeForm} ${i}`} /> : addMode && !i.enableOnAdd ? <BsRecordCircleFill className={className(i)} color={'grey'} /> : <FaCheckCircle className={className(i)} />,
        children: (
            <div className={className(i)} onClick={() => onHandle(i)}>
                {i.title}
            </div>
        ),
    }));

    return (
        // <div className={styles.marT20}>
        <Timeline items={items} />
        // </div>
    );
};

export default MenuNav;
