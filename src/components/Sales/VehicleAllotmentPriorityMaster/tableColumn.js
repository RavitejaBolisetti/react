/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('vehicleAllotmentPriorityMaster.label.oldModelExchange'),
            dataIndex: 'oldModelGroup',
            width: '15%',
        }),

        tblPrepareColumns({
            title: translateContent('vehicleAllotmentPriorityMaster.label.newModelBooking'),
            dataIndex: 'newModelGroup',
            width: '15%',
        }),

        tblPrepareColumns({
            title: translateContent('vehicleAllotmentPriorityMaster.label.effectiveFromDate'),
            dataIndex: 'effectiveFromDate',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
            sorter: false,
        }),
        tblPrepareColumns({
            title: translateContent('vehicleAllotmentPriorityMaster.label.effectiveToDate'),
            dataIndex: 'effectiveToDate',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
            sorter: false,
        }),

        tblActionColumn({ handleButtonClick, EditIcon: false, styles, canEdit: false }),
    ];

    return tableColumn;
};
