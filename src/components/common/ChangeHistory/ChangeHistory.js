import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { convertDateTime } from 'utils/formatDateTime';
import { tblPrepareColumns } from 'utils/tableCloumn';
import styles from './ChangeHistory.module.css';
import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ProductHierarchy: { isHistoryLoading, isHistoryLoaded = false, historyData: changeHistoryData = [], changeHistoryVisible },
        },
    } = state;

    console.log('🚀 ~ file: ChangeHistory.js:17 ~ mapStateToProps ~ changeHistoryVisible:', changeHistoryVisible);

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
            title: 'Attribute',
            dataIndex: 'parentAttributeName',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'prodctCode',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Parent',
            dataIndex: 'parntHeirarchyCode',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Short Description',
            dataIndex: 'prodctShrtDescription',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Long Description',
            dataIndex: 'prodctLongDiscription',
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

export const ChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ChangeHistoryMain, { title: 'Change History', width: '90%' }));
