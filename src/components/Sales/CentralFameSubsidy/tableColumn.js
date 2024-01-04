/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = ({ handleButtonClick }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('centralFameSubsidy.label.tableColumn.product'),
            dataIndex: 'product',
            width: '18%',
        }),
        tblPrepareColumns({
            title: translateContent('centralFameSubsidy.label.tableColumn.modelGroup'),
            dataIndex: 'modelGroupCode',
            width: '18%',
        }),
        tblPrepareColumns({
            title: translateContent('centralFameSubsidy.label.tableColumn.taxIndicator'),
            dataIndex: 'partySegment',
            width: '15%',
        }),
        tblActionColumn({ handleButtonClick, styles, width: '15%' }),
    ];

    return tableColumn;
};
