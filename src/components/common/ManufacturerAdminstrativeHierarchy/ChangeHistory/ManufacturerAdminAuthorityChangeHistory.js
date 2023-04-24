import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';
import { convertDateTime } from 'utils/formatDateTime';
import { tblPrepareColumns } from 'utils/tableCloumn';

import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';

import styles from 'components/common/ChangeHistory/ChangeHistory.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerAdminHierarchy: { isHistoryLoading, isHistoryLoaded = false, authHistoryData: changeHistoryData = [], changeHistoryAuthorityVisible },
        },
    } = state;

    let returnValue = {
        userId,
        isHistoryLoading,
        isHistoryLoaded,
        isVisible: changeHistoryAuthorityVisible,
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
        if (!isHistoryLoaded && userId) {
            fetchAuthorityChangeHistoryList({ setIsLoading: changeHistoryAuthorityShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHistoryLoaded]);

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Created Date ',
            dataIndex: 'createdDate',
            render: (text) => convertDateTime(text),
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Created By',
            dataIndex: 'createdBy',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Authority Type Code',
            dataIndex: 'authorityTypeCode',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Employee Name',
            dataIndex: 'employeeName',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Employee Token No.',
            dataIndex: 'authorityEmployeeTokenNo',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Authority Id',
            dataIndex: 'manufacturerAdminAuthorityId',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Effective From',
            dataIndex: 'effectiveFrom',
            render: (text) => convertDateTime(text),
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Effective To',
            dataIndex: 'effectiveTo',
            render: (text) => convertDateTime(text),
        })
    );

    const tableProps = {
        isLoading,
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
