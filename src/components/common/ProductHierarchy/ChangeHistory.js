/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Button } from 'antd';

import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { convertDateTime, dateFormatView, timeFormatView } from 'utils/formatDateTime';
import { tblPrepareColumns, tblStatusColumn } from 'utils/tableColumn';
import { withDrawer } from 'components/withDrawer';
import { DataTable } from 'utils/dataTable';
import { translateContent } from 'utils/translateContent';

import styles from '../ChangeHistory/ChangeHistory.module.scss';

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

const ChangeHistoryMain = ({ fetchChangeHistoryList, changeHistoryShowLoading, isLoading, userId, isHistoryLoaded, isHistoryLoading, changeHistoryData, organizationId, onCloseAction }) => {
    useEffect(() => {
        if (organizationId) {
            fetchChangeHistoryList({ setIsLoading: changeHistoryShowLoading, userId, manufactureOrgId: organizationId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organizationId]);

    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('productHierarchy.label.changedDate'),
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
            title: translateContent('productHierarchy.label.changedBy'),
            dataIndex: 'changedBy',
        }),
        tblPrepareColumns({
            title: translateContent('productHierarchy.label.attribute'),
            dataIndex: 'attributeKey',
        }),
        tblPrepareColumns({
            title: translateContent('productHierarchy.label.moduleTitle'),
            dataIndex: 'prodctCode',
        }),
        tblPrepareColumns({
            title: translateContent('productHierarchy.heading.parent'),
            dataIndex: 'parentAttributeName',
        }),
        tblPrepareColumns({
            title: translateContent('productHierarchy.label.shortDescription'),
            dataIndex: 'prodctShrtDescription',
        }),
        tblPrepareColumns({
            title: translateContent('productHierarchy.label.longDescription'),
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

export const ChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ChangeHistoryMain, { title: translateContent('global.changeHistory.title'), width: '90%' }));
