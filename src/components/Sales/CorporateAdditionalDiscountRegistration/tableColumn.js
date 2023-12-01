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
            title: 'Scheme Id',
            dataIndex: 'schemeId',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Scheme Date',
            dataIndex: 'schemeDate',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Scheme Status',
            dataIndex: 'schemeStatus',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Scheme Code',
            dataIndex: 'schemeCode',
            width: '14%',
        }),

        tblPrepareColumns({
            title:'Dealer Code' ||  translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column3'),
            dataIndex: 'dealerCode',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Modal Code' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column4'),
            dataIndex: 'modalCode',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Corporate Code' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column4'),
            dataIndex: 'corporateCode',
            width: '14%',
        }),
             
        
        tblPrepareColumns({
            title: 'Quantity' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column4'),
            dataIndex: 'quantity',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Add Disc Amount' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column4'),
            dataIndex: 'additionalDiscAmount',
            width: '14%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%' }),
    ];

    return tableColumn;
};
