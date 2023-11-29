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
            title: 'Zone',
            dataIndex: 'zone',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Area Office',
            dataIndex: 'areaOffice',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Dealer Code',
            dataIndex: 'dealerCode',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Corporate Category',
            dataIndex: 'corporateCategory',
            width: '14%',
        }),

        tblPrepareColumns({
            title:'Dealer Amount' ||  translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column3'),
            dataIndex: 'dealerAmount',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'OEM Amount' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column4'),
            dataIndex: 'oeMAmount',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Total Amount' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column4'),
            dataIndex: 'totalAmount',
            width: '14%',
        }),
             
        
        tblPrepareColumns({
            title: 'Valid From' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column4'),
            dataIndex: 'validFrom',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Valid To' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column4'),
            dataIndex: 'validTo',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Status' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column4'),
            dataIndex: 'status',
            width: '14%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%' }),
    ];

    return tableColumn;
};
