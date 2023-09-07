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
            title: 'Indent Number',
            dataIndex: 'incidentNumber',
            width: '18%',
        }),

        tblPrepareColumns({
            title: 'Indent Date',
            dataIndex: 'indentDate',
            width: '12%',
            render: (_, record) => (record?.indentDate ? convertDateMonthYear(record?.indentDate) : ''),
        }),
        tblPrepareColumns({
            title: 'From Location',
            dataIndex: 'fromLocation',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'To Location',
            dataIndex: 'toLocation',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Requested By',
            dataIndex: 'requestedBy',
            width: '19%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
