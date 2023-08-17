/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';

export const tableColumnApportion = (props) => {
    const { formActionType, handleButtonClick } = props;
    const tableColumn = [
        tblPrepareColumns({
            title: 'Doc. Type',
            dataIndex: 'documentType',
            width: '14%',
            fixed: 'left',
        }),

        tblPrepareColumns({
            title: 'Doc. No.',
            dataIndex: 'documentNumber',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Doc. Date',
            dataIndex: 'docDate',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
        }),

        tblPrepareColumns({
            title: 'Doc. Amount',
            dataIndex: 'documentAmount',
            width: '10%',
        }),

        tblPrepareColumns({
            title: 'Received Amount',
            dataIndex: 'receivedAmount',
            width: '10%',
        }),

        tblPrepareColumns({
            title: 'Apportioned Amount',
            dataIndex: 'apportionedAmount',
            width: '10%',
        }),

        tblPrepareColumns({
            title: 'Write Off Amount',
            dataIndex: 'writeOffAmount',
            width: '10%',
        }),

        tblPrepareColumns({
            title: 'Balance Amount',
            dataIndex: 'balanceAmount',
            fixed: 'right',
            width: '10%',
        }),

        // tblActionColumn({ handleButtonClick, styles, width: '8%', canView: false, canEdit: true }),
    ];
    if (!formActionType?.viewMode) {
        tableColumn.push(tblActionColumn({ handleButtonClick, styles, width: '8%', EditIcon: true, canView: false, canEdit: false, canServerDataEdit: true, canDelete: false }));
    }

    return tableColumn;
};
