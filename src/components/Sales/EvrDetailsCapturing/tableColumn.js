/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Model',
            dataIndex: 'model',
            width: '18%',
            render: (_, record) => record?.bookingNumber || record?.otfNumber,
        }),

        tblPrepareColumns({
            title: 'Model Description',
            dataIndex: 'modelDescription',
            width: '18%',
            render: (_, record) => (record?.otfDate ? convertDateMonthYear(record?.otfDate) : ''),
        }),

        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            width: '20%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: true }),
    ];

    return tableColumn;
};
