/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblApprovalStatusColumn, tblActionColumn, tblSerialNumberColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ width: '7%', page, pageSize }),

        tblPrepareColumns({
            title: translateContent('pincode.tableColHeading.pinCode'),
            dataIndex: 'pinCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: translateContent('pincode.tableColHeading.locality'),
            dataIndex: 'localityName',
            width: '200px',
        }),

        tblStatusColumn({ styles }),

        tblApprovalStatusColumn({ styles }),

        tblPrepareColumns({
            title: translateContent('pincode.tableColHeading.tehsil'),
            dataIndex: 'tehsilName',
            width: '200px',
        }),

        tblPrepareColumns({
            title: translateContent('pincode.tableColHeading.city'),
            dataIndex: 'cityName',
            width: '200px',
        }),

        tblPrepareColumns({
            title: translateContent('pincode.tableColHeading.district'),
            dataIndex: 'districtName',
            width: '200px',
        }),

        tblPrepareColumns({
            title: translateContent('pincode.tableColHeading.state'),
            dataIndex: 'stateName',
            width: '200px',
        }),

        tblActionColumn({ handleButtonClick, styles, fixed: 'right', width: '10%', canEdit: false })
    );

    return tableColumn;
};
