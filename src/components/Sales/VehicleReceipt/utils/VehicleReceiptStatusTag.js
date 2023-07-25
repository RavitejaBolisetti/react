/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { VEHICLE_RECEIPT_STATUS } from 'constants/VehicleReceiptStatus';
import styles from 'components/common/Common.module.css';

export const VehicleReceiptStatusTag = (status) => {
    let tag = '';
    switch (status) {
        case VEHICLE_RECEIPT_STATUS.BOOKED.key:
            tag = <Tag color="success">{VEHICLE_RECEIPT_STATUS.BOOKED.desc}</Tag>;
            break;
        case VEHICLE_RECEIPT_STATUS.ALLOTED.key:
            tag = <Tag color="success">{VEHICLE_RECEIPT_STATUS.ALLOTED.desc}</Tag>;
            break;
        case VEHICLE_RECEIPT_STATUS.CANCELLED.key:
            tag = <Tag color="error">{VEHICLE_RECEIPT_STATUS.CANCELLED.desc}</Tag>;
            break;
        case VEHICLE_RECEIPT_STATUS.INVOICED.key:
            tag = <Tag color="purple">{VEHICLE_RECEIPT_STATUS.INVOICED.desc}</Tag>;
            break;
        case VEHICLE_RECEIPT_STATUS.DELIVERED.key:
            tag = <Tag color="success">{VEHICLE_RECEIPT_STATUS.DELIVERED.desc}</Tag>;
            break;
        case VEHICLE_RECEIPT_STATUS.TRANSFERRED.key:
            tag = <Tag color="processing">{VEHICLE_RECEIPT_STATUS.TRANSFERRED.desc}</Tag>;
            break;
        case VEHICLE_RECEIPT_STATUS.PENDING_FOR_CANCELLATION.key:
            tag = <Tag color="warning">{VEHICLE_RECEIPT_STATUS.PENDING_FOR_CANCELLATION.desc}</Tag>;
            break;
        case VEHICLE_RECEIPT_STATUS.CANCELLATION_REQUESTED.key:
            tag = <Tag color="warning">{VEHICLE_RECEIPT_STATUS.CANCELLATION_REQUESTED.desc}</Tag>;
            break;
        case VEHICLE_RECEIPT_STATUS.REJECTED.key:
            tag = <Tag color="error">{VEHICLE_RECEIPT_STATUS.REJECTED.desc}</Tag>;
            break;
        default:
    }
    return tag;
};
