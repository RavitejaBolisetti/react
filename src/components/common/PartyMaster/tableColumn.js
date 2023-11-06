/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('partyMaster.label.partyCode'),
            dataIndex: 'partyCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title:translateContent('partyMaster.label.partyName'),
            dataIndex: 'partyName',
            width: '20%',
        }),

        tblPrepareColumns({
            title:translateContent('partyMaster.label.partyCategory'),
            dataIndex: 'partyCategory',
            width: '15%',
        }),
        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
