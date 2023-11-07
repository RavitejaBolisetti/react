/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { QUERY_BUTTONS_CONSTANTS } from './ShieldRegistrationContant';
import { QUERY_BUTTONS_MNM_USER } from './ShieldRegistrationContant';

export const SchemeStatusTag = (status) => {
    let tag = '';
    switch (status) {
        case QUERY_BUTTONS_CONSTANTS.PENDING.key:
            tag = <Tag color="success">{QUERY_BUTTONS_CONSTANTS.PENDING.title}</Tag>;
            break;
        case QUERY_BUTTONS_CONSTANTS.APPROVED.key:
            tag = <Tag color="success">{QUERY_BUTTONS_CONSTANTS.APPROVED.title}</Tag>;
            break;
        case QUERY_BUTTONS_CONSTANTS.REJECTED.key:
            tag = <Tag color="error">{QUERY_BUTTONS_CONSTANTS.REJECTED.title}</Tag>;
            break;
        case QUERY_BUTTONS_CONSTANTS.CANCELLED.key:
            tag = <Tag color="error">{QUERY_BUTTONS_CONSTANTS.CANCELLED.title}</Tag>;
            break;
        case QUERY_BUTTONS_MNM_USER.PENDING_FOR_APPROVAL.key:
            tag = <Tag color="warning">{QUERY_BUTTONS_MNM_USER.PENDING_FOR_APPROVAL.title}</Tag>;
            break;
        case QUERY_BUTTONS_MNM_USER.PENDING_FOR_CANCELLATION.key:
            tag = <Tag color="warning">{QUERY_BUTTONS_MNM_USER.PENDING_FOR_CANCELLATION.title}</Tag>;
            break;
        default:
    }
    return tag;
};
