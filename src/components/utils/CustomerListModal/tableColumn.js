/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';

export const tableColumn = [
    tblPrepareColumns({
        title: 'Customer ID',
        dataIndex: 'customerId',
        width: '170px',
    }),

    tblPrepareColumns({
        title: 'Customer Name',
        dataIndex: 'customerName',
        width: '170px',
    }),

    tblPrepareColumns({
        title: 'Mobile No',
        dataIndex: 'mobileNumber',
        width: '120px',
    }),

    tblPrepareColumns({
        title: 'Registration Number',
        dataIndex: 'registrationNumber',
        width: '160px',
    }),

    tblPrepareColumns({
        title: 'Chassis Number',
        dataIndex: 'chassisNumber',
        width: '180px',
    }),
];
