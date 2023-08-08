/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Button } from 'antd';

import { manufacturerOrgHierarchyDataActions } from 'store/actions/data/manufacturerOrgHierarchy';
import { convertDateTime } from 'utils/formatDateTime';
import { tblPrepareColumns, tblStatusColumn } from 'utils/tableColumn';
import styles from 'components/common/Common.module.css';
import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerOrgHierarchy: { isHistoryLoading, isHistoryLoaded = false, historyData: changeHistoryData = [], changeHistoryVisible },
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

const ManufacturerOrgHierarchyChangeHistoryMain = ({ onCloseAction, fetchChangeHistoryList, changeHistoryShowLoading, isLoading, userId, isHistoryLoaded, changeHistoryData }) => {
    useEffect(() => {
        if (!isHistoryLoaded) {
            fetchChangeHistoryList({ setIsLoading: changeHistoryShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHistoryLoaded]);

    const tableColumn = [
        tblPrepareColumns({
            title: 'Changed Date ',
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
            dataIndex: 'attributeCode',
        }),
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'hierarchyCode',
        }),
        tblPrepareColumns({
            title: 'Parent',
            dataIndex: 'parentName',
        }),
        tblPrepareColumns({
            title: 'Short Description',
            dataIndex: 'shortDescript',
        }),
        tblPrepareColumns({
            title: 'Long Description',
            dataIndex: 'longDescript',
        }),
        tblStatusColumn({ styles, width: '15%' }),
    ];

    const tableProps = {
        isLoading: !isHistoryLoaded,
        tableColumn,
        tableData: changeHistoryData,
    };
    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
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

export const ManufacturerOrgHierarchyChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ManufacturerOrgHierarchyChangeHistoryMain, { title: 'Change History', width: '90%' }));
