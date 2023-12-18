/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { converDateDayjs } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumnMapping = ({ handleButtonClick, actionButtonVisibility, customButtonProperties }) => {
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
            width: '10%',
        }),
        tblPrepareColumns({
            title: translateContent('bookingSoMappUnmapp.label.soDate'),
            dataIndex: 'soDate',
            width: '14%',
            render: (text) => converDateDayjs(text),
        }),
        tblPrepareColumns({
            title: translateContent('bookingSoMappUnmapp.label.modelDescription'),
            dataIndex: 'modelDescription',
            width: '20%',
            sorter: false,
        }),
        tblActionColumn({ handleButtonClick, ...actionButtonVisibility, customButtonProperties, styles, width: '12%' })
    );

    return tableColumn;
};
