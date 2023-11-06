/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { StockIndentStatusTag } from 'components/Sales/StockTransferIndent/utils/StockIndentStatusTag';
import { STOCK_TRANSFER } from 'constants/StockTransfer';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick, toggleButton) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('stockTransferIndent.label.indentNumber'),
            dataIndex: 'indentNumber',
            width: '18%',
        }),

        tblPrepareColumns({
            title: translateContent('stockTransferIndent.label.indentDate'),
            dataIndex: 'indentDate',
            width: '12%',
            render: (_, record) => (record?.indentDate ? convertDateMonthYear(record?.indentDate) : ''),
        }),
        tblPrepareColumns({
            title: translateContent('stockTransferIndent.label.fromLocation'),
            dataIndex: 'fromLocation',
            width: '15%',
        }),

        tblPrepareColumns({
            title: translateContent('stockTransferIndent.label.toLocation'),
            dataIndex: 'toLocation',
            width: '15%',
        }),

        tblPrepareColumns({
            title: translateContent('stockTransferIndent.label.requestedBy'),
            dataIndex: 'requestedBy',
            width: '19%',
        }),

        tblPrepareColumns({
            title: translateContent('stockTransferIndent.label.status'),
            dataIndex: toggleButton === STOCK_TRANSFER?.RAISED.key ? 'indentRaisedStatus' : 'indentReceivedStatus',
            width: '13%',
            render: (_, record) => StockIndentStatusTag(toggleButton === STOCK_TRANSFER?.RAISED.key ? record.indentRaisedStatus : record.indentReceivedStatus),
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
