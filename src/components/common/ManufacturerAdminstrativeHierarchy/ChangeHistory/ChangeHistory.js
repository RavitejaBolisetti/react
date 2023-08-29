/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Button } from 'antd';
import { withDrawer } from 'components/withDrawer';

import { ManufacturerAdminHierarchyChangeHistoryDataActions } from 'store/actions/data/manufacturerAdminHierarchy/manufacturerAdminHierarchyChangeHistory';
import { ManufacturerOrgHierarchyChangeHistoryDataActions } from 'store/actions/data/manufacturerOrgHierarchy/manufacturerorgHierarchyChangeHistory';
import { tableColumnAdmin, tableColumnAuthority } from './tableColumn';

import { DataTable } from 'utils/dataTable';
import { MANUFACTURER_HIERARCHY_TYPE } from 'constants/manufacturerHierarchyType';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

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
    const { organizationId, onCloseAction } = props;

    const isAdministrative = MANUFACTURER_HIERARCHY_TYPE?.ADMINISTRATIVE.key;
    const [activeKey, setActiveKey] = useState(isAdministrative);

    useEffect(() => {
        if (userId && activeKey) {
            const extraParams = [
                {
                    key: 'manufacturerOrgId',
                    title: 'manufacturerOrgId',
                    value: organizationId,
                    name: 'manufacturerOrgId',
                },
                // {
                //     key: 'pageNumber',
                //     title: 'pageNumber',
                //     value: page?.current,
                //     name: 'pageNumber',
                // },
                // {
                //     key: 'pageSize',
                //     title: 'pageSize',
                //     value: page?.pageSize,
                //     name: 'pageSize',
                // },
            ];
            if (activeKey === isAdministrative) {
                fetchAdminHierarchy({ setIsLoading: changeHistoryAdminShowLoading, userId, extraParams });
            } else {
                fetchOrgChangeHistoryList({ setIsLoading: changeHistoryOrgShowLoading, userId, extraParams });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, activeKey]);

    const tableProps = {
        pagination: false,
        isLoading: activeKey === isAdministrative ? isAdminHierarchyHistoryLoading : isHistoryOrgHierarchyLoading,
        tableColumn: activeKey === isAdministrative ? tableColumnAdmin : tableColumnAuthority,
        tableData: activeKey === isAdministrative ? ChangeHistoryAdminData : ChangeHistoryOrgData,
        scroll: { x: 1600, y: 'calc(100vh - 312px)' },
    };

    const handleTabChange = (key) => {
        setActiveKey(key);
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <div className={styles.changeHistoryToggleBtn}>
                        {Object.values(MANUFACTURER_HIERARCHY_TYPE)?.map((item) => {
                            return (
                                <Button onClick={() => handleTabChange(item?.key)} type={activeKey === item?.key ? 'primary' : 'link'}>
                                    {item?.title}
                                </Button>
                            );
                        })}
                    </div>
                    <DataTable {...tableProps} />
                </Col>
            </Row>
            <div className={styles.formFooter}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Button danger onClick={onCloseAction}>
                            Close
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

const ChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ChangeHistoryMain, { title: '', width: '90%' }));
export default ChangeHistory;
