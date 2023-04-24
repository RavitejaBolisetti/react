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
            ManufacturerAdminHierarchy: { isHistoryLoading, isHistoryLoaded = false, historyData: changeHistoryData = [], changeHistoryVisible: isVisible },
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
            fetchChangeHistoryList: manufacturerAdminHierarchyDataActions.fetchChangeHistoryList,
            changeHistoryShowLoading: manufacturerAdminHierarchyDataActions.changeHistoryShowLoading,
            onCloseAction: manufacturerAdminHierarchyDataActions.changeHistoryModelClose,
        },
        dispatch
    ),
});

const ManufacturerAdminHierarchyChangeHistoryMain = ({ fetchChangeHistoryList, changeHistoryShowLoading, isLoading, userId, isHistoryLoaded, changeHistoryData }) => {
    useEffect(() => {
        if (!isHistoryLoaded && userId) {
            fetchChangeHistoryList({ setIsLoading: changeHistoryShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHistoryLoaded]);

    const tableColumn = [
        tblPrepareColumns({
            title: 'Changed/Modified Date ',
            dataIndex: 'changedDate',
            render: (text) => convertDateTime(text),
        }),
        tblPrepareColumns({
            title: 'Changed By',
            dataIndex: 'changedBy',
        }),
        tblPrepareColumns({
            title: 'Attribute Code',
            dataIndex: 'attributeCode',
        }),
        tblPrepareColumns({
            title: 'Short Description',
            dataIndex: 'shortDescript',
        }),
        tblPrepareColumns({
            title: 'Long Description',
            dataIndex: 'shortDescript',
        }),
        tblPrepareColumns({
            title: 'Hierarchy Code',
            dataIndex: 'hierarchyCode',
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (text) => (text ? 'Active' : 'In Active'),
        }),
    ];

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

const ManufacturerAdminHierarchyChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ManufacturerAdminHierarchyChangeHistoryMain, { title: 'Admin Change History', width: '90%' }));

export default ManufacturerAdminHierarchyChangeHistory;