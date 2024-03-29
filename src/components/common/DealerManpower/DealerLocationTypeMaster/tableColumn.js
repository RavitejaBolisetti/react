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
            title: translateContent('locationTypeMaster.label.locationTypeCode'),
            dataIndex: 'locationCode',
            width: '20%',
        }),

        tblPrepareColumns({
            title: translateContent('locationTypeMaster.label.locationTypeName'),
            dataIndex: 'locationDescription',
            width: '30%',
        }),
        tblPrepareColumns({
            title: translateContent('locationTypeMaster.label.applicationTo'),
            dataIndex: 'applicableTo',
            width: '20%',
        }),

        tblStatusColumn({ styles, width: '15%' }),

        tblActionColumn({ handleButtonClick, styles, width: '15%' })
    );

    return tableColumn;
};
