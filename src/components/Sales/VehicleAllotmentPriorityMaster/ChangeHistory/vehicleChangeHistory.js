/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Button, Col } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { convertDateTime } from 'utils/formatDateTime';

import { tblPrepareColumns } from 'utils/tableColumn';
import { otfDataActions } from 'store/actions/data/otf/otf';

import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';
import { BASE_URL_OTF_CHANGE_HISTORY as customURL } from 'constants/routingApi';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

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

const ChangeHistoryMain = ({ fetchOTFChangeHistory, onCloseAction, listShowChangeHistoryLoading, isChangeHistoryLoading, userId, isChangeHistoryLoaded, changeHistoryData, selectedOrderId }) => {
    useEffect(() => {
        if (selectedOrderId) {
            const extraParams = [
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: selectedOrderId,
                    name: 'Booking Number',
                },
            ];
            fetchOTFChangeHistory({ customURL, setIsLoading: listShowChangeHistoryLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOrderId]);

    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('vehicleAllotmentPriorityMaster.label.modifiedDateTime'),
            dataIndex: 'modifiedDate',
            render: (text) => [
                <div>
                    {convertDateTime(text, 'DD MMM YYYY')}
                    <br />
                    {convertDateTime(text, 'HH:mm a')}
                </div>,
            ],
        }),
        tblPrepareColumns({
            title: translateContent('vehicleAllotmentPriorityMaster.label.modifiedBy'),
            dataIndex: 'modifiedBy',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleAllotmentPriorityMaster.label.fieldName'),
            dataIndex: 'fieldName',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleAllotmentPriorityMaster.label.oldValue'),
            dataIndex: 'oldValue',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleAllotmentPriorityMaster.label.newValue'),
            dataIndex: 'newValue',
        }),
    ];

    const tableProps = {
        isChangeHistoryLoading,
        tableColumn,
        tableData: changeHistoryData?.otfChangeHistoryListResponse || [],
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

export const ChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ChangeHistoryMain, { title: 'Change History', width: '90%' }));
