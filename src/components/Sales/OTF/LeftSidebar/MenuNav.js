import React from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';
import { OTF_SECTION } from 'constants/OTFSection';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection } = props;

    const onHandle = (key) => {
        setCurrentSection(key);
    };

    const items = Object.values(OTF_SECTION)?.map((i) => ({ dot: i.id === currentSection ? <BsRecordCircleFill className={styles.activeForm} /> : <FaCheckCircle />, children: <p onClick={() => onHandle(i.id)}>{i.title}</p> }));
    return <Timeline items={items} />;
};

export default MenuNav;