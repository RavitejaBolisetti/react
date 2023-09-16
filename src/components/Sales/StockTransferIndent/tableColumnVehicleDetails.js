/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'assets/sass/app.module.scss';

export const tableColumnVehicleDetails = (handleButtonClickVehicleDetails, sorter) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Model Description',
            dataIndex: 'modelDescription',
            width: '20%',
            sorter,
        }),

        tblPrepareColumns({
            title: 'Model Code',
            dataIndex: 'modelCode',
            width: '15%',
            sorter,
        }),

        tblPrepareColumns({
            title: 'Requested Quantity',
            dataIndex: 'requestedQuantity',
            width: '10%',
            sorter,
        }),

        tblPrepareColumns({
            title: 'Cancelled Quantity',
            dataIndex: 'cancelledQuantity',
            width: '10%',
            sorter,
        }),

        tblPrepareColumns({
            title: 'Issued & Not Received Quantity',
            dataIndex: 'issuedAndNotReceivedQuantity',
            width: '10%',
            sorter,
        }),

        tblPrepareColumns({
            title: 'Received Quantity',
            dataIndex: 'receivedQuantity',
            width: '10%',
            sorter,
        }),

        tblPrepareColumns({
            title: 'Balance Quantity',
            dataIndex: 'balancedQuantity',
            width: '10%',
            sorter,
        }),

        tblActionColumn({ handleButtonClick: handleButtonClickVehicleDetails, styles, canEdit: true }),
    ];

    return tableColumn;
};
