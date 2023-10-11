/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Collapse, Form, Divider } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { otfInvoiceDetailDataActions } from 'store/actions/data/otf/invoiceDetail';
import { showGlobalNotification } from 'store/actions/notification';
import { expandIcon } from 'utils/accordianExpandIcon';

import { DataTable } from 'utils/dataTable';
import { OTFStatusBar } from '../utils/OTFStatusBar';
import { OTFFormButton } from '../OTFFormButton';

import { tableColumnInvoice, tableColumnDelivery } from './tableColumn';
import { OTF_STATUS } from 'constants/OTFStatus';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
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
    const { form, invoiceData, fetchList, userId, typeData, listShowLoading, handleButtonClick, NEXT_ACTION } = props;
    const { section, selectedRecordId, selectedOrder: { orderStatus = false } = {} } = props;

    const [activeKey, setactiveKey] = useState([1]);

    const onChange = (values) => {
        if (activeKey?.includes(values)) {
            setactiveKey([]);
            return;
        }
        setactiveKey([]);
        setactiveKey([values]);
    };

    const errorAction = (message) => {
        // showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    useEffect(() => {
        if (selectedRecordId && userId) {
            const extraParams = [
                {
                    key: 'otfId',
                    value: selectedRecordId,
                },
            ];

            fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRecordId, userId]);

    const myProps = {
        ...props,
        buttonData: { ...props.buttonData, editBtn: false, nextBtn: true, saveBtn: false },
    };

    const onFinish = (values) => {
        handleButtonClick({ record: undefined, buttonAction: NEXT_ACTION });
    };
    const onFinishFailed = () => {};

    const displaySection = {
        invoiceInformation: orderStatus === OTF_STATUS?.INVOICED.key || orderStatus === OTF_STATUS?.DELIVERED.key,
        deliveryInformation: orderStatus === OTF_STATUS?.DELIVERED.key,
    };
    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                    {displaySection?.invoiceInformation && (
                        <Collapse onChange={() => onChange(1)} expandIconPosition="end" expandIcon={expandIcon} activeKey={activeKey} collapsible="icon">
                            <Panel header="Invoice Information" key={1}>
                                <Divider />
                                <DataTable srlTitle={'#'} pagination={false} tableColumn={tableColumnInvoice(typeData)} tableData={invoiceData?.invoiceDetails} />
                            </Panel>
                        </Collapse>
                    )}

                    {displaySection?.deliveryInformation && (
                        <Collapse onChange={() => onChange(2)} expandIconPosition="end" expandIcon={expandIcon} activeKey={activeKey} collapsible="icon">
                            <Panel header="Delivery Information" key={2}>
                                <Divider />
                                <DataTable srlTitle={'#'} pagination={false} tableColumn={tableColumnDelivery()} tableData={invoiceData?.deliveryDetails} />
                            </Panel>
                        </Collapse>
                    )}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <OTFFormButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const InvoiceDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(InvoiceDetailsMasterBase);
