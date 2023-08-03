/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableCloumn';
import { VechilePurchaseOrderStatusTag } from './utils/VechilePurchaseOrderStatusTag';
// import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Purchase Order ID',
            dataIndex: 'purchaseOrderNumber',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Purchase Order Date ',
            dataIndex: 'purchaseOrderDate',
            width: '14%',
        }),

        tblPrepareColumns({ 
            title: 'Order Type',
            dataIndex: 'orderType',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'purchaseOrderStatus',
            width: '14%',
            render: (_, record) => VechilePurchaseOrderStatusTag(record.orderStatus),
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%' }),
    ];

    return tableColumn;
};
