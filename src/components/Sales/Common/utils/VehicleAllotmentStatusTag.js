/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { VEHICLE_ALLOTMENT_STATUS } from 'constants/VehicleAllotmentStatus';

export const vehicleAllotmentStatusTag = (status) => {
    let tag = '';
    switch (status) {
        case VEHICLE_ALLOTMENT_STATUS.TRANSIT.key:
            tag = <Tag color="warning">{VEHICLE_ALLOTMENT_STATUS.TRANSIT.desc}</Tag>;
            break;
        case VEHICLE_ALLOTMENT_STATUS.RECEIVED.key:
            tag = <Tag color="success">{VEHICLE_ALLOTMENT_STATUS.RECEIVED.desc}</Tag>;
            break;
        default:
    }
    return tag;
};
