/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { convertDateMonthYear } from 'utils/formatDateTime';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('termConditionManufacturer.label.productHierarchy'),
            dataIndex: 'productName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('termConditionManufacturer.label.documentType'),
            dataIndex: 'documentType',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('termConditionManufacturer.label.language'),
            dataIndex: 'languageDesc',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('termConditionManufacturer.label.effectivefrom'),
            dataIndex: 'effectivefrom',
            width: '12%',
            render: (text) => convertDateMonthYear(text),
        }),
        tblPrepareColumns({
            title: translateContent('termConditionManufacturer.label.effectiveto'),
            dataIndex: 'effectiveto',
            width: '12%',
            render: (text) => convertDateMonthYear(text),
        }),

        // tblPrepareColumns({
        //     title: 'Description',
        //     dataIndex: 'termsconditiondescription',
        //     width: '25%',
        //     render: (dataIndex) => dataIndex.substring(0, 25) + (dataIndex.length > 25 ? '...' : ''),
        // }),

        tblPrepareColumns({
            title: translateContent('termConditionManufacturer.label.version'),
            dataIndex: 'version',
            width: '2%',
        }),

        tblActionColumn({ styles, handleButtonClick, width: '10%' })
    );

    return tableColumn;
};
