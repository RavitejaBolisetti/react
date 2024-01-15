/*
 *   Copyright (c) 2024 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';

export const tableColumn = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('commonModules.label.vehicleDetails.soNumber'),
            dataIndex: 'soNumber',
            width: '20%',
        }),

        tblPrepareColumns({
            title: translateContent('commonModules.label.vehicleDetails.soStatus'),
            dataIndex: 'soStatus',
            width: '20%',
        }),

        tblPrepareColumns({
            title: translateContent('bookingManagement.label.soDate'),
            dataIndex: 'soDate',
            width: '15%',
            render: (text, record) => record?.soDate && convertDateTime(record?.soDate, dateFormatView),
        }),

        tblPrepareColumns({
            title: translateContent('commonModules.label.vehicleDetails.chassisNumber'),
            dataIndex: 'chassisNumber',
            width: '20%',
        }),

        tblPrepareColumns({
            title: translateContent('commonModules.label.vehicleDetails.branchName'),
            dataIndex: 'branchName',
            width: '20%',
        }),
    ];

    return tableColumn;
};
