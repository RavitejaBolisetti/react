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
            title: translateContent('crmSchemeEnrolment.label.enrolmentNo'),
            dataIndex: 'enrolmentNumber',
            width: '13%',
        }),

        tblPrepareColumns({
            title: translateContent('crmSchemeEnrolment.label.enrolmentDate'),
            dataIndex: 'enrolledDate',
            width: '13%',
            render: (text) => (text ? convertDateMonthYear(text) : 'NA'),
        }),

        tblPrepareColumns({
            title: translateContent('crmSchemeEnrolment.label.bookletNo'),
            dataIndex: 'bookletNumber',
            width: '13%',
        }),

        tblPrepareColumns({
            title: translateContent('crmSchemeEnrolment.label.customerName'),
            dataIndex: 'customerName',
            width: '13%',
        }),

        tblPrepareColumns({
            title: translateContent('crmSchemeEnrolment.label.mobileNo'),
            dataIndex: 'mobileNumber',
            width: '13%',
        }),

        tblPrepareColumns({
            title: translateContent('crmSchemeEnrolment.label.vin'),
            dataIndex: 'vin',
            width: '13%',
        }),
        
        tblPrepareColumns({
            title: translateContent('crmSchemeEnrolment.label.registration'),
            dataIndex: 'registrationNumber',
            width: '13%',
        }),

        tblActionColumn({ handleButtonClick, styles, fixed: 'right', width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
