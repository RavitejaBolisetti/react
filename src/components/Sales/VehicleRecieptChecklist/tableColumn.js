/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYearDayjs } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';

export const tableColumn = ({ handleButtonClick, page, pageSize, actionButtonVisibility }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Receipt Number',
            dataIndex: 'grnNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Receipt Date',
            dataIndex: 'grnDate',
            width: '14%',
            render: (text) => convertDateMonthYearDayjs(text),
        }),

        tblPrepareColumns({
            title: 'Model Name',
            dataIndex: 'modelName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Chassis No.',
            dataIndex: 'chassisNumber',
            width: '14%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', ...actionButtonVisibility }),
    ];

    return tableColumn;
};
