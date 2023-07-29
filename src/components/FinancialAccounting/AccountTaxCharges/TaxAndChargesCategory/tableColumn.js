/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        // tblPrepareColumns({
        //     title: 'State',
        //     dataIndex: 'name',
        //     width: '20%',
        // }),
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'taxCategoryCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Description',
            dataIndex: 'taxCategoryDescription',
            width: '20%',
        }),

        // tblPrepareColumns({
        //     title: 'Sale Type',
        //     dataIndex: 'name',
        //     width: '20%',
        // }),

        tblStatusColumn({ styles, width: '10%' }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
