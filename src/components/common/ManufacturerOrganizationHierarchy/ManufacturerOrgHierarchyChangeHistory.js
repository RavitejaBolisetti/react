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
            ManufacturerOrgHierarchy: { isHistoryLoading, isHistoryLoaded = false, historyData: changeHistoryData = [],changeHistoryVisible},
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

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Changed Date ',
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
            title: 'Attribute',
            dataIndex: 'attributeCode',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'hierarchyCode',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Parent',
            dataIndex: 'parentManufactOrgHie',
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
        
            <DataTable {...tableProps} />
        </div>
    );
};

export const ManufacturerOrgHierarchyChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ManufacturerOrgHierarchyChangeHistoryMain, { title: 'Change History', width: '90%' }));
