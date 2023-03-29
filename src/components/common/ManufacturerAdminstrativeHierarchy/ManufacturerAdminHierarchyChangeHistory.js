import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';
import { convertDateTime } from 'utils/formatDateTime';
import { tblPrepareColumns } from 'utils/tableCloumn';

import styles from './ChangeHistory.module.css';
import { DataTable } from 'utils/dataTable';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerAdminHierarchy: { isHistoryLoading, isHistoryLoaded = false, historyData: changeHistoryData = [] },
        },
    } = state;
    let returnValue = {
        userId,
        isHistoryLoading,
        isHistoryLoaded,
        changeHistoryData: changeHistoryData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchChangeHistoryList: manufacturerAdminHierarchyDataActions.fetchChangeHistoryList,
            changeHistoryShowLoading: manufacturerAdminHierarchyDataActions.changeHistoryShowLoading,
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
            title: 'Parent',
            dataIndex: 'parent',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Short Description',
            dataIndex: 'shortDescript',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Long Description',
            dataIndex: 'longDescript',
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
            render: (text) => (text === 'Y' ? 'Active' : 'In Active'),
        })
    );

    const tableProps = {
        isLoading,
        tableColumn,
        tableData: changeHistoryData,
    };
    return (
        <div className={styles.changeHistoryContainer}>
            <div>
                <h3>Change History</h3>
            </div>

            <DataTable {...tableProps} />
        </div>
    );
};

export const ManufacturerAdminHierarchyChangeHistory = connect(mapStateToProps, mapDispatchToProps)(ManufacturerAdminHierarchyChangeHistoryMain);
