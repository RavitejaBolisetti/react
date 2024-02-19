/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';


export const tableColumnPlant = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Plant Name',
            dataIndex: 'partName',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Part Category',
            dataIndex: 'partCategory',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'stock Availability (Commercial)',
            dataIndex: 'branch',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Stock Availablity (VOR)',
            dataIndex: 'atockAvailability',
            width: '15%',
        }),
        
    ];

    return tableColumn;
};
