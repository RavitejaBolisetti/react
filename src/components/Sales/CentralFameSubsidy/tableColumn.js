/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { translateContent } from 'utils/translateContent';
import styles from 'assets/sass/app.module.scss';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';

export const tableColumn = ({ handleButtonClick, typeData }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('centralFameSubsidy.label.tableColumn.modelGroup'),
            dataIndex: 'modelGroupCode',
            width: '18%',
            render: (_, record) => record?.modelGroupName || record?.modelGroupCode,
        }),
        tblPrepareColumns({
            title: translateContent('centralFameSubsidy.label.tableColumn.product'),
            dataIndex: 'variantCode',
            width: '18%',
            render: (_, record) => record?.variantName || record?.variantCode,
        }),

        tblPrepareColumns({
            title: translateContent('centralFameSubsidy.label.tableColumn.taxIndicator'),
            dataIndex: 'taxiIndicator',
            width: '15%',
            render: (status) => getCodeValue(typeData[PARAM_MASTER?.VEHCL_TYPE?.id], status),
        }),
        tblActionColumn({ handleButtonClick, styles, width: '15%' }),
    ];

    return tableColumn;
};
