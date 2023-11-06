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
import { tblPrepareColumns, tblStatusColumn } from 'utils/tableCloumn';

import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';
import styles from 'components/common/ChangeHistory/ChangeHistory.module.scss';
import { translateContent } from 'utils/translateContent';

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
        if (userId) {
            fetchChangeHistoryList({ setIsLoading: changeHistoryShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHistoryLoaded, userId]);

    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('adminHierarchy.label.changedDate'),
            dataIndex: 'changedDate',
            render: (text) => convertDateTime(text),
        }),
        tblPrepareColumns({
            title: translateContent('adminHierarchy.label.changedBy'),
            dataIndex: 'changedBy',
        }),
        tblPrepareColumns({
            title: translateContent('adminHierarchy.label.attributeCode'),
            dataIndex: 'attributeCode',
        }),
        tblPrepareColumns({
            title: translateContent('adminHierarchy.label.shortDescription'),
            dataIndex: 'shortDescription',
        }),
        tblPrepareColumns({
            title: translateContent('adminHierarchy.label.longDescription'),
            dataIndex: 'longDescription',
        }),
        tblPrepareColumns({
            title: translateContent('adminHierarchy.label.hierarchyCode'),
            dataIndex: 'code',
        }),
        tblStatusColumn({ styles, width: '15%' }),
    ];

    const tableProps = {
        isLoading: !isHistoryLoaded,
        tableColumn,
        tableData: changeHistoryData,
    };
    return (
        <div className={styles.changeHistoryContainer}>
            <DataTable {...tableProps} />
        </div>
    );
};

const ManufacturerAdminHierarchyChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ManufacturerAdminHierarchyChangeHistoryMain, { title: translateContent('adminHierarchy.heading.changeHistoryTitle'), width: '90%' }));

export default ManufacturerAdminHierarchyChangeHistory;
