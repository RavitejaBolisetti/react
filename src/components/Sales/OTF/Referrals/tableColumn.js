/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableCloumn';

export const tableColumn = [
    tblPrepareColumns({
        title: 'Customer ID',
        dataIndex: 'customerId',
        width: '15%',
    }),

    tblPrepareColumns({
        title: 'Customer Name',
        dataIndex: 'customerName',
        width: '20%',
    }),

    tblPrepareColumns({
        title: 'Mobile No',
        dataIndex: 'mobileNumber',
        width: '15%',
    }),

    tblPrepareColumns({
        title: 'Registration Number',
        dataIndex: 'registrationNumber',
        width: '15%',
    }),

    tblPrepareColumns({
        title: 'Chassis Number',
        dataIndex: 'chassisNumber',
        width: '15%',
    }),
];
