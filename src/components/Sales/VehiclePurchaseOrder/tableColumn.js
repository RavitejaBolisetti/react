/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { VechilePurchaseOrderStatusTag } from './utils/VechilePurchaseOrderStatusTag';
import { converDateDayjs, dateFormatView } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('vehiclePurchaseOrder.label.purchaseOrderNumber'),
            dataIndex: 'purchaseOrderNumber',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('vehiclePurchaseOrder.label.purchaseOrderDate'),
            dataIndex: 'purchaseOrderDate',
            width: '14%',
            render: (text) => converDateDayjs(text, dateFormatView, '-'),
        }),

        tblPrepareColumns({
            title: translateContent('vehiclePurchaseOrder.label.orderType'),
            dataIndex: 'orderType',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('vehiclePurchaseOrder.label.status'),
            dataIndex: 'purchaseOrderStatus',
            width: '14%',
            render: (_, record) => VechilePurchaseOrderStatusTag(record?.purchaseOrderStatusCode),
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
