/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'State Code 1',
            dataIndex: 'code',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'State Name',
            dataIndex: 'name',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'State GST Code',
            dataIndex: 'gstStateCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Country',
            dataIndex: 'countryName',
            width: '15%',
        }),

        tblStatusColumn({ styles, width: '15%' }),

        tblActionColumn({ styles, handleButtonClick, width: '10%' })
    );

    return tableColumn;
};
