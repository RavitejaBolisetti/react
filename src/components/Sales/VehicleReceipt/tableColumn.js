/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from './tableColumnMaster';
import { VehicleReceiptStatusTag } from './utils/VehicleReceiptStatusTag';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';

export const tableColumn = ({ handleButtonClick, page, pageSize, tableIconsVisibility }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'GRN Type',
            dataIndex: 'grnType',
            width: '10%',
        }),

        tblPrepareColumns({
            title: 'GRN Number',
            dataIndex: 'grnNumber',
            width: '12%',
        }),

        tblPrepareColumns({
            title: 'GRN Date',
            dataIndex: 'grnDate',
            width: '12%',
            render: (text) => convertDateMonthYear(text),
        }),

        tblPrepareColumns({
            title: 'Supplier Name',
            dataIndex: 'supplierName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Supplier Invoice Number',
            dataIndex: 'supplierInvoiceNumber',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Supplier Invoice Date',
            dataIndex: 'supplierInvoiceDate',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
        }),

        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            width: '10%',
            render: (_, record) => VehicleReceiptStatusTag(record.status),
        }),

        tblActionColumn({ handleButtonClick, styles, width: '12%', ...tableIconsVisibility }),
    ];

    return tableColumn;
};
