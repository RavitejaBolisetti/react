/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('customerMaster.tableColHeading.cusID'),
            dataIndex: 'customerId',
            width: '14%',
            sorter: false,
        }),
        tblPrepareColumns({
            title: translateContent('customerMaster.tableColHeading.cusName'),
            dataIndex: 'customerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('customerMaster.tableColHeading.cusType'),
            dataIndex: 'customerTypeName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('customerMaster.tableColHeading.mobileNo'),
            dataIndex: 'mobileNumber',
            width: '12%',
        }),

        tblPrepareColumns({
            title: translateContent('customerMaster.tableColHeading.emailAddress'),
            dataIndex: 'emailId',
            width: '14%',
        }),

        // tblPrepareColumns({
        //     title: 'Membership Type',
        //     dataIndex: 'membershipTypeName',
        //     width: '14%',
        // }),

        tblActionColumn({ styles, handleButtonClick, width: '12%' })
    );

    return tableColumn;
};
