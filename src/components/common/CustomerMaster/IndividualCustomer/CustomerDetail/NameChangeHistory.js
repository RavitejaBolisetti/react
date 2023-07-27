/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { tblPrepareColumns, tblStatusColumn } from 'utils/tableCloumn';

import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';

import styles from '../../../ChangeHistory/ChangeHistory.module.css';

const ChangeHistoryMain = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Current Name',
            dataIndex: 'oldName',

        }),
        tblPrepareColumns({
            title: 'Previous Name',
            dataIndex: 'newName',

        }),
        tblPrepareColumns({
            title: 'Request Date',
            dataIndex: 'requestDate',

        }),
        tblPrepareColumns({
            title: 'Approved By/ Rejected By',
            dataIndex: 'approvedRejected',

        }),

        tblPrepareColumns({
            title: 'Remarks',
            dataIndex: 'remarks',

        }),
        tblPrepareColumns({
            title: 'Documents',
            dataIndex: 'prodctLongDiscription',

        }),
        tblStatusColumn({ styles, width: '10%' }),
    ];

    const tableProps = {
        tableColumn,
    };
    return (
        <div className={styles.changeHistoryContainer}>
            <DataTable {...tableProps} />
        </div>
    );
};

export const NameChangeHistory = withDrawer(ChangeHistoryMain, { title: 'Name Change History', width: '90%' });
