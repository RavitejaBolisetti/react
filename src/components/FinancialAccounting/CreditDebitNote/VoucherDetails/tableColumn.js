/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (props) => {
    const { handleButtonClick, formActionType } = props;

    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('creditDebitNote.voucherDetails.label.accountHead'),
            dataIndex: 'accountCode',
            width: '20%',
        }),
        tblPrepareColumns({
            title: translateContent('creditDebitNote.voucherDetails.label.accountNarration'),
            dataIndex: 'accountNarration',
            width: '20%',
        }),

        tblPrepareColumns({
            title: translateContent('creditDebitNote.voucherDetails.label.amount'),
            dataIndex: 'amount',
            width: '20%',
        }),
    ];
    if (!formActionType?.viewMode) {
        tableColumn.push(tblActionColumn({ handleButtonClick, styles, width: '15%', EditIcon: true, canEdit: false, canServerDataEdit: true, canView: false, canDelete: true }));
    }
    return tableColumn;
};
