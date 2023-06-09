import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';

import { convertDateTime } from 'utils/formatDateTime';
import { tblPrepareColumns, tblStatusColumn } from 'utils/tableCloumn';

import { withDrawer } from 'components/withDrawer';

import { DataTable } from 'utils/dataTable';

import styles from '../ChangeHistory/ChangeHistory.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ProductHierarchy: { isHistoryLoading, isHistoryLoaded = false, historyData: changeHistoryData = [], changeHistoryVisible: isVisible, organizationId = '' },
        },
    } = state;

    let returnValue = {
        userId,
        isHistoryLoading,
        isHistoryLoaded,
        isVisible,
        changeHistoryData,
        organizationId,
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

const ChangeHistoryMain = ({ fetchChangeHistoryList, changeHistoryShowLoading, isLoading, userId, isHistoryLoaded, isHistoryLoading, changeHistoryData, organizationId }) => {
    useEffect(() => {
        if (organizationId) {
            fetchChangeHistoryList({ setIsLoading: changeHistoryShowLoading, userId, manufactureOrgId: organizationId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organizationId]);

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
            dataIndex: 'attributeKey',
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

        tblStatusColumn({ styles, width: '15%' }),
    ];

    const tableProps = {
        isLoading: isHistoryLoading,
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
