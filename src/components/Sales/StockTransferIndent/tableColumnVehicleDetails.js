/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumnVehicleDetails = ({ handleButtonClick, canEdit = false, canDelete = false, sorter = false, canView = true }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('stockTransferIndent.label.modelDescription'),
            dataIndex: 'modelDescription',
            width: '20%',
            sorter,
        }),

        tblPrepareColumns({
            title: translateContent('stockTransferIndent.label.modelCode'),
            dataIndex: 'modelCode',
            width: '15%',
            sorter,
        }),

        tblPrepareColumns({
            title: translateContent('stockTransferIndent.label.requestedQuantity'),
            dataIndex: 'requestedQuantity',
            width: '10%',
            sorter,
        }),

        tblPrepareColumns({
            title: translateContent('stockTransferIndent.label.cancelledQuantity'),
            dataIndex: 'cancelledQuantity',
            width: '10%',
            sorter,
        }),

        tblPrepareColumns({
            title: translateContent('stockTransferIndent.label.issuedAndNotReceivedQuantity'),
            dataIndex: 'issuedAndNotReceivedQuantity',
            width: '10%',
            sorter,
        }),

        tblPrepareColumns({
            title: translateContent('stockTransferIndent.label.receivedQuantity'),
            dataIndex: 'receivedQuantity',
            width: '10%',
            sorter,
        }),

        tblPrepareColumns({
            title: translateContent('stockTransferIndent.label.balancedQuantity'),
            dataIndex: 'balancedQuantity',
            width: '10%',
            sorter,
        }),

        tblActionColumn({ handleButtonClick, styles, canEdit, canDelete, canView }),
    ];

    return tableColumn;
};
