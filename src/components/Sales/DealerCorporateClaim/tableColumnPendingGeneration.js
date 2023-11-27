/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'assets/sass/app.module.scss';


export const tableColumnPendingGeneration = ({ handleButtonClick, page, pageSize, actionButtonVisibility }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Invoice Number',
            dataIndex: 'invoiceNuber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Invoice Date',
            dataIndex: 'invoiceDate',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Delivery Note No',
            dataIndex: 'deliveryNoteNo',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Delivery Note Date',
            dataIndex: 'deliveryNoteDate',
            width: '14%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', ...actionButtonVisibility }),
    ];

    return tableColumn;
};
