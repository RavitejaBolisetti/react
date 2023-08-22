/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
// import { USER_ACCESS_SECTION } from 'constants/modules/UserManagement/userAccessSection';
import { USER_ACCESS_SECTION_DEALER, USER_ACCESS_SECTION_MANUFACTURER } from 'constants/modules/UserManagement/userAccessSection';
import { USER_TYPE_USER } from 'constants/modules/UserManagement/userType';

import styles from 'components/common/Common.module.css';

const MenuNav = (props) => {
    const {
        userType,
        currentSection,
        setCurrentSection,
        formActionType: { addMode = true, editMode, viewMode },
        selectedCustomerId,
    } = props;
    const profileOptions = userType === USER_TYPE_USER?.DEALER?.id ? USER_ACCESS_SECTION_DEALER : USER_ACCESS_SECTION_MANUFACTURER;

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
            // console.log('TimeLineClass', TimeLineClass);
            TimeLineClass[TimeLineClass?.length - 1].firstChild.style.display = 'none';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection]);

    const onHandle = (item) => {
        if ((addMode && item.enableOnAdd) || editMode || viewMode) {
            setCurrentSection(item.id);
        }
    };

    const className = (item) => {
        return addMode && !item.enableOnAdd ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    // const items = Object.values(profileOptions)?.map((i) => ({
    //     dot: addMode && !i.enableOnAdd ? <BsRecordCircleFill className={className(i)} color={'#B5B5B'} /> : i.id === currentSection.id ? <BsRecordCircleFill className={`${styles.activeForm} ${className(i)}`} /> : <FaCheckCircle className={className(i)} />,
    //     children: (
    //         <div className={className(i)} onClick={() => onHandle(i)}>
    //             {i.title}
    //         </div>
    //     ),
    // }));

    const items = Object.values(profileOptions)?.map((i) => ({
        dot: i.id === currentSection ? <BsRecordCircleFill className={`${styles.activeForm} ${i}`} /> : addMode && !i.enableOnAdd ? <BsRecordCircleFill className={className(i)} color={'grey'} /> : <FaCheckCircle className={className(i)} />,
        children: (
            <div className={className(i)} onClick={() => onHandle(i)}>
                {i.title}
            </div>
        ),
    }));

    return <Timeline items={items} />;
};

export default MenuNav;
