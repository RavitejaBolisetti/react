/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { RSA_QUERY_BUTTONS as QUERY_BUTTONS_CONSTANTS, QUERY_BUTTONS_MNM_USER } from 'components/Sales/CommonScheme/QueryButtons';
import { RSA_CONSTANTS } from './RSA_CONSTANT';

export const RSARegistrationStatusTag = (status) => {
    let tag = '-';
    switch (status) {
        case QUERY_BUTTONS_CONSTANTS.PENDING.key:
            tag = <Tag color="warning">{QUERY_BUTTONS_CONSTANTS.PENDING.title}</Tag>;
            break;
        case QUERY_BUTTONS_MNM_USER.PENDING_FOR_APPROVAL.key:
            tag = <Tag color="warning">{QUERY_BUTTONS_MNM_USER.PENDING_FOR_APPROVAL.title}</Tag>;
            break;
        case QUERY_BUTTONS_MNM_USER.PENDING_FOR_CANCELLATION.key:
            tag = <Tag color="warning">{QUERY_BUTTONS_MNM_USER.PENDING_FOR_CANCELLATION.title}</Tag>;
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
        case RSA_CONSTANTS.UNDER_PROGRESS.key:
            tag = <Tag color="warning">{RSA_CONSTANTS.UNDER_PROGRESS.title}</Tag>;
            break;

        default:
            tag = <Tag color="error">NO STATUS</Tag>;
            break;
    }
    return tag;
};

export const RSAStatusValues = (status) => {
    let value = '';
    switch (status) {
        case QUERY_BUTTONS_CONSTANTS.PENDING.key:
            value = QUERY_BUTTONS_CONSTANTS.PENDING.title;
            break;
        case QUERY_BUTTONS_MNM_USER.PENDING_FOR_APPROVAL.key:
            value = QUERY_BUTTONS_MNM_USER.PENDING_FOR_APPROVAL.title;
            break;
        case QUERY_BUTTONS_MNM_USER.PENDING_FOR_CANCELLATION.key:
            value = QUERY_BUTTONS_MNM_USER.PENDING_FOR_CANCELLATION.title;
            break;
        case QUERY_BUTTONS_CONSTANTS.APPROVED.key:
            value = QUERY_BUTTONS_CONSTANTS.APPROVED.title;
            break;
        case QUERY_BUTTONS_CONSTANTS.REJECTED.key:
            value = QUERY_BUTTONS_CONSTANTS.REJECTED.title;
            break;
        case QUERY_BUTTONS_CONSTANTS.CANCELLED.key:
            value = QUERY_BUTTONS_CONSTANTS.CANCELLED.title;
            break;
        case RSA_CONSTANTS.UNDER_PROGRESS.key:
            value = RSA_CONSTANTS.UNDER_PROGRESS.title;
            break;

        default:
    }
    return value;
};
