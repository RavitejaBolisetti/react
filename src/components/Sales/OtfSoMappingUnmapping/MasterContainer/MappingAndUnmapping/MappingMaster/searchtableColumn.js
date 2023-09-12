/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { converDateDayjs } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';

export const SearchtableColumnMapping = ({ handleButtonClick, actionButtonVisibility, customButtonProperties }) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Booking Number',
            dataIndex: 'otfNumber',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Booking Date',
            dataIndex: 'otfDate',
            width: '20%',
            render: (text) => converDateDayjs(text),
        }),
        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'CPD',
            dataIndex: 'cpd',
            width: '10%',
            render: (text) => converDateDayjs(text),
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
