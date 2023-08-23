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
            title: 'Invoice No.',
            dataIndex: 'receiptNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'receiptDate',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
        }),
        tblPrepareColumns({
            title: 'Model Description',
            dataIndex: 'partySegment',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Invoice Date',
            dataIndex: 'customerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Digital Signature',
            dataIndex: 'digitalSignature',
            width: '24%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
