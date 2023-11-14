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

import styles from 'assets/sass/app.module.scss';

import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';
import { translateContent } from 'utils/translateContent';

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

const ChangeHistoryMain = ({ onCloseAction, fetchChangeHistoryList, changeHistoryShowLoading, isLoading, userId, isHistoryLoaded, changeHistoryData }) => {
    useEffect(() => {
        if (!isHistoryLoaded) {
            fetchChangeHistoryList({ setIsLoading: changeHistoryShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHistoryLoaded]);

    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('productChangeHistory.label.changedDate'),
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
            title: translateContent('productChangeHistory.label.changedBy'),
            dataIndex: 'changedBy',
        }),
        tblPrepareColumns({
            title: translateContent('productChangeHistory.label.attribute'),
            dataIndex: 'parentAttributeName',
        }),
        tblPrepareColumns({
            title: translateContent('productChangeHistory.label.code'),
            dataIndex: 'prodctCode',
        }),
        tblPrepareColumns({
            title: translateContent('productChangeHistory.label.parent'),
            dataIndex: 'parntHeirarchyCode',
        }),
        tblPrepareColumns({
            title: translateContent('productChangeHistory.label.shortDescription'),
            dataIndex: 'prodctShrtDescription',
        }),
        tblPrepareColumns({
            title: translateContent('productChangeHistory.label.longDescription'),
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

export const ChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ChangeHistoryMain, { title: translateContent('common.changeHistory.title'), width: '90%' }));




