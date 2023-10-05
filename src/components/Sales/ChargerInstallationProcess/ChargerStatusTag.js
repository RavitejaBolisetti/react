/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { CHARGER_STATUS } from 'constants/ChargerStatus';

export const ChargerStatusTag = (status) => {
    let tag = '';
    switch (status) {
        case CHARGER_STATUS.SUCCESS.key:
            tag = <Tag color="success">{CHARGER_STATUS.SUCCESS.desc}</Tag>;
            break;
        case CHARGER_STATUS.IN_PROGRESS.key:
            tag = <Tag color="warning">{CHARGER_STATUS.IN_PROGRESS.desc}</Tag>;
            break;
        default:
    }
    return tag;
};
