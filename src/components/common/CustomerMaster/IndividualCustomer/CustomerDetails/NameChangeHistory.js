import React from 'react';
import { connect } from 'react-redux';

import { tblPrepareColumns, tblStatusColumn } from 'utils/tableCloumn';
import styles from '../../../ChangeHistory/ChangeHistory.module.css';
import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';


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

export const NameChangeHistory = (withDrawer(ChangeHistoryMain, { title: 'Name Change History', width: '90%' }));
