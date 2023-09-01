/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblApprovalStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'PIN Code',
            dataIndex: 'pinCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Locality',
            dataIndex: 'localityName',
            width: '200px',
        }),

        tblStatusColumn({ styles }),

        tblApprovalStatusColumn({ styles }),

        tblPrepareColumns({
            title: 'Tehsil',
            dataIndex: 'tehsilName',
            width: '200px',
        }),

        tblPrepareColumns({
            title: 'City',
            dataIndex: 'cityName',
            width: '200px',
        }),

        tblPrepareColumns({
            title: 'District',
            dataIndex: 'districtName',
            width: '200px',
        }),

        tblPrepareColumns({
            title: 'State',
            dataIndex: 'stateName',
            width: '200px',
        }),

        tblActionColumn({ handleButtonClick, styles, fixed: 'right', width: '10%' })
    );

    return tableColumn;
};
