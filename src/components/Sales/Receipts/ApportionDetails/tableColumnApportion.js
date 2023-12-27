/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumnApportion = (props) => {
    const { formActionType, handleButtonClick } = props;
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('receipts.tableColumn.docType'),
            dataIndex: 'documentType',
            width: '14%',
            fixed: 'left',
        }),

        tblPrepareColumns({
            title: translateContent('receipts.tableColumn.docNo'),
            dataIndex: 'documentNumber',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('receipts.tableColumn.docDate'),
            dataIndex: 'docDate',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
        }),

        tblPrepareColumns({
            title: translateContent('receipts.tableColumn.docAmount'),
            dataIndex: 'documentAmount',
            width: '10%',
        }),

        tblPrepareColumns({
            title: translateContent('receipts.label.apportionDetails.receivedAmount'),
            dataIndex: 'receivedAmount',
            width: '10%',
        }),

        tblPrepareColumns({
            title: translateContent('receipts.label.apportionDetails.apportionAmount'),
            dataIndex: 'apportionedAmount',
            width: '10%',
        }),

        tblPrepareColumns({
            title: translateContent('receipts.label.apportionDetails.writeOffAmount'),
            dataIndex: 'writeOffAmount',
            width: '10%',
        }),

        tblPrepareColumns({
            title: translateContent('receipts.label.apportionDetails.balanceAmount'),
            dataIndex: 'balanceAmount',
            fixed: 'right',
            width: '10%',
        }),
    ];
    if (!formActionType?.viewMode) {
        tableColumn.push(tblActionColumn({ handleButtonClick, styles, width: '8%', EditIcon: true, canView: false, canEdit: false, canServerDataEdit: true, canDelete: true }));
    }

    return tableColumn;
};
