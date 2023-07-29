/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { tblPrepareColumns, tblStatusColumn } from 'utils/tableColumn';

import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';

import styles from '../../../ChangeHistory/ChangeHistory.module.css';

const ChangeHistoryMain = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Old Name',
            dataIndex: 'oldName',
            render: <p>Aman</p>,
        }),
        tblPrepareColumns({
            title: 'New Name',
            dataIndex: 'newName',
            render: <p>Aman</p>,
        }),
        tblPrepareColumns({
            title: 'Request Date',
            dataIndex: 'requestDate',
            render: <p>Aman</p>,
        }),
        tblPrepareColumns({
            title: 'Approved By/ Rejected By',
            dataIndex: 'approvedRejected',
            render: <p>Aman</p>,
        }),
        tblPrepareColumns({
            title: 'Approved Date/Rejection Date',
            dataIndex: 'approvedRejectDate',
            render: <p>Aman</p>,
        }),
        tblPrepareColumns({
            title: 'Remarks',
            dataIndex: 'remarks',
            render: <p>Aman</p>,
        }),
        tblPrepareColumns({
            title: 'Supported Doc',
            dataIndex: 'prodctLongDiscription',
            render: <p>Aman</p>,
        }),
        tblStatusColumn({ styles, width: '15%' }),
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
