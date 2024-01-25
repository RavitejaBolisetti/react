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
            title: 'Channel' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'channel',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Campaign No' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'campaignNo',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Campaign Name' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'campaignName',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Start Date' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'startDate',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'End Date' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'endDate',
            width: '15%',
        }),

        tblStatusColumn({ styles }),

        tblActionColumn({ handleButtonClick, styles, canEdit: true })
    );

    return tableColumn;
};
