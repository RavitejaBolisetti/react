import React from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

import { CUSTOMER_INDIVIDUAL_SECTION } from 'constants/CustomerIndividualSection';
import { CUSTOMER_CORPORATE_SECTION } from 'constants/CustomerCorporateSection';
import { CUSTOMER_TYPE } from 'constants/CustomerType';

import styles from 'components/common/Common.module.css';

const MenuNav = (props) => {
    const { customerType, currentSection, setCurrentSection } = props;

    const profileOptions = customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION : CUSTOMER_CORPORATE_SECTION;

    const onHandle = (key) => {
        setCurrentSection(key);
    };

    const items = Object.values(profileOptions)?.map((i) => ({ dot: i.id === currentSection ? <BsRecordCircleFill className={styles.activeForm} /> : <FaCheckCircle />, children: <p onClick={() => onHandle(i.id)}>{i.title}</p> }));
    return <Timeline items={items} />;
};

export default MenuNav;
