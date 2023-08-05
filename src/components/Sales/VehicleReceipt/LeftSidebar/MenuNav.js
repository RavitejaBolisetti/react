/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

import { VEHICLE_RECEIPT_SECTION } from 'constants/VehicleReceiptSection';

import styles from 'components/common/Common.module.css';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, otfData, selectedOrder: { orderStatus = false } = {} } = props;
    const vehicleReceiptSectionList = Object.values(VEHICLE_RECEIPT_SECTION);

    const onHandle = (key) => {
        setCurrentSection(key);
    };

    const items = vehicleReceiptSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map((item) => ({
            dot: item?.id === currentSection ? <BsRecordCircleFill className={styles.activeForm} /> : <FaCheckCircle />,
            children: <p onClick={() => onHandle(item?.id)}>{item?.title}</p>,
            className: item?.id === currentSection ? 'active' : 'noactive',
        }));
    const finalItem = items?.filter((i) => i);

    return finalItem && <Timeline items={finalItem} />;
};

export default MenuNav;
