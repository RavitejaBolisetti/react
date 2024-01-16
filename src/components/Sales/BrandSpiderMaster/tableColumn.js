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
            title: 'Brand Spider Name' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'brandSpiderName',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Brand Spider Date' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'brandSpiderDate',
            width: '15%',
        }),
        // tblPrepareColumns({
        //     title: 'DMS Make' || `${translateContent('city.title.cityCode')}`,
        //     dataIndex: 'corporateCode',
        //     width: '15%',
        // }),

        // tblPrepareColumns({
        //     title: 'DMS Model' || `${translateContent('city.title.cityCode')}`,
        //     dataIndex: 'corporateCode',
        //     width: '15%',
        // }),
        // tblPrepareColumns({
        //     title: 'DMS Varient' || `${translateContent('city.title.cityCode')}`,
        //     dataIndex: 'corporateCode',
        //     width: '15%',
        // }),
        // tblPrepareColumns({
        //     title: 'OMS Make' || `${translateContent('city.title.cityCode')}`,
        //     dataIndex: 'corporateCode',
        //     width: '15%',
        // }),

        // tblPrepareColumns({
        //     title: 'OMS Model' || `${translateContent('city.title.cityCode')}`,
        //     dataIndex: 'corporateCode',
        //     width: '15%',
        // }),
        // tblPrepareColumns({
        //     title: 'OMS Varient' || `${translateContent('city.title.cityCode')}`,
        //     dataIndex: 'corporateCode',
        //     width: '15%',
        // }),
        // tblPrepareColumns({
        //     title: 'MFC Make' || `${translateContent('city.title.cityCode')}`,
        //     dataIndex: 'corporateCode',
        //     width: '15%',
        // }),

        // tblPrepareColumns({
        //     title: 'MFC Model' || `${translateContent('city.title.cityCode')}`,
        //     dataIndex: 'corporateCode',
        //     width: '15%',
        // }),
        // tblPrepareColumns({
        //     title: 'MFC Varient' || `${translateContent('city.title.cityCode')}`,
        //     dataIndex: 'corporateCode',
        //     width: '15%',
        // }),

        tblStatusColumn({ styles }),

        tblActionColumn({ handleButtonClick, styles, canEdit: true })
    );

    return tableColumn;
};
