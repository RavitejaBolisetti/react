/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

import { OTF_SECTION } from 'constants/OTFSection';
import { validateOTFMenu } from '../utils/validateOTFMenu';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, otfData, selectedOrder: { orderStatus = false } = {} } = props;
    const otfSectionList = Object.values(OTF_SECTION);

    // useEffect(() => {
    //     if (currentSection) {
    //         const TimeLineClass = document.getElementsByClassName('ant-timeline-item');
    //         for (let i = 0; i < TimeLineClass.length; i++) {
    //             const activeForm = TimeLineClass[i]['children']['1']['children']['0']['classList']['0'];
    //             if (activeForm !== undefined && activeForm.match('Common_activeForm')) {
    //                 TimeLineClass[i].firstChild.style.backgroundColor = '#ff3e5b';
    //                 TimeLineClass[i].lastChild.firstChild.style.color = '#ff3e5b';
    //             } else {
    //                 TimeLineClass[i].firstChild.style.backgroundColor = '#ff3e5b';
    //                 TimeLineClass[i].lastChild.firstChild.style.color = '#0b0b0c';
    //             }
    //         }
    //         console.log('TimeLineClass', TimeLineClass);
    //         TimeLineClass[TimeLineClass?.length - 1].firstChild.style.display = 'none';
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [currentSection]);

    const onHandle = (key) => {
        setCurrentSection(key);
    };

    const items = otfSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map(
            (item) =>
                validateOTFMenu({ item, status: orderStatus, otfData }) && {
                    dot: item?.id === currentSection ? <BsRecordCircleFill className={styles.activeForm} /> : <FaCheckCircle />,
                    children: <p onClick={() => onHandle(item?.id)}>{item?.title}</p>,
                    className: item?.id === currentSection ? 'active' : 'noactive',
                }
        );
    const finalItem = items?.filter((i) => i);

    return finalItem && <Timeline items={finalItem} />;
};

export default MenuNav;
