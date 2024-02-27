/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumnModelDetails = ({ handleButtonClick, canEdit = false, canDelete = false, sorter = false, canView = true }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('demandForecasting.label.modelVariant'),
            dataIndex: 'modelVariant',
            width: '20%',
            sorter,
        }),

        tblPrepareColumns({
            title: translateContent('demandForecasting.label.currentMonth'),
            dataIndex: 'currentMonth',
            width: '15%',
            sorter,
        }),

        tblPrepareColumns({
            title: translateContent('demandForecasting.label.currentMonth1'),
            dataIndex: 'currentMonth1',
            width: '10%',
            sorter,
        }),

        tblPrepareColumns({
            title: translateContent('demandForecasting.label.currentMonth2'),
            dataIndex: 'currentMonth2',
            width: '10%',
            sorter,
        }),

        tblPrepareColumns({
            title: translateContent('demandForecasting.label.currentMonth3'),
            dataIndex: 'currentMonth3',
            width: '10%',
            sorter,
        }),

        //tblActionColumn({ handleButtonClick, styles, canEdit, canDelete, canView }),
    ];

    return tableColumn;
};
