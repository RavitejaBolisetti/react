/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableCloumn';

import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'VIN/Chasis no.',
            dataIndex: 'chasisNumber',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Model Description',
            dataIndex: 'modelDescription',
            width: '20%',
            render: (text) => convertDateMonthYear(text),
        }),
        tblPrepareColumns({
            title: 'Age in Days',
            dataIndex: 'age',
            width: '8%',
        }),

        tblPrepareColumns({
            title: 'PDI Done',
            dataIndex: 'pdi',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'M&M Invoice',
            dataIndex: 'invoice',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Vehicle Status',
            dataIndex: 'vehicleStatus',
            width: '14%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', EyeIcon: true, EditIcon: false }),
    ];

    return tableColumn;
};
