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
            title: translateContent('Part No'),
            dataIndex: 'partNo',
            width: '10%',
            sorter,
        }),
        tblPrepareColumns({
            title: translateContent('Part Description'),
            dataIndex: 'partDescription',
            width: '12%',
            sorter,
        }),
        tblPrepareColumns({
            title: translateContent('UoM'),
            dataIndex: 'unitOfMeasure',
            width: '10%',
            sorter,
        }),
        // tblPrepareColumns({
        //     title: translateContent('Inventory Classification Group'),
        //     dataIndex: 'requestedQuantity',
        //     width: '10%',
        //     sorter,
        // }),
        tblPrepareColumns({
            title: translateContent('Current Stock'),
            dataIndex: 'currentStock',
            width: '15%',
            sorter,
        }),

        // tblPrepareColumns({
        //     title: translateContent('Min Order Level'),
        //     dataIndex: 'minOrderLevel',
        //     width: '10%',
        //     sorter,
        // }),
        // tblPrepareColumns({
        //     title: translateContent('Max Order Level'),
        //     dataIndex: 'maxOrderLevel',
        //     width: '10%',
        //     sorter,
        // }),

        // tblPrepareColumns({
        //     title: translateContent('Re-Order Level'),
        //     dataIndex: 'reOrderLevel',
        //     width: '10%',
        //     sorter,
        // }),

        // tblPrepareColumns({
        //     title: translateContent('Safety Stock'),
        //     dataIndex: 'safetyStock',
        //     width: '10%',
        //     sorter,
        // }),

        tblPrepareColumns({
            title: translateContent('NDP'),
            dataIndex: 'ndp',
            width: '10%',
            sorter,
        }),

        tblPrepareColumns({
            title: translateContent('Indent Quantity'),
            dataIndex: 'balancedQuantity',
            width: '10%',
            sorter,
        }),
        tblPrepareColumns({
            title: translateContent('Value'),
            dataIndex: 'value',
            width: '10%',
            sorter,
        }),

        tblActionColumn({ handleButtonClick, styles, canEdit, canDelete, canView }),
    ];

    return tableColumn;
};
