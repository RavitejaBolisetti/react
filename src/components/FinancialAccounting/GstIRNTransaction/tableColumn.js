/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'assets/sass/app.module.scss';
import { convertDateMonthYear } from 'utils/formatDateTime';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Document Type',
            dataIndex: 'invoiceDocumentType',
            width: '18%',
        }),
        tblPrepareColumns({
            title: 'Document Number',
            dataIndex: 'invoiceDocumentNumber',
            width: '18%',
        }),

        tblPrepareColumns({
            title: 'Document Date',
            dataIndex: 'invoiceDocumentDate',
            width: '16%',
            render: (_, record) => (record?.invoiceDocumentDate ? convertDateMonthYear(record?.invoiceDocumentDate) : ''),
        }),

        tblPrepareColumns({
            title: 'Location',
            dataIndex: 'location',
            width: '17%',
        }),
        tblPrepareColumns({
            title: 'IRN Server Response',
            dataIndex: 'irnStatus',
            width: '16%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '15%', canEdit: false, canUpload: true }),
    ];

    return tableColumn;
};
