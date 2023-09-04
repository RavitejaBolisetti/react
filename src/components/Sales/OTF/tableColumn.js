/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { OTFStatusTag } from './utils/OTFStatusTag';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'OTF No.',
            dataIndex: 'otfNumber',
            width: '18%',
        }),

        tblPrepareColumns({
            title: 'OTF Date',
            dataIndex: 'otfDate',
            width: '12%',
            render: (_, record) => (record?.otfDate ? convertDateMonthYear(record?.otfDate) : ''),
        }),
        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '20%',
        }),

        // tblPrepareColumns({
        //     title: 'Mobile No.',
        //     dataIndex: 'mobileNumber',
        //     width: '14%',
        // }),

        tblPrepareColumns({
            title: 'Model',
            dataIndex: 'model',
            width: '25%',
        }),

        tblPrepareColumns({
            title: 'Order Status',
            dataIndex: 'orderStatus',
            width: '14%',
            render: (_, record) => OTFStatusTag(record.orderStatus),
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
