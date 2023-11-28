/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { VEHICLE_PURCHASE_ORDER_STATUS } from 'constants/VehiclePurchaseOrderStatus';

export const VechilePurchaseOrderStatusTag = (status) => {
    let tag = '';
    switch (status) {
        case VEHICLE_PURCHASE_ORDER_STATUS.PO_SUBMITTED.key:
            tag = <Tag color="success">{VEHICLE_PURCHASE_ORDER_STATUS.PO_SUBMITTED.title}</Tag>;
            break;
        case VEHICLE_PURCHASE_ORDER_STATUS.CANCEL.key:
            tag = <Tag color="error">{VEHICLE_PURCHASE_ORDER_STATUS.CANCEL.title}</Tag>;
            break;
        case VEHICLE_PURCHASE_ORDER_STATUS.CANCELLATION_REQUESTED.key:
            tag = <Tag color="warning">{VEHICLE_PURCHASE_ORDER_STATUS.CANCELLATION_REQUESTED.title}</Tag>;
            break;
        case VEHICLE_PURCHASE_ORDER_STATUS.HOLD.key:
            tag = <Tag color="warning">{VEHICLE_PURCHASE_ORDER_STATUS.HOLD.title}</Tag>;
            break;
        case VEHICLE_PURCHASE_ORDER_STATUS.RELEASE.key:
            tag = <Tag color="processing">{VEHICLE_PURCHASE_ORDER_STATUS.RELEASE.title}</Tag>;
            break;
        case VEHICLE_PURCHASE_ORDER_STATUS.RECEIVED.key:
            tag = <Tag color="success">{VEHICLE_PURCHASE_ORDER_STATUS.RECEIVED.title}</Tag>;
            break;
        case VEHICLE_PURCHASE_ORDER_STATUS.SO_GENERATED.key:
            tag = <Tag color="success">{VEHICLE_PURCHASE_ORDER_STATUS.SO_GENERATED.title}</Tag>;
            break;
        case VEHICLE_PURCHASE_ORDER_STATUS.INVOICED.key:
            tag = <Tag color="purple">{VEHICLE_PURCHASE_ORDER_STATUS.INVOICED.title}</Tag>;
            break;
        case VEHICLE_PURCHASE_ORDER_STATUS.DLT?.key:
            tag = <Tag color="error">{VEHICLE_PURCHASE_ORDER_STATUS.DLT.title}</Tag>;
            break;

        default:
    }
    return tag;
};
