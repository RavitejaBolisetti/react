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
            title: 'Code' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'code',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Description' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'description',
            width: '45%',
        }),

        

        tblActionColumn({ handleButtonClick, styles, canEdit: true })
    );

    return tableColumn;
};
