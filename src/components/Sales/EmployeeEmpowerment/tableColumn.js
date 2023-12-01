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
            title: 'Employee Request Id',
            dataIndex: 'employeeRequestId',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Request Date',
            dataIndex: 'r equestDate',
            width: '14%',
        }),

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
            title: 'Status',
            dataIndex: 'status',
            width: '14%',
        }),
        // tblPrepareColumns({
        //     title: 'Dealer Location',
        //     dataIndex: 'dealerLocaton',
        //     width: '14%',
        // }),

        // tblPrepareColumns({
        //     title: 'Dealer Code',
        //     dataIndex: 'dealerBranch',
        //     width: '14%',
        // }),
        // tblPrepareColumns({
        //     title: 'Employee Code',
        //     dataIndex: 'claimType',
        //     width: '14%',
        // }),
        // tblPrepareColumns({
        //     title: 'Mile Code',
        //     dataIndex: 'mileType',
        //     width: '14%',
        // }),
        // tblPrepareColumns({
        //     title: 'employee Name',
        //     dataIndex: 'clameNo',
        //     width: '14%',
        // }),

        // tblPrepareColumns({
        //     title: 'Employee Status' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column3'),
        //     dataIndex: 'modelName',
        //     width: '14%',
        // }),
        // tblPrepareColumns({
        //     title: 'Designation' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column3'),
        //     dataIndex: 'modelName',
        //     width: '14%',
        // }),

        // tblPrepareColumns({
        //     title: 'Mobile No' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column3'),
        //     dataIndex: 'modelName',
        //     width: '14%',
        // }),

        
        // tblPrepareColumns({
        //     title: 'PAN No' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column3'),
        //     dataIndex: 'modelName',
        //     width: '14%',
        // }),

        // tblPrepareColumns({
        //     title: 'Bank Name' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column3'),
        //     dataIndex: 'modelName',
        //     width: '14%',
        // }),

        // tblPrepareColumns({
        //     title: 'Bank Acc No' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column3'),
        //     dataIndex: 'modelName',
        //     width: '14%',
        // }),
        // tblPrepareColumns({
        //     title: 'IFSC Code' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column3'),
        //     dataIndex: 'modelName',
        //     width: '14%',
        // }),
        // tblPrepareColumns({
        //     title: 'Recognition Amount' || translateContent('vehicleReceiptChecklist.tableColumn.checklistMaster.column3'),
        //     dataIndex: 'modelName',
        //     width: '14%',
        // }),

        tblActionColumn({ handleButtonClick, styles, width: '8%' }),
    ];

    return tableColumn;
};
