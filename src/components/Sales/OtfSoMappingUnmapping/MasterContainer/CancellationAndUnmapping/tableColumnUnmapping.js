/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { converDateDayjs } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';

export const tableColumnUnMapping = ({ handleButtonClick, actionButtonVisibility, customButtonProperties }) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'SO Number',
            dataIndex: 'soNumber',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'SO Number',
            dataIndex: 'soStatus',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'PO Number',
            dataIndex: 'poNumber',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Date',
            dataIndex: 'Date',
            width: '14%',
            render: (text, record) => converDateDayjs(text),
        }),

        tblPrepareColumns({
            title: 'Model Description',
            dataIndex: 'modelDescription',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Booking Number',
            dataIndex: 'otfNumber',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Chassis Number',
            dataIndex: 'chassisNumber',
            width: '10%',
        }),

        tblActionColumn({ handleButtonClick, ...actionButtonVisibility, customButtonProperties, styles, width: '12%' })
    );

    return tableColumn;
};
