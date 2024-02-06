/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { ONROAD_PRICE_MASTER_STATUS } from 'constants/OnRoadPriceMasterStatus';
export const ShowStatusTagAndButtons = (key, status) => {
    if (key === ONROAD_PRICE_MASTER_STATUS?.ACTIONED?.title) {
        return [ONROAD_PRICE_MASTER_STATUS.ACTIONED.key, ONROAD_PRICE_MASTER_STATUS.ACTIONED.key2, ONROAD_PRICE_MASTER_STATUS.ACTIONED.title]?.includes(status);
    } else if (key === ONROAD_PRICE_MASTER_STATUS?.UNACTIONED?.title) {
        return [ONROAD_PRICE_MASTER_STATUS.UNACTIONED.key, ONROAD_PRICE_MASTER_STATUS.UNACTIONED.key2, ONROAD_PRICE_MASTER_STATUS.UNACTIONED.title]?.includes(status);
    }
    return false;
};
export const OnRoadPriceStatusTag = (status) => {
    let tag = '-';
    switch (true) {
        case ShowStatusTagAndButtons(ONROAD_PRICE_MASTER_STATUS.ACTIONED.title, status):
            tag = <Tag color="success">{ONROAD_PRICE_MASTER_STATUS.ACTIONED.title}</Tag>;
            break;
        case ShowStatusTagAndButtons(ONROAD_PRICE_MASTER_STATUS.UNACTIONED.title, status):
            tag = <Tag color="error">{ONROAD_PRICE_MASTER_STATUS.UNACTIONED.title}</Tag>;
            break;
        default:
            return tag;
    }
    return tag;
};
