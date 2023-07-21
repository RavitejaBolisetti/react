/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableCloumn';
import { VehicleReceiptStatusTag } from './utils/VehicleReceiptStatusTag';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'GRN Type.',
            dataIndex: 'otfNumber',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'GRN Number',
            dataIndex: 'otfDate',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
        }),
        tblPrepareColumns({
            title: 'GRN Date',
            dataIndex: 'customerName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Supplier Name',
            dataIndex: 'mobileNumber',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Supplier Invoice Number',
            dataIndex: 'model',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'orderStatus',
            width: '12%',
            render: (_, record) => VehicleReceiptStatusTag(record.orderStatus),
        }),

        tblActionColumn({ handleButtonClick, styles, width: '10%', EditIcon: true }),
    ];

    return tableColumn;
};
