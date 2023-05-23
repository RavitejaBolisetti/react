import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';

import { convertDateTime } from 'utils/formatDateTime';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { withDrawer } from 'components/withDrawer';

import { DataTable } from 'utils/dataTable';

import styles from '../ChangeHistory/ChangeHistory.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ProductHierarchy: { isHistoryLoading, isHistoryLoaded = false, historyData: changeHistoryData = [], changeHistoryVisible: isVisible },
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
            fetchChangeHistoryList: productHierarchyDataActions.fetchChangeHistoryList,
            changeHistoryShowLoading: productHierarchyDataActions.changeHistoryShowLoading,
            onCloseAction: productHierarchyDataActions.changeHistoryModelClose,
        },
        dispatch
    ),
});

const ChangeHistoryMain = ({ fetchChangeHistoryList, changeHistoryShowLoading, isLoading, userId, isHistoryLoaded, changeHistoryData }) => {
    useEffect(() => {
        if (!isHistoryLoaded) {
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
            title: 'Attribute',
            dataIndex: 'parentAttributeName',
        }),
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'prodctCode',
        }),
        tblPrepareColumns({
            title: 'Parent',
            dataIndex: 'parentAttributeName',
        }),
        tblPrepareColumns({
            title: 'Short Description',
            dataIndex: 'prodctShrtDescription',
        }),
        tblPrepareColumns({
            title: 'Long Description',
            dataIndex: 'prodctLongDiscription',
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            // filters: [
            //     {
            //         text: 'Active',
            //         value: 'Active',
            //     },
            //     {
            //         text: 'Inactive',
            //         value: 'Inactive',
            //     },
            // ],
            render: (text) => (text === 'Y' ? 'Active' : 'In Active'),
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

export const ChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ChangeHistoryMain, { title: 'Change History', width: '90%' }));
