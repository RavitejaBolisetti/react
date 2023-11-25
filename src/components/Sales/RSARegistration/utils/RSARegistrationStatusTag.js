/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { RSA_REGISTRATION_STATUS, RSA_REGISTRATION_STATUS_MNM_USER } from './RSARegistrationStatus';

export const RSARegistrationStatusTag = (status) => {
    let tag = '';
    switch (status) {
        case RSA_REGISTRATION_STATUS.PENDING.key:
            tag = <Tag color="warning">{RSA_REGISTRATION_STATUS.PENDING.title}</Tag>;
            break;
        case RSA_REGISTRATION_STATUS_MNM_USER.PENDING_FOR_APPROVAL.key:
            tag = <Tag color="warning">{RSA_REGISTRATION_STATUS_MNM_USER.PENDING_FOR_APPROVAL.title}</Tag>;
            break;
        case RSA_REGISTRATION_STATUS_MNM_USER.PENDING_FOR_CANCELLATION.key:
            tag = <Tag color="warning">{RSA_REGISTRATION_STATUS_MNM_USER.PENDING_FOR_CANCELLATION.title}</Tag>;
            break;
        case RSA_REGISTRATION_STATUS.APPROVED.key:
            tag = <Tag color="success">{RSA_REGISTRATION_STATUS.APPROVED.title}</Tag>;
            break;
        case RSA_REGISTRATION_STATUS.REJECTED.key:
            tag = <Tag color="error">{RSA_REGISTRATION_STATUS.REJECTED.title}</Tag>;
            break;
        case RSA_REGISTRATION_STATUS.CANCELLED.key:
            tag = <Tag color="error">{RSA_REGISTRATION_STATUS.CANCELLED.title}</Tag>;
            break;

        default:
    }
    return tag;
};
