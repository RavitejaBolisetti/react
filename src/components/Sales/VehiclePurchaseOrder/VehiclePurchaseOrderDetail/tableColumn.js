/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils//tableColumn';
import { Row, Col } from 'antd';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Model',
            dataIndex: 'model',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Quantity ',
            dataIndex: 'quantity',
            width: '14%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', EditIcon: false, EyeIcon: false, DeleteIcon: true }),
    ];

    return tableColumn;
};
