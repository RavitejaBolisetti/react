/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { convertDateTime } from 'utils/formatDateTime';
import { tblPrepareColumns, tblStatusColumn } from 'utils/tableCloumn';
import styles from './ChangeHistory.module.css';
import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';

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
            render: (text) => [
                <div>
                    {convertDateTime(text, 'DD MMM YYYY')}
                    <br />
                    {convertDateTime(text, 'HH:mm a')}
                </div>,
            ],
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
            dataIndex: 'parntHeirarchyCode',
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

export const ChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ChangeHistoryMain, { title: 'Change History', width: 1200 }));
