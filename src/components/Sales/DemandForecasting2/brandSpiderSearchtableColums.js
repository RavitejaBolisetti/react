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
            title: 'Mahindra Make' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'mahindraMake',
            width: '30%',
        }),
        tblPrepareColumns({
            title: 'Mahindra Model' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'mahindraModel',
            width: '30%',
        }),
        tblPrepareColumns({
            title: 'Mahindra Varient' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'mahindraVarient',
            width: '30%',
        }),
        tblPrepareColumns({
            title: 'Competitor Make' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'competitorMake',
            width: '30%',
        }),
        tblPrepareColumns({
            title: 'Competitor Model' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'competitorModel',
            width: '30%',
        }),
        tblPrepareColumns({
            title: 'Competitor Varient' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'ompetitorVarient',
            width: '30%',
        }),

       

    );

    return tableColumn;
};
