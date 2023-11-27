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
            title: 'Corporate Code'|| `${translateContent('city.title.cityCode')}`,
            dataIndex: 'code',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Corporate Name' ||`${translateContent('city.title.cityName')}`,
            dataIndex: 'name',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Corporate Category' || `${translateContent('city.title.districtName')}`,
            dataIndex: 'districtName',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Corporate Type' || `${translateContent('city.title.districtName')}`,
            dataIndex: 'stateName',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Valid From' || `${translateContent('city.title.districtName')}`,
            dataIndex: 'stateName',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Valid To' || `${translateContent('city.title.districtName')}`,
            dataIndex: 'stateName',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Status' || `${translateContent('city.title.districtName')}`,
            dataIndex: 'stateName',
            width: '15%',
        }),

        tblStatusColumn({ styles }),

        tblActionColumn({ handleButtonClick, styles, canEdit: true,  })
    );

    return tableColumn;
};
