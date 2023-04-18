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
            ManufacturerAdminHierarchy: { isHistoryLoading, isHistoryLoaded = false, authHistoryData: changeHistoryData = [], changeHistoryVisible },
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

export const ManufacturerAdminAuthorityChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ManufacturerAdminAuthorityChangeHistoryMain, { title: 'Authority Change History', width: '90%' }));
