/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = ({ handleButtonClick, page, pageSize, actionButtonVisibility }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Dealer Name',
            dataIndex: 'dealerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Dealer Branch',
            dataIndex: 'dealerBranch',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Claim Type',
            dataIndex: 'claimType',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Claim Number',
            dataIndex: 'clameNo',
            width: '14%',
        }),

        tblPrepareColumns({
            title:'Claim Date' ||  translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column3'),
            dataIndex: 'modelName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Claim Status' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column4'),
            dataIndex: 'claimStatus',
            width: '14%',
        }),
        
        tblPrepareColumns({
            title: 'Customer Name' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column4'),
            dataIndex: 'claimStatus',
            width: '14%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', ...actionButtonVisibility }),
    ];

    return tableColumn;
};
