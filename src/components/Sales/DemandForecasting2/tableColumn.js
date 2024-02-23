/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';


export const tableColumn = ({ handleButtonClick, page, pageSize }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('demandForecasting.heading.modelDescription'),
            dataIndex: 'modelDescription',
            width: '22%',
        }),
        // tblPrepareColumns({
        //     title: translateContent('demandForecasting.heading.DealerName'),
        //     dataIndex: 'DealerName',
        //     width: '15%',
        // }),
        // tblPrepareColumns({
        //     title: translateContent('demandForecasting.heading.zone'),
        //     dataIndex: 'zone',
        //     width: '15%',
        // }),
       tblPrepareColumns({
            title: translateContent('demandForecasting.heading.areaOffice'),
            dataIndex: 'areaOffice',
            width: '15%',
        }),
        tblPrepareColumns({
            title: translateContent('demandForecasting.heading.location'),
            dataIndex: 'location',
            width: '15%',
        }),
        tblPrepareColumns({
            title: translateContent('demandForecasting.heading.currentYearRetail'),
            dataIndex: 'currentYearRetail',
            width: '20%',
        }),

        tblPrepareColumns({
            title: translateContent('demandForecasting.heading.lastYearRetail'),
            dataIndex: 'lastYearRetail',
            width: '20%',
        }),
        tblActionColumn({ handleButtonClick, styles, canEdit: true })       
    ];

    return tableColumn;
};
