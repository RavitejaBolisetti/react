import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';
import { convertDateTime } from 'utils/formatDateTime';
import { tblPrepareColumns } from 'utils/tableCloumn';

import styles from '../ChangeHistory/ChangeHistory.module.css';
import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerAdminHierarchy: { isHistoryLoading, isHistoryLoaded = false, historyData: changeHistoryData = [], changeHistoryVisible },
        },
    } = state;

    // console.log('🚀 ~ file: ChangeHistory.js:17 ~ mapStateToProps ~ changeHistoryVisible:', changeHistoryVisible);

    let returnValue = {
        userId,
        isHistoryLoading,
        isHistoryLoaded,
        isVisible: changeHistoryVisible,
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
        if (!isHistoryLoaded) {
            fetchChangeHistoryList({ setIsLoading: changeHistoryShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHistoryLoaded]);

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Changed/Modified Date ',
            dataIndex: 'changedDate',
            render: (text) => convertDateTime(text),
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Changed By',
            dataIndex: 'changedBy',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Attribute Code',
            dataIndex: 'attributeCode',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Authority type',
            dataIndex: 'authorityType',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Employee Code',
            dataIndex: 'employeeCode',
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
            title: 'Date Effective From ',
            dataIndex: 'dateEffectiveFrom',
            render: (text) => convertDateTime(text),
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Date Effective To ',
            dataIndex: 'dateEffectiveTo',
            render: (text) => convertDateTime(text),
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            filters: [
                {
                    text: 'Active',
                    value: 'Active',
                },
                {
                    text: 'Inactive',
                    value: 'Inactive',
                },
            ],
            render: (text) => (text ? 'Active' : 'In Active'),
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

export const ManufacturerAdminHierarchyChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ManufacturerAdminHierarchyChangeHistoryMain, { title: 'Change History', width: '90%' }));
