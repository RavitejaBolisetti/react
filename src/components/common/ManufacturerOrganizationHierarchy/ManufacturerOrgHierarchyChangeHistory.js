import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { manufacturerOrgHierarchyDataActions } from 'store/actions/data/manufacturerOrgHierarchy';
import { convertDateTime } from 'utils/formatDateTime';
import { tblPrepareColumns } from 'utils/tableCloumn';
import styles from '../ChangeHistory/ChangeHistory.module.css';
import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerOrgHierarchy: { isHistoryLoading, isHistoryLoaded = false, historyData: changeHistoryData = [], changeHistoryVisible },
        },
    } = state;

    let returnValue = {
        userId,
        isHistoryLoading,
        isVisible: changeHistoryVisible,
        isHistoryLoaded,
        changeHistoryData: changeHistoryData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchChangeHistoryList: manufacturerOrgHierarchyDataActions.fetchChangeHistoryList,
            changeHistoryShowLoading: manufacturerOrgHierarchyDataActions.changeHistoryShowLoading,
            onCloseAction: manufacturerOrgHierarchyDataActions.changeHistoryModelClose,
        },
        dispatch
    ),
});

const ManufacturerOrgHierarchyChangeHistoryMain = ({ fetchChangeHistoryList, changeHistoryShowLoading, isLoading, userId, isHistoryLoaded, changeHistoryData }) => {
    useEffect(() => {
        if (!isHistoryLoaded) {
            fetchChangeHistoryList({ setIsLoading: changeHistoryShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHistoryLoaded]);

    const tableColumn = [
        tblPrepareColumns({
            title: 'Changed Date ',
            dataIndex: 'changedDate',
            render: (text) => convertDateTime(text),
        }),
        tblPrepareColumns({
            title: 'Changed By',
            dataIndex: 'changedBy',
        }),
        tblPrepareColumns({
            title: 'Attribute',
            dataIndex: 'attributeCode',
        }),
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'hierarchyCode',
        }),
        tblPrepareColumns({
            title: 'Parent',
            dataIndex: 'parent',
        }),
        tblPrepareColumns({
            title: 'Short Description',
            dataIndex: 'shortDescript',
        }),
        tblPrepareColumns({
            title: 'Long Description',
            dataIndex: 'longDescript',
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (text) => {
                console.log('record', text, typeof text);
                return JSON.parse(text) ? 'Active' : 'InActive';
            },
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

export const ManufacturerOrgHierarchyChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ManufacturerOrgHierarchyChangeHistoryMain, { title: 'Change History', width: '90%' }));
