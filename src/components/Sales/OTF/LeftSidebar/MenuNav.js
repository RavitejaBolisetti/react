/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';
import { OTF_SECTION } from 'constants/OTFSection';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection } = props;
    const otfSectionList = Object.values(OTF_SECTION);

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
            console.log('TimeLineClass', TimeLineClass);
            TimeLineClass[TimeLineClass?.length - 1].firstChild.style.display = 'none';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection]);

    const onHandle = (key) => {
        setCurrentSection(key);
    };

    const items = otfSectionList?.map((i) => ({
        dot: i.id === currentSection ? <BsRecordCircleFill className={styles.activeForm} /> : <FaCheckCircle />,
        children: <p onClick={() => onHandle(i.id)}>{i.title}</p>,
    }));

    return <Timeline items={items} />;
};

export default MenuNav;
