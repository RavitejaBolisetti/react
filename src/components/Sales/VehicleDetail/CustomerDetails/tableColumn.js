/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';

export const tableColumn = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Customer Id',
            dataIndex: 'customerId',
            // width: '5%',
        }),
        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Registartion Number',
            dataIndex: 'registrationNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Model Description',
            dataIndex: 'modelDescription',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Chassis No.',
            dataIndex: 'chassisNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Mobile Number',
            dataIndex: 'mobileNumber',
            width: '14%',
        }),
    ];

    return tableColumn;
};
