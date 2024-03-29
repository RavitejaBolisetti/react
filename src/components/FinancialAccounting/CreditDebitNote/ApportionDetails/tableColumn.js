/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateTimedayjs, dateFormatView } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';
import { getCodeValue } from 'utils/getCodeValue';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (props) => {
    const { handleButtonClick, formActionType, documentTypeOptions } = props;

    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('creditDebitNote.ApportionDetails.label.documentType'),
            dataIndex: 'documentType',
            width: '15%',
            render: (text) => getCodeValue(documentTypeOptions, text, 'documentDescription', false, 'documentCode') || text,
        }),

        tblPrepareColumns({
            title: translateContent('creditDebitNote.ApportionDetails.label.documentNumber'),
            dataIndex: 'documentNumber',
            width: '10%',
        }),
        tblPrepareColumns({
            title: translateContent('creditDebitNote.ApportionDetails.label.documentDate'),
            dataIndex: 'documentDate',
            render: (value) => convertDateTimedayjs(value, dateFormatView),
            width: '10%',
        }),
        tblPrepareColumns({
            title: translateContent('creditDebitNote.ApportionDetails.label.documentAmount'),
            dataIndex: 'documentAmount',
            width: '10%',
        }),
        tblPrepareColumns({
            title: translateContent('creditDebitNote.ApportionDetails.label.settledAmount'),
            dataIndex: 'settledAmount',
            width: '10%',
        }),
        tblPrepareColumns({
            title: translateContent('creditDebitNote.ApportionDetails.label.balancedAmount'),
            dataIndex: 'balancedAmount',
            width: '10%',
        }),
        tblPrepareColumns({
            title: translateContent('creditDebitNote.ApportionDetails.label.writeOffAmount'),
            dataIndex: 'writeOffAmount',
            width: '10%',
        }),
        tblPrepareColumns({
            title: translateContent('creditDebitNote.ApportionDetails.label.apportionAmount'),
            dataIndex: 'apportionAmount',
            width: '10%',
        }),
    ];

    if (!formActionType?.viewMode) {
        tableColumn.push(tblActionColumn({ handleButtonClick, styles, width: '15%', canView: false, canEdit: false, canServerDataEdit: true, canDelete: true }));
    }
    return tableColumn;
};
