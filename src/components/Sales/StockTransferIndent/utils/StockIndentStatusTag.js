/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { STOCK_INDENT_STATUS } from 'components/Sales/StockTransferIndent/constants/StockIndentStatus';

export const StockIndentStatusTag = (status) => {
    let tag = '';
    switch (status) {
        case STOCK_INDENT_STATUS.OPEN.key:
            tag = <Tag color="warning">{STOCK_INDENT_STATUS.OPEN.desc}</Tag>;
            break;
        case STOCK_INDENT_STATUS.RECEIVED.key:
            tag = <Tag color="success">{STOCK_INDENT_STATUS.RECEIVED.desc}</Tag>;
            break;
        case STOCK_INDENT_STATUS.ISSUED.key:
            tag = <Tag color="success">{STOCK_INDENT_STATUS.ISSUED.desc}</Tag>;
            break;
        case STOCK_INDENT_STATUS.PARTIALLY_RECVD.key:
            tag = <Tag color="warning">{STOCK_INDENT_STATUS.PARTIALLY_RECVD.desc}</Tag>;
            break;
        case STOCK_INDENT_STATUS.PARTIALLY_ISSUED.key:
            tag = <Tag color="warning">{STOCK_INDENT_STATUS.PARTIALLY_ISSUED.desc}</Tag>;
            break;
        case STOCK_INDENT_STATUS.CANCELLED.key:
            tag = <Tag color="error">{STOCK_INDENT_STATUS.CANCELLED.desc}</Tag>;
            break;

        default:
    }
    return tag;
};
