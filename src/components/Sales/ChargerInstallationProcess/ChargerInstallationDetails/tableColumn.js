/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

export const optionalServicesColumns = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Request Change',
            dataIndex: 'addRequestData?.stage',
            key: 'addRequestData?.stage',
            width: '25%',
        }),

        tblPrepareColumns({
            title: 'Visit TimeSlot 1',
            dataIndex: 'amount',
            key: 'amount',
            width: '25%',
        }),
        tblPrepareColumns({
            title: 'Visit TimeSlot 2',
            dataIndex: 'amount',
            key: 'amount',
            width: '25%',
        }),
        tblPrepareColumns({
            title: 'Visit TimeSlot 3',
            dataIndex: 'amount',
            key: 'amount',
            width: '25%',
        }),
    ];

    return tableColumn;
};
