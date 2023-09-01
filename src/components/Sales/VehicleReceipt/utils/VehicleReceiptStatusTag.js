/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { VEHICLE_RECEIPT_STATUS } from 'constants/VehicleReceiptStatus';

import styles from 'assets/sass/app.module.scss';

export const VehicleReceiptStatusTag = (status) => {
    let tag = '';
    switch (status) {
        case VEHICLE_RECEIPT_STATUS.RECEIVED.key:
            tag = <Tag className={styles.success}>{VEHICLE_RECEIPT_STATUS.RECEIVED.desc}</Tag>;
            break;
        case VEHICLE_RECEIPT_STATUS.RETURNED.key:
            tag = <Tag className={styles.error}>{VEHICLE_RECEIPT_STATUS.RETURNED.desc}</Tag>;
            break;
        case VEHICLE_RECEIPT_STATUS.PARTIALLY_RECEIVED.key:
            tag = <Tag className={styles.violet}>{VEHICLE_RECEIPT_STATUS.PARTIALLY_RECEIVED.desc}</Tag>;
            break;
        case VEHICLE_RECEIPT_STATUS.IN_TRANSIT.key:
            tag = <Tag className={styles.warning}>{VEHICLE_RECEIPT_STATUS.IN_TRANSIT.desc}</Tag>;
            break;
        default:
    }
    return tag;
};
