/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'assets/sass/app.module.scss';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('gstIrnTransaction.heading.documentType'),
            dataIndex: 'invoiceDocumentType',
            width: '18%',
        }),
        tblPrepareColumns({
            title: translateContent('gstIrnTransaction.heading.documentNumber'),
            dataIndex: 'invoiceDocumentNumber',
            width: '18%',
        }),

        tblPrepareColumns({
            title: translateContent('gstIrnTransaction.heading.documentDate'),
            dataIndex: 'invoiceDocumentDate',
            width: '16%',
            render: (_, record) => (record?.invoiceDocumentDate ? convertDateMonthYear(record?.invoiceDocumentDate) : ''),
        }),

        tblPrepareColumns({
            title: translateContent('gstIrnTransaction.heading.location'),
            dataIndex: 'location',
            width: '17%',
        }),
        tblPrepareColumns({
            title: translateContent('gstIrnTransaction.heading.irnResponse'),
            dataIndex: 'irnStatus',
            width: '16%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '15%', canEdit: false, canView: false, canUpload: true }),
    ];

    return tableColumn;
};
