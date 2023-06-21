import { Tag } from 'antd';
import { OTF_STATUS } from 'constants/OTFStatus';
import styles from 'components/common/Common.module.css';

export const OTFStatusTag = (status) => {
    let tag = '';
    switch (status) {
        case OTF_STATUS.BOOKED.id:
            tag = <Tag className={styles.success}>{OTF_STATUS.BOOKED.title}</Tag>;
            break;
        case OTF_STATUS.ALLOTED.id:
            tag = <Tag className={styles.success}>{OTF_STATUS.ALLOTED.title}</Tag>;
            break;
        case OTF_STATUS.CANCELLED.id:
            tag = <Tag className={styles.error}>{OTF_STATUS.CANCELLED.title}</Tag>;
            break;
        case OTF_STATUS.INVOICED.id:
            tag = <Tag className={styles.violet} >{OTF_STATUS.INVOICED.title}</Tag>;
            break;
        case OTF_STATUS.DELIVERED.id:
            tag = <Tag className={styles.success}>{OTF_STATUS.DELIVERED.title}</Tag>;
            break;
        case OTF_STATUS.TRANSFERRED.id:
            tag = <Tag className={styles.info}>{OTF_STATUS.TRANSFERRED.title}</Tag>;
            break;
        case OTF_STATUS.PENDING_FOR_CANCELLATION.id:
            tag = <Tag className={styles.warning}>{OTF_STATUS.PENDING_FOR_CANCELLATION.title}</Tag>;
            break;
        default:
    }
    return tag;
};
