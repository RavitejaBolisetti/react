/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { OTF_STATUS } from 'constants/OTFStatus';
import styles from 'components/common/Common.module.css';

export const OTFStatusTag = (status) => {
    let tag = '';
    switch (status) {
        case OTF_STATUS.BOOKED.key:
            tag = <Tag className={styles.success}>{OTF_STATUS.BOOKED.desc}</Tag>;
            break;
        case OTF_STATUS.ALLOTED.key:
            tag = <Tag className={styles.success}>{OTF_STATUS.ALLOTED.desc}</Tag>;
            break;
        case OTF_STATUS.CANCELLED.key:
            tag = <Tag className={styles.error}>{OTF_STATUS.CANCELLED.desc}</Tag>;
            break;
        case OTF_STATUS.INVOICED.key:
            tag = <Tag className={styles.violet}>{OTF_STATUS.INVOICED.desc}</Tag>;
            break;
        case OTF_STATUS.DELIVERED.key:
            tag = <Tag className={styles.success}>{OTF_STATUS.DELIVERED.desc}</Tag>;
            break;
        case OTF_STATUS.TRANSFERRED.key:
            tag = <Tag className={styles.info}>{OTF_STATUS.TRANSFERRED.desc}</Tag>;
            break;
        case OTF_STATUS.PENDING_FOR_CANCELLATION.key:
            tag = <Tag className={styles.warning}>{OTF_STATUS.PENDING_FOR_CANCELLATION.desc}</Tag>;
            break;
        case OTF_STATUS.CANCELLATION_REQUESTED.key:
            tag = <Tag className={styles.warning}>{OTF_STATUS.CANCELLATION_REQUESTED.desc}</Tag>;
            break;
        case OTF_STATUS.REJECTED.key:
            tag = <Tag className={styles.error}>{OTF_STATUS.REJECTED.desc}</Tag>;
            break;
        case OTF_STATUS.DELIVERY_NOTE.key:
            tag = <Tag className={styles.error}>{OTF_STATUS.DELIVERY_NOTE.desc}</Tag>;
            break;
        default:
    }
    return tag;
};
