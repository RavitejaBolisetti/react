import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Space, Collapse } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { otfInvoiceDetailsDataActions } from 'store/actions/data/otf/invoiceDetails';
import { showGlobalNotification } from 'store/actions/notification';
import { dynamicExpandIcon } from 'utils/accordianExpandIcon';
import { DataTable } from 'utils/dataTable';

import { tableColumnInvoice, tableColumnDelivery } from './tableColumn';

import styles from 'components/common/Common.module.css';

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
            fetchList: otfInvoiceDetailsDataActions.fetchList,
            resetData: otfInvoiceDetailsDataActions.reset,
            listShowLoading: otfInvoiceDetailsDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const InvoiceDetailsMasterBase = (props) => {
    const { invoiceData, fetchList, userId, isDataLoaded, listShowLoading, showGlobalNotification } = props;

    const [activeKey, setactiveKey] = useState([1]);
    const selectedOTP = 'OTF002';

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
            value: selectedOTP,
            name: 'OTF Number',
        },
    ];

    const errorAction = (message) => {
        showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Space size="middle" direction="vertical" className={styles.accordianContainer}>
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
                            <DataTable srlTitle={'#'} removePagination={true} tableColumn={tableColumnInvoice()} tableData={invoiceData && invoiceData[0]?.invoiceDetails} />
                        </Panel>
                    </Collapse>
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
                            <DataTable srlTitle={'#'} removePagination={true} tableColumn={tableColumnDelivery()} tableData={invoiceData && invoiceData[0]?.deliveryDetails} />
                        </Panel>
                    </Collapse>
                </Space>
            </Col>
        </Row>
    );
};

export const InvoiceDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(InvoiceDetailsMasterBase);
