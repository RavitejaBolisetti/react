/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { converDateDayjs } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumnUnMapping = ({ handleButtonClick, actionButtonVisibility, customButtonProperties }) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('bookingSoMappUnmapp.label.soNumber'),
            dataIndex: 'soNumber',
            width: '10%',
        }),
        tblPrepareColumns({
            title: translateContent('bookingSoMappUnmapp.label.poNumber'),
            dataIndex: 'poNumber',
            width: '20%',
        }),
        tblPrepareColumns({
            title: translateContent('bookingSoMappUnmapp.label.soDate'),
            dataIndex: 'Date',
            width: '14%',
            render: (text, record) => converDateDayjs(text),
        }),

        tblPrepareColumns({
            title: translateContent('bookingSoMappUnmapp.label.modelDescription'),
            dataIndex: 'modelDescription',
            width: '10%',
        }),
        tblPrepareColumns({
            title: translateContent('bookingSoMappUnmapp.label.bookingNumber'),
            dataIndex: 'otfNumber',
            width: '10%',
        }),
        tblPrepareColumns({
            title: translateContent('bookingSoMappUnmapp.label.customerName'),
            dataIndex: 'customerName',
            width: '10%',
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
