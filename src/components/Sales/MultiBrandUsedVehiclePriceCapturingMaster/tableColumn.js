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
            title: 'Study' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'study',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Doc ID' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'docId',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Doc Date' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'docDate',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Campaign No' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'campaignNo',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Campaign Date' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'campaignDate',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Campaign From Date' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'campaignFromDate',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Campaign To Date' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'campaignToDate',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Campaign Closing Date' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'campaignClosingDate',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'MFG Month' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'mfgMonth',
            width: '15%',
        }),
        // tblPrepareColumns({
        //     title: 'Color' || `${translateContent('city.title.cityCode')}`,
        //     dataIndex: 'color',
        //     width: '15%',
        // }),
        // tblPrepareColumns({
        //     title: 'Owner' || `${translateContent('city.title.cityCode')}`,
        //     dataIndex: 'owner',
        //     width: '15%',
        // }),
        // tblStatusColumn({ styles }),

        tblActionColumn({ handleButtonClick, styles, canEdit: true })
    );


    return tableColumn;
};
