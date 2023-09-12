/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
// import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Old Model Group',
            dataIndex: 'oldModelGroup',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'New Model Group',
            dataIndex: 'newModelGroup',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Effective From Date',
            dataIndex: 'effectiveFromDate',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
            sorter: false,
        }),
        tblPrepareColumns({
            title: 'Effective To Date',
            dataIndex: 'effectiveToDate',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
            sorter: false,
        }),

        tblActionColumn({ handleButtonClick, EditIcon: false, styles }),
    ];

    return tableColumn;
};
