/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { convertDateTime, dateFormatView, timeFormatView } from 'utils/formatDateTime';

import { tblPrepareColumns } from 'utils/tableColumn';
import { otfDataActions } from 'store/actions/data/otf/otf';

import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';
import { BASE_URL_OTF_SO_MAPPING_UNMAPPING_HISTORY as customURL } from 'constants/routingApi';

import { Row, Button, Col } from 'antd';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                OtfSearchList: { detailData: otfData = [], isChangeHistoryLoaded, isChangeHistoryLoading, changeHistoryData },
            },
        },
    } = state;
    let returnValue = {
        userId,
        otfData,
        isChangeHistoryLoaded,
        isChangeHistoryLoading,
        changeHistoryData: changeHistoryData?.paginationData,
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

const ChangeHistoryMain = ({ fetchOTFChangeHistory, onCloseAction, listShowChangeHistoryLoading, isChangeHistoryLoading, userId, isChangeHistoryLoaded, changeHistoryData, selectedOrderId, selectedRecordId }) => {
    useEffect(() => {
        if (selectedRecordId) {
            const extraParams = [
                {
                    key: 'otfId',
                    value: selectedRecordId,
                },
            ];
            fetchOTFChangeHistory({ customURL, setIsLoading: listShowChangeHistoryLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRecordId]);

    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('bookingManagement.label.actionDateAndTime'),
            dataIndex: 'actionDate',
            render: (text) => [
                <div>
                    {convertDateTime(text, dateFormatView)}
                    <br />
                    {convertDateTime(text, timeFormatView)}
                </div>,
            ],
        }),
        tblPrepareColumns({
            title: translateContent('bookingManagement.label.actionedBy'),
            dataIndex: 'actionBy',
        }),
        tblPrepareColumns({
            title: translateContent('bookingManagement.label.action'),
            dataIndex: 'action',
        }),
        tblPrepareColumns({
            title: translateContent('bookingManagement.label.soNumber'),
            dataIndex: 'soNumber',
        }),
        tblPrepareColumns({
            title: translateContent('bookingManagement.label.soDate'),
            dataIndex: 'soDate',
            render: (text) => [<div>{convertDateTime(text, dateFormatView)}</div>],
        }),
    ];

    const tableProps = {
        isChangeHistoryLoading,
        tableColumn,
        tableData: changeHistoryData,
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <h4 className={styles.marT0}>
                        {translateContent('commonModules.label.bookingDetails.bookingNumber')}: {selectedOrderId}
                    </h4>
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

export const OtfSoMappingUnmappingChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ChangeHistoryMain, { title: 'Change History', width: '90%' }));
