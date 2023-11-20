/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { AMC_CONSTANTS } from './AMCConstants';

export const AMCStatusTags = (status) => {
    let tag = '';
    switch (status) {
        case AMC_CONSTANTS.APPROVED.key:
            tag = <Tag color="success">{AMC_CONSTANTS.APPROVED.title}</Tag>;
            break;

        case AMC_CONSTANTS.REJECTED.key:
            tag = <Tag color="error">{AMC_CONSTANTS.REJECTED.title}</Tag>;
            break;

        case AMC_CONSTANTS.PENDING_FOR_CANCELLATION.key:
            tag = <Tag color="warning">{AMC_CONSTANTS.PENDING_FOR_CANCELLATION.title}</Tag>;
            break;
        case AMC_CONSTANTS.PENDING_FOR_APPROVAL.key:
            tag = <Tag color="warning">{AMC_CONSTANTS.PENDING_FOR_APPROVAL.title}</Tag>;
            break;
        case AMC_CONSTANTS?.CANCELLED?.key:
            tag = <Tag color="error">{AMC_CONSTANTS?.CANCELLED?.title}</Tag>;
            break;

        default:
    }
    return tag;
};

export const AMCStatusValues = (status) => {
    let value = '';
    switch (status) {
        case AMC_CONSTANTS.APPROVED.key:
            value = AMC_CONSTANTS.APPROVED.title;
            break;

        case AMC_CONSTANTS.REJECTED.key:
            value = AMC_CONSTANTS.REJECTED.title;
            break;

        case AMC_CONSTANTS.PENDING_FOR_CANCELLATION.key:
            value = AMC_CONSTANTS.PENDING_FOR_CANCELLATION.title;
            break;
        case AMC_CONSTANTS.PENDING_FOR_APPROVAL.key:
            value = AMC_CONSTANTS.PENDING_FOR_APPROVAL.title;
            break;
        case AMC_CONSTANTS?.CANCELLED?.key:
            value = AMC_CONSTANTS?.CANCELLED?.title;
            break;

        default:
    }
    return value;
};
