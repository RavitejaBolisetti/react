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
import { translateContent } from 'utils/translateContent';

export const tableColumn = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('vehicleDetails.customerDetails.label.customerId'),
            dataIndex: 'customerId',
            // width: '5%',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleDetails.customerDetails.label.customerName'),
            dataIndex: 'customerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleDetails.customerDetails.label.registrationNumber'),
            dataIndex: 'registrationNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleDetails.customerDetails.label.modelDescription'),
            dataIndex: 'modelDescription',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('vehicleDetails.customerDetails.label.chassisNumber'),
            dataIndex: 'chassisNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleDetails.customerDetails.label.mobileNumber'),
            dataIndex: 'mobileNumber',
            width: '14%',
        }),
    ];

    return tableColumn;
};
