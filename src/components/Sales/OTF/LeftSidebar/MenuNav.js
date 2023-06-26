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
import { OTF_SECTION } from 'constants/OTFSection';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection } = props;
    const otfSectionList = Object.values(OTF_SECTION);

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
