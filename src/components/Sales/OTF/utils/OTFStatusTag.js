import { Tag } from 'antd';
import { OTF_STATUS } from 'constants/OTFStatus';

export const OTFStatusTag = (status) => {
    let tag = '';
    switch (status) {
        case OTF_STATUS.BOOKED.id:
            tag = <Tag color="green">{OTF_STATUS.BOOKED.title}</Tag>;
            break;
        case OTF_STATUS.ALLOTED.id:
            tag = <Tag color="green">{OTF_STATUS.ALLOTED.title}</Tag>;
            break;
        case OTF_STATUS.CANCELLED.id:
            tag = <Tag color="error">{OTF_STATUS.CANCELLED.title}</Tag>;
            break;
        case OTF_STATUS.INVOICED.id:
            tag = <Tag color="gray">{OTF_STATUS.INVOICED.title}</Tag>;
            break;
        case OTF_STATUS.DELIVERED.id:
            tag = <Tag color="green">{OTF_STATUS.DELIVERED.title}</Tag>;
            break;
        case OTF_STATUS.TRANSFERRED.id:
            tag = <Tag color="blue">{OTF_STATUS.TRANSFERRED.title}</Tag>;
            break;
        case OTF_STATUS.PENDING_FOR_CANCELLATION.id:
            tag = <Tag color="orange">{OTF_STATUS.PENDING_FOR_CANCELLATION.title}</Tag>;
            break;
        default:
    }
    return tag;
};
