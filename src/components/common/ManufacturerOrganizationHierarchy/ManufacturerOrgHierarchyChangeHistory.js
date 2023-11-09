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
import { convertDateTime, dateFormatView, timeFormatView } from 'utils/formatDateTime';
import { tblPrepareColumns, tblStatusColumn } from 'utils/tableColumn';
import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';
import styles from '../ChangeHistory/ChangeHistory.module.scss';
import { translateContent } from 'utils/translateContent';

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
            title: translateContent('manufacturerOrganisation.label.changedDate'),
            dataIndex: 'changedDate',
            render: (text) => [
                <div>
                    {convertDateTime(text, dateFormatView)}
                    <br />
                    {convertDateTime(text, timeFormatView)}
                </div>,
            ],
        }),
        tblPrepareColumns({
            title: translateContent('manufacturerOrganisation.label.changedBy'),
            dataIndex: 'changedBy',
        }),
        tblPrepareColumns({
            title: translateContent('manufacturerOrganisation.label.attribute'),
            dataIndex: 'attributeCode',
        }),
        tblPrepareColumns({
            title: translateContent('manufacturerOrganisation.label.code'),
            dataIndex: 'hierarchyCode',
        }),
        tblPrepareColumns({
            title: translateContent('manufacturerOrganisation.label.parent'),
            dataIndex: 'parentName',
        }),
        tblPrepareColumns({
            title: translateContent('manufacturerOrganisation.label.shortDescription'),
            dataIndex: 'shortDescript',
        }),
        tblPrepareColumns({
            title: translateContent('manufacturerOrganisation.label.longDescription'),
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
                            {translateContent('global.buttons.close')}
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export const ManufacturerOrgHierarchyChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ManufacturerOrgHierarchyChangeHistoryMain, { title: translateContent('global.changeHistory.title'), width: '90%' }));
