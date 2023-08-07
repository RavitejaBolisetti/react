/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'components/common/Common.module.css';
import { convertDateMonthYear } from 'utils/formatDateTime';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Product Hierarchy',
            dataIndex: 'productName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Document Type',
            dataIndex: 'documentType',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Language',
            dataIndex: 'languageDesc',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Effective From',
            dataIndex: 'effectivefrom',
            width: '12%',
            render: (text) => convertDateMonthYear(text),
        }),
        tblPrepareColumns({
            title: 'Effective To',
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
            title: 'Version',
            dataIndex: 'version',
            width: '2%',
        }),

        tblActionColumn({ styles, handleButtonClick, width: '10%' })
    );

    return tableColumn;
};
