/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { convertDateTime } from 'utils/formatDateTime';

import { tblPrepareColumns, tblStatusColumn } from 'utils/tableCloumn';
import { otfDataActions } from 'store/actions/data/otf/otf';

import ChangeHistoryStyles from './ChangeHistory.module.css';
import styles from 'components/common/Common.module.css';

import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';
import { Row, Button, Col } from 'antd';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                OtfSearchList: { detailData: otfData = [], isChangeHistoryLoaded, isChangeHistoryLoading, changeHistoryData = [] },
            },
        },
    } = state;

    let returnValue = {
        userId,
        otfData,
        isChangeHistoryLoaded,
        isChangeHistoryLoading,
        changeHistoryData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchOTFChangeHistory: otfDataActions.changeHistory,
            listShowChangeHistoryLoading: otfDataActions.listShowChangeHistoryLoading,
        },
        dispatch
    ),
});

const ChangeHistoryMain = ({ fetchChangeHistoryList, onCloseAction, listShowChangeHistoryLoading, isChangeHistoryLoading, userId, isChangeHistoryLoaded, changeHistoryData, selectedOrderId }) => {
    useEffect(() => {
        if (!isChangeHistoryLoaded) {
            const extraParams = [
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: selectedOrderId,
                    name: 'OTF Number',
                },
            ];
            fetchChangeHistoryList({ setIsLoading: listShowChangeHistoryLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChangeHistoryLoaded]);

    const tableColumn = [
        tblPrepareColumns({
            title: 'Modified Date & Time',
            dataIndex: 'modifiedDate',
            render: (text) => convertDateTime(text),
        }),
        tblPrepareColumns({
            title: 'Modified By',
            dataIndex: 'modifiedBy',
        }),
        tblPrepareColumns({
            title: 'AttriActivity Type',
            dataIndex: 'activityType',
        }),
        tblPrepareColumns({
            title: 'Activity Description',
            dataIndex: 'activityDescription',
        }),
        tblPrepareColumns({
            title: 'Remarks',
            dataIndex: 'remarks',
        }),
    ];

    const tableProps = {
        isChangeHistoryLoading,
        tableColumn,
        tableData: [{ modifiedDate: '', modifiedBy: 'Shakambhar', activityType: 'Cancellation', activityDescription: 'Otf Cancellation', remarks: 'Done' }],
    };
    return (
        <div className={ChangeHistoryStyles.ChangeHistoryDrawer}>
            <div className={ChangeHistoryStyles.changeHistoryMainContainer}>
                <h2>OTF NUMBER: {selectedOrderId}</h2>
                <div className={ChangeHistoryStyles.ChangeHistoryContainer}>
                    <DataTable {...tableProps} />
                </div>
            </div>
            <Row gutter={20} className={ChangeHistoryStyles.formFooter}>
                <Col xs={24} sm={8} md={6} lg={4} xl={4}>
                    <Button danger onClick={onCloseAction}>
                        Close
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export const ChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ChangeHistoryMain, { title: 'Change History', width: '90%' }));
