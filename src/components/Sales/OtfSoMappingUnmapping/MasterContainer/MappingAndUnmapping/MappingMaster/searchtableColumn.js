/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { converDateDayjs } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const SearchtableColumnMapping = ({ handleButtonClick, actionButtonVisibility, customButtonProperties }) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('bookingSoMappUnmapp.label.bookingNumber'),
            dataIndex: 'otfNumber',
            width: '10%',
        }),
        tblPrepareColumns({
            title: translateContent('bookingSoMappUnmapp.label.bookingDate'),
            dataIndex: 'otfDate',
            width: '20%',
            render: (text) => converDateDayjs(text),
        }),
        tblPrepareColumns({
            title: translateContent('bookingSoMappUnmapp.label.customerName'),
            dataIndex: 'customerName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('bookingSoMappUnmapp.label.cpd'),
            dataIndex: 'cpd',
            width: '10%',
            render: (text) => converDateDayjs(text),
        }),
        tblPrepareColumns({
            title: translateContent('bookingSoMappUnmapp.label.chassisNumber'),
            dataIndex: 'chassisNumber',
            width: '10%',
        }),

        tblActionColumn({ handleButtonClick, ...actionButtonVisibility, customButtonProperties, styles, width: '12%' })
    );

    return tableColumn;
};
