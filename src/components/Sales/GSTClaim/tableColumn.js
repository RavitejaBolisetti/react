/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = ({ handleButtonClick, page, pageSize, ...rest }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Area Office',
            dataIndex: 'areaOffice',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Dealer Name',
            dataIndex: 'dealerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Financial Year',
            dataIndex: 'financialYear',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Financial Month',
            dataIndex: 'financialMonth',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Claim Type',
            dataIndex: 'claimType',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Claim Status',
            dataIndex: 'clameStatus',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Invoice No',
            dataIndex: 'invoiceNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Invoice Date' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column3'),
            dataIndex: 'invoiceDate',
            width: '14%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', ...rest }),
    ];

    return tableColumn;
};
