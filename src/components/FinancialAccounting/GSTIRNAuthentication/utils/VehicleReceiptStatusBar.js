/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Steps } from 'antd';

import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

import { VEHICLE_RECEIPT_STATUS } from 'constants/VehicleReceiptStatus';

export const VehicleReceiptStatusBar = (props) => {
    const { status } = props;

    const vehicleReceiptStatusList = Object.values(VEHICLE_RECEIPT_STATUS);
    const currentStatusId = vehicleReceiptStatusList?.find((i) => i.key === status)?.id;

    let displayItem = '';
    if (status === VEHICLE_RECEIPT_STATUS.CANCELLED.title) {
        displayItem = vehicleReceiptStatusList.filter((i) => i.displayOnView && (i?.id === VEHICLE_RECEIPT_STATUS.CANCELLED.id || i?.id === VEHICLE_RECEIPT_STATUS.BOOKED.id));
    } else {
        displayItem = vehicleReceiptStatusList.filter((i) => i.displayOnView && i?.id !== VEHICLE_RECEIPT_STATUS.CANCELLED.id);
    }

    return (
        <Steps
            current={0}
            size="small"
            labelPlacement="vertical"
            items={displayItem.map((i) => ({
                ...i,
                icon: i.id <= currentStatusId ? <FaCheckCircle color={'#70C922'} /> : <BsRecordCircleFill color={'#b5b5b6'} />,
            }))}
        />
    );
};
