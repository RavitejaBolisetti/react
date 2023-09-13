/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';

import { convertDate, dateFormatView } from 'utils/formatDateTime';

export const tableColumn = (props) => {
    const { handleButtonClick, formActionType } = props;

    const tableColumn = [
        tblPrepareColumns({
            title: 'Document Type',
            dataIndex: 'documentType',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Document Number',
            dataIndex: 'documentNumber',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Document Date',
            dataIndex: 'documentDate',
            render: (value) => {
                return convertDate(value?.documentDate, dateFormatView);
            },
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Document Amount',
            dataIndex: 'documentAmount',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Settled Amount',
            dataIndex: 'settledAmount',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Balanced Amount',
            dataIndex: 'balancedAmount',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Write-Off Amount',
            dataIndex: 'writeOffAmount',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Apportion Amount',
            dataIndex: 'apportionAmount',
            width: '10%',
        }),
    ];

    if (!formActionType?.viewMode) {
        tableColumn.push(tblActionColumn({ handleButtonClick, styles, width: '15%', canView: false, canEdit: false, canServerDataEdit: true, canDelete: true }));
    }
    return tableColumn;
};
