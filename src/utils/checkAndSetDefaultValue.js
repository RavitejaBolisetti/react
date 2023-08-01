/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { InputSkeleton } from 'components/common/Skeleton';
import { convertDate } from 'utils/formatDateTime';
import { DATA_TYPE } from 'constants/dataType';
import { OTF_STATUS } from 'constants/OTFStatus';
import { addToolTip } from 'utils/customMenuLink';

export const checkAndSetDefaultValue = (value, isLoading, type, makeToolTip = false, text) => {
    if (isLoading) return <InputSkeleton width={'100px'} height={20} theme={'card'} />;
    if (makeToolTip && text)
        return (
            <a href={text} target="_blank" rel="noreferrer">
                {addToolTip(text)(text)}
            </a>
        );
    switch (type) {
        case DATA_TYPE?.BOOL?.key:
            return value ? 'Yes' : 'No';
        case DATA_TYPE?.DATE?.key:
            return value ? convertDate(value, 'DD MMM YYYY') : '-';
        default:
            return value || '-';
    }
};

export const getNameFromKey = (list, key) => {
    let name = list?.find((el) => el?.key === key)?.value;
    return name;
};

export const getStatus = (status) => {
    let tag = '';
    switch (status) {
        case OTF_STATUS.BOOKED.key:
            tag = OTF_STATUS.BOOKED.desc;
            break;
        case OTF_STATUS.ALLOTED.key:
            tag = OTF_STATUS.ALLOTED.desc;
            break;
        case OTF_STATUS.CANCELLED.key:
            tag = OTF_STATUS.CANCELLED.desc;
            break;
        case OTF_STATUS.INVOICED.key:
            tag = OTF_STATUS.INVOICED.desc;
            break;
        case OTF_STATUS.DELIVERED.key:
            tag = OTF_STATUS.DELIVERED.desc;
            break;
        case OTF_STATUS.TRANSFERRED.key:
            tag = OTF_STATUS.TRANSFERRED.desc;
            break;
        case OTF_STATUS.PENDING_FOR_CANCELLATION.key:
            tag = OTF_STATUS.PENDING_FOR_CANCELLATION.desc;
            break;
        case OTF_STATUS.CANCELLATION_REQUESTED.key:
            tag = OTF_STATUS.CANCELLATION_REQUESTED.desc;
            break;
        case OTF_STATUS.REJECTED.key:
            tag = OTF_STATUS.REJECTED.desc;
            break;
        default:
    }
    return tag;
};
