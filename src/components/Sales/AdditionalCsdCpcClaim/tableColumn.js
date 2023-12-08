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
            title: 'Scheme Type'|| `${translateContent('city.title.cityCode')}`,
            dataIndex: 'schemeType',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Scheme No' ||`${translateContent('city.title.cityName')}`,
            dataIndex: 'schemeNo',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Effective From' || `${translateContent('city.title.districtName')}`,
            dataIndex: 'effectiveFrom',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Effective To' || `${translateContent('city.title.districtName')}`,
            dataIndex: 'effectiveTo',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Status' || `${translateContent('city.title.districtName')}`,
            dataIndex: 'status',
            width: '15%',
        }),

        // tblStatusColumn({ styles }),

        tblActionColumn({ handleButtonClick, styles, canEdit: true,  })
    );

    return tableColumn;
};
