/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { translateContent } from 'utils/translateContent';
import { TAXI_NO_TAXI } from './fameSubsidryConstants';
import styles from 'assets/sass/app.module.scss';

export const tableColumn = ({ handleButtonClick }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('centralFameSubsidy.label.tableColumn.modelGroup'),
            dataIndex: 'modelGroupCode',
            width: '18%',
        }),
        tblPrepareColumns({
            title: translateContent('centralFameSubsidy.label.tableColumn.product'),
            dataIndex: 'variantCode',
            width: '18%',
        }),

        tblPrepareColumns({
            title: translateContent('centralFameSubsidy.label.tableColumn.taxIndicator'),
            dataIndex: 'taxiIndicator',
            width: '15%',
            render: (status) => TAXI_NO_TAXI?.[status]?.value || '-',
        }),
        tblActionColumn({ handleButtonClick, styles, width: '15%' }),
    ];

    return tableColumn;
};
