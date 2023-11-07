/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = ({ handleButtonClick, actionButtonVisiblity }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('evrDetailsCapturing.label.model'),
            dataIndex: 'modelCode',
            width: '18%',
        }),

        tblPrepareColumns({
            title: translateContent('evrDetailsCapturing.label.modelDescription'),
            dataIndex: 'modelDescription',
            width: '18%',
        }),

        tblPrepareColumns({
            title: translateContent('evrDetailsCapturing.label.status'),
            dataIndex: 'chargingStatus',
            width: '22%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', ...actionButtonVisiblity }),
    ];

    return tableColumn;
};
