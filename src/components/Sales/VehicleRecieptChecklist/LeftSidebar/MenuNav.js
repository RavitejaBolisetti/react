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
import { VEHICLE_RECIEPT_CHECKLIST_SECTION } from 'constants/VehicleRecieptCheckListSection';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, addMode, editMode } = props;
    const vehicleSectionList = Object.values(VEHICLE_RECIEPT_CHECKLIST_SECTION);

    const onHandle = (key) => {
        setCurrentSection(key);
    };

    const items = vehicleSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map((item) => ({
            dot: item?.id === currentSection && (addMode || editMode) ? <BsRecordCircleFill className={styles.activeForm} /> : <FaCheckCircle />,
            children: (
                <p className={item?.id !== currentSection ? styles.tableTextColor85 : ''} onClick={() => onHandle(item?.id)}>
                    {item?.title}
                </p>
            ),
            className: item?.id === currentSection ? 'active' : 'inActive',
        }));

    const finalItem = items?.filter((i) => i);

    return finalItem && <Timeline items={finalItem} />;
};

export default MenuNav;
