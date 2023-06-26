/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Space, Collapse } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { otfInvoiceDetailDataActions } from 'store/actions/data/otf/invoiceDetail';
import { showGlobalNotification } from 'store/actions/notification';
import { dynamicExpandIcon } from 'utils/accordianExpandIcon';
import { DataTable } from 'utils/dataTable';

import { OTFStatusBar } from '../utils/OTFStatusBar';
import { OTFFormButton } from '../OTFFormButton';

import { tableColumnInvoice, tableColumnDelivery } from './tableColumn';

import styles from 'components/common/Common.module.css';

import { OTF_STATUS } from 'constants/OTFStatus';

const { Panel } = Collapse;
const { Text } = Typography;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                InvoiceDetail: { isLoaded: isDataLoaded = false, isLoading, data: invoiceData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Invoice Information';

    let returnValue = {
        userId,
        isDataLoaded,
        invoiceData,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: otfInvoiceDetailDataActions.fetchList,
            listShowLoading: otfInvoiceDetailDataActions.listShowLoading,
            resetData: otfInvoiceDetailDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const InvoiceDetailsMasterBase = (props) => {
    const { invoiceData, fetchList, userId, isDataLoaded, listShowLoading, showGlobalNotification } = props;
    const { section, selectedOrderId, selectedOrder: { orderStatus = false } = {} } = props;

    const [activeKey, setactiveKey] = useState([1]);

    const onChange = (values) => {
        if (activeKey?.includes(values)) {
            setactiveKey([]);
            return;
        }
        setactiveKey([]);
        setactiveKey([values]);
    };
    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'OTF Number',
        },
    ];

    const errorAction = (message) => {
        // showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    const displaySection = {
        invoiceInformation: orderStatus === OTF_STATUS?.INVOICED.title || orderStatus === OTF_STATUS?.DELIVERED.title,
        deliveryInformation: orderStatus === OTF_STATUS?.DELIVERED.title,
    };
    return (
        <>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <OTFStatusBar status={orderStatus} />
                        </Col>
                    </Row>
                    <Space size="middle" direction="vertical" className={styles.accordianContainer}>
                        {displaySection?.invoiceInformation && (
                            <Collapse onChange={() => onChange(1)} expandIconPosition="end" expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={activeKey}>
                                <Panel
                                    header={
                                        <div className={styles.alignUser}>
                                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                Invoice Information
                                            </Text>
                                        </div>
                                    }
                                    key={1}
                                >
                                    <DataTable srlTitle={'#'} removePagination={true} tableColumn={tableColumnInvoice()} tableData={invoiceData?.invoiceDetails} />
                                </Panel>
                            </Collapse>
                        )}

                        {displaySection?.deliveryInformation && (
                            <Collapse onChange={() => onChange(2)} expandIconPosition="end" expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={activeKey}>
                                <Panel
                                    header={
                                        <div className={styles.alignUser}>
                                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                Delivery Information
                                            </Text>
                                        </div>
                                    }
                                    key={2}
                                >
                                    <DataTable srlTitle={'#'} removePagination={true} tableColumn={tableColumnDelivery()} tableData={invoiceData?.deliveryDetails} />
                                </Panel>
                            </Collapse>
                        )}
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <OTFFormButton {...props} />
                </Col>
            </Row>
        </>
    );
};

export const InvoiceDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(InvoiceDetailsMasterBase);
