/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Enrolment No',
            dataIndex: 'enrolmentNumber',
            width: '13%',
        }),

        tblPrepareColumns({
            title: 'Enrolment Date',
            dataIndex: 'enrolmentDate',
            width: '13%',
            render: (text) => (text ? convertDateMonthYear(text) : 'NA'),
        }),

        tblPrepareColumns({
            title: 'Booklet No',
            dataIndex: 'bookletNumber',
            width: '13%',
        }),
        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '13%',
        }),
        tblPrepareColumns({
            title: 'Mobile No',
            dataIndex: 'mobileNumber',
            width: '13%',
        }),
        tblPrepareColumns({
            title: 'VIN',
            dataIndex: 'vin',
            width: '13%',
        }),
        tblPrepareColumns({
            title: 'Registration',
            dataIndex: 'registrationNumber',
            width: '13%',
        }),

        tblActionColumn({ handleButtonClick, styles, fixed: 'right', width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
