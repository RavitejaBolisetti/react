/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withDrawer } from 'components/withDrawer';

import { ManufacturerAdminHierarchyChangeHistoryDataActions } from 'store/actions/data/manufacturerAdminHierarchy/manufacturerAdminHierarchyChangeHistory';
import { ManufacturerOrgHierarchyChangeHistoryDataActions } from 'store/actions/data/manufacturerOrgHierarchy/manufacturerorgHierarchyChangeHistory';
import { tableColumnAdmin, tableColumnAuthority } from './TableColumns';

import { DataTable } from 'utils/dataTable';
import styles from './../ManufacturerAdmin.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerAdmin: {
                ManufacturerAdminHierarchyChangeHistory: { isLoading: isAdminHierarchyHistoryLoading, isDataLoaded: isAdminHistoryLoaded = false, data: ChangeHistoryAdminData = [] },
            },
            ManufacturerOrg: {
                ManufacturerOrgHierarchyChangeHistory: { isLoading: isHistoryOrgHierarchyLoading, isDataLoaded: isOrgHistoryLoaded = false, data: ChangeHistoryOrgData = [] },
            },
        },
    } = state;

    let returnValue = {
        userId,
        isAdminHierarchyHistoryLoading,
        isHistoryOrgHierarchyLoading,
        isOrgHistoryLoaded,
        isAdminHistoryLoaded,
        ChangeHistoryAdminData,
        ChangeHistoryOrgData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchAdminHierarchy: ManufacturerAdminHierarchyChangeHistoryDataActions.fetchList,
            changeHistoryAdminShowLoading: ManufacturerAdminHierarchyChangeHistoryDataActions.listShowLoading,

            fetchOrgChangeHistoryList: ManufacturerOrgHierarchyChangeHistoryDataActions.fetchList,
            changeHistoryOrgShowLoading: ManufacturerOrgHierarchyChangeHistoryDataActions.listShowLoading,
        },
        dispatch
    ),
});

const ChangeHistoryMain = (props) => {
    const { fetchAdminHierarchy, changeHistoryAdminShowLoading, fetchOrgChangeHistoryList, changeHistoryOrgShowLoading } = props;
    const { userId, isAdminHierarchyHistoryLoading, isHistoryOrgHierarchyLoading, isOrgHistoryLoaded, isAdminHistoryLoaded, ChangeHistoryAdminData, ChangeHistoryOrgData } = props;
    const { activeKey } = props;
    const onSuccessAction = (res) => {};

    const onErrorAction = (message) => {};
    useEffect(() => {
        if (userId && activeKey) {
            fetchAdminHierarchy({ setIsLoading: changeHistoryAdminShowLoading, userId, onErrorAction, onSuccessAction });
            fetchOrgChangeHistoryList({ setIsLoading: changeHistoryOrgShowLoading, userId, onErrorAction, onSuccessAction });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, activeKey]);

    const tableProps = {
        isLoading: activeKey === '1' ? isAdminHierarchyHistoryLoading : isHistoryOrgHierarchyLoading,
        tableColumn: activeKey === '1' ? tableColumnAuthority : tableColumnAdmin,
        tableData: activeKey === '1' ? ChangeHistoryAdminData : ChangeHistoryOrgData,
    };

    return (
        <div className={styles.changeHistoryContainer}>
            <DataTable {...tableProps} />
        </div>
    );
};

export const ChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ChangeHistoryMain, { title: '', width: '90%' }));
