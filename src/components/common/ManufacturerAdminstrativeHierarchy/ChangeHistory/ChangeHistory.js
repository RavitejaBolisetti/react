/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
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
    const { userId, isAdminHierarchyHistoryLoading, isHistoryOrgHierarchyLoading, ChangeHistoryAdminData, ChangeHistoryOrgData } = props;
    const { activeKey, organizationId } = props;
    const [page, setPage] = useState({ pageSize: 10, current: 1 });

    useEffect(() => {
        if (userId && activeKey) {
            const extraParams = [
                {
                    key: 'manufacturerOrgId',
                    title: 'manufacturerOrgId',
                    value: organizationId,
                    name: 'manufacturerOrgId',
                },
                {
                    key: 'pageNumber',
                    title: 'pageNumber',
                    value: page?.current,
                    name: 'pageNumber',
                },
                {
                    key: 'pageSize',
                    title: 'pageSize',
                    value: page?.pageSize,
                    name: 'pageSize',
                },
            ];
            if (activeKey === '1') {
                fetchAdminHierarchy({ setIsLoading: changeHistoryAdminShowLoading, userId, extraParams });
            } else {
                fetchOrgChangeHistoryList({ setIsLoading: changeHistoryOrgShowLoading, userId, extraParams });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, activeKey, page?.pageSize, page?.current]);

    const tableProps = {
        isLoading: activeKey === '1' ? isAdminHierarchyHistoryLoading : isHistoryOrgHierarchyLoading,
        tableColumn: activeKey === '1' ? tableColumnAdmin : tableColumnAuthority,
        tableData: activeKey === '1' ? ChangeHistoryAdminData : ChangeHistoryOrgData,
        setPage,
    };

    return (
        <div className={styles.changeHistoryContainer}>
            <DataTable {...tableProps} />
        </div>
    );
};

export const ChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ChangeHistoryMain, { title: '', width: '90%' }));
