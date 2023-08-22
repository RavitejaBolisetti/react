/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Receipt No.',
            dataIndex: 'receiptNumber',
            width: '18%',
        }),

        tblPrepareColumns({
            title: 'Receipt Date',
            dataIndex: 'receiptDate',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
        }),

        tblPrepareColumns({
            title: 'Party Segment',
            dataIndex: 'partySegment',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Customer/Supplier Name',
            dataIndex: 'customerName',
            width: '28%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
