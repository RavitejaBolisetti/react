/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { CopytoClipboard } from 'utils/CopytoClipboard';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title:  translateContent('claimEmpowerment.tableColumn.requestId'),
            dataIndex: 'requestId',
            width: '14%',
            // render: (text) => {
            //     return (
            //         <p>
            //             {text}
            //             <span>
            //                 <CopytoClipboard text={text} />
            //             </span>
            //         </p>
            //     );
            // },
        }),

        tblPrepareColumns({
            title: translateContent('claimEmpowerment.tableColumn.requestDate'),
            dataIndex: 'requestDate',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
        }),

        tblPrepareColumns({
            title: translateContent('claimEmpowerment.tableColumn.claimType'),
           dataIndex: 'claimType',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('claimEmpowerment.tableColumn.dealerName'),
            dataIndex: 'dealerName',
            width: '20%',
        }),
        tblPrepareColumns({
            title: translateContent('claimEmpowerment.tableColumn.dealerBranch'),
            dataIndex: 'dealerBranch',
            width: '20%',
        }),
        tblPrepareColumns({
            title: translateContent('claimEmpowerment.tableColumn.requeststatus'),
            dataIndex: 'requeststatus',
            width: '32%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%' }),
    ];

    return tableColumn;
};

