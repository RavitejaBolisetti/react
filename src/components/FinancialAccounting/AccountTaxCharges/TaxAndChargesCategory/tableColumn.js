/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';


export const tableColumn = (handleButtonClick) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('taxChargeCatagory.label.code'),
            dataIndex: 'taxCategoryCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: translateContent('taxChargeCatagory.label.description'),
            dataIndex: 'taxCategoryDescription',
            width: '20%',
        }),

        tblStatusColumn({ styles, width: '10%' }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
