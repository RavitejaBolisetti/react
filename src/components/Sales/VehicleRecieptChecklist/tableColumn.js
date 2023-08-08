/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableCloumn';
import styles from 'components/common/Common.module.css';

export const tableColumn = ({ handleButtonClick, page, pageSize, actionButtonVisibility }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Receipt Number',
            dataIndex: 'receiptNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Receipt Date',
            dataIndex: 'receiptDate',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Model Name',
            dataIndex: 'modelName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Chassis No.',
            dataIndex: 'chassis',
            width: '14%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', ...actionButtonVisibility }),
    ];

    return tableColumn;
};
