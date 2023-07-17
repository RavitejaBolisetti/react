/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { VEHICLE_DETAIL_STATUS } from 'constants/VehicleDetailStatus';
import styles from 'components/common/Common.module.css';

export const VechilePurchaseOrderStatusTag = (status) => {
    let tag = '';
    switch (status) {
        case VEHICLE_DETAIL_STATUS.BOOKED.title:
            tag = <Tag className={styles.success}>{VEHICLE_DETAIL_STATUS.BOOKED.desc}</Tag>;
            break;
        case VEHICLE_DETAIL_STATUS.ALLOTED.title:
            tag = <Tag className={styles.success}>{VEHICLE_DETAIL_STATUS.ALLOTED.desc}</Tag>;
            break;
        case VEHICLE_DETAIL_STATUS.CANCELLED.title:
            tag = <Tag className={styles.error}>{VEHICLE_DETAIL_STATUS.CANCELLED.desc}</Tag>;
            break;
        case VEHICLE_DETAIL_STATUS.INVOICED.title:
            tag = <Tag className={styles.violet}>{VEHICLE_DETAIL_STATUS.INVOICED.desc}</Tag>;
            break;
        case VEHICLE_DETAIL_STATUS.DELIVERED.title:
            tag = <Tag className={styles.success}>{VEHICLE_DETAIL_STATUS.DELIVERED.desc}</Tag>;
            break;
        case VEHICLE_DETAIL_STATUS.TRANSFERRED.title:
            tag = <Tag className={styles.info}>{VEHICLE_DETAIL_STATUS.TRANSFERRED.desc}</Tag>;
            break;
        case VEHICLE_DETAIL_STATUS.PENDING_FOR_CANCELLATION.title:
            tag = <Tag className={styles.warning}>{VEHICLE_DETAIL_STATUS.PENDING_FOR_CANCELLATION.desc}</Tag>;
            break;
        case VEHICLE_DETAIL_STATUS.CANCELLATION_REQUESTED.title:
            tag = <Tag className={styles.warning}>{VEHICLE_DETAIL_STATUS.CANCELLATION_REQUESTED.desc}</Tag>;
            break;
        case VEHICLE_DETAIL_STATUS.REJECTED.title:
            tag = <Tag className={styles.error}>{VEHICLE_DETAIL_STATUS.REJECTED.desc}</Tag>;
            break;
        default:
    }
    return tag;
};
