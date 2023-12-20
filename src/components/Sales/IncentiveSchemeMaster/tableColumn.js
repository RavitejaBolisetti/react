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
            title: 'Scheme Type' || `${translateContent('city.title.districtName')}`,
            dataIndex: 'schemeType',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Scheme Code'|| `${translateContent('city.title.cityCode')}`,
            dataIndex: 'schemeCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Scheme Name' ||`${translateContent('city.title.cityName')}`,
            dataIndex: 'schemeName',
            width: '15%',
        }),

        tblStatusColumn({ styles }),

        tblActionColumn({ handleButtonClick, styles, canEdit: true,  })
    );

    return tableColumn;
};
