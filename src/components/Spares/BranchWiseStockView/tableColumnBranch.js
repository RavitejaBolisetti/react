/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';


export const tableColumnBranch = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Dealer Name',
            dataIndex: 'dealerName',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Branch',
            dataIndex: 'branch',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Stock Availablity',
            dataIndex: 'Stock',
            width: '15%',
        }),
        
    ];

    return tableColumn;
};
