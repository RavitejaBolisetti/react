/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';
import { convertDateTime } from 'utils/formatDateTime';
import { tblPrepareColumns } from 'utils/tableCloumn';

import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';
import styles from 'components/common/ChangeHistory/ChangeHistory.module.scss';
//import styles from 'components/common/ChangeHistory/ChangeHistory.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerAdminHierarchy: { isHistoryLoading, isHistoryLoaded = false, authHistoryData: changeHistoryData = [], changeHistoryAuthorityVisible: isVisible },
        },
    } = state;

    let returnValue = {
        userId,
        isHistoryLoading,
        isHistoryLoaded,
        isVisible,
        changeHistoryData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchAuthorityChangeHistoryList: manufacturerAdminHierarchyDataActions.fetchAuthorityChangeHistoryList,
            changeHistoryAuthorityShowLoading: manufacturerAdminHierarchyDataActions.changeHistoryAuthorityShowLoading,
            onCloseAction: manufacturerAdminHierarchyDataActions.changeHistoryAuthorityModelClose,
        },
        dispatch
    ),
});

const ManufacturerAdminAuthorityChangeHistoryMain = ({ fetchAuthorityChangeHistoryList, changeHistoryAuthorityShowLoading, isLoading, userId, isHistoryLoaded, changeHistoryData }) => {
    useEffect(() => {
        if ( userId) {
            fetchAuthorityChangeHistoryList({ setIsLoading: changeHistoryAuthorityShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHistoryLoaded, userId]);

    const tableColumn = [
        tblPrepareColumns({
            title: 'Created Date ',
            dataIndex: 'createdDate',
            render: (text) => convertDateTime(text),
        }),
        tblPrepareColumns({
            title: 'Created By',
            dataIndex: 'createdBy',
        }),
        tblPrepareColumns({
            title: 'Authority Type Code',
            dataIndex: 'authorityTypeCode',
        }),
        tblPrepareColumns({
            title: 'Employee Name',
            dataIndex: 'employeeName',
        }),
        tblPrepareColumns({
            title: 'Employee Token No.',
            dataIndex: 'authorityEmployeeTokenNo',
        }),
        tblPrepareColumns({
            title: 'Authority Id',
            dataIndex: 'manufacturerAdminAuthorityId',
        }),
        tblPrepareColumns({
            title: 'Effective From',
            dataIndex: 'effectiveFrom',
            render: (text) => convertDateTime(text),
        }),
        tblPrepareColumns({
            title: 'Effective To',
            dataIndex: 'effectiveTo',
            render: (text) => convertDateTime(text),
        }),
    ];

    const tableProps = {
        isLoading : !isHistoryLoaded,
        tableColumn,
        tableData: changeHistoryData,
    };
    return (
        <div className={styles.changeHistoryContainer}>
            <DataTable {...tableProps} />
        </div>
    );
};

const ManufacturerAdminAuthorityChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ManufacturerAdminAuthorityChangeHistoryMain, { title: 'Authority Change History', width: '90%' }));

export default ManufacturerAdminAuthorityChangeHistory;
