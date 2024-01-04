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
            title: translateContent('creditDebitNote.label.voucherNumber'),
            dataIndex: 'voucherNumber',
            width: '18%',
        }),
        tblPrepareColumns({
            title: translateContent('creditDebitNote.label.voucherType'),
            dataIndex: 'voucherType',
            width: '18%',
        }),

        tblPrepareColumns({
            title: translateContent('creditDebitNote.label.partySegment'),
            dataIndex: 'partySegment',
            width: '15%',
        }),

        tblPrepareColumns({
            title: translateContent('creditDebitNote.label.customerName'),
            dataIndex: 'customerName',
            width: '18%',
        }),
        tblPrepareColumns({
            title: translateContent('creditDebitNote.label.paidAmount'),
            dataIndex: 'paidAmount',
            width: '16%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '15%' }),
    ];

    return tableColumn;
};
