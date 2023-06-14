import React from 'react';
import { Col, Form, Row, Space, Collapse, Typography, Divider } from 'antd';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import styles from 'components/common/Common.module.css';
import { ViewDetail } from '../../OTF/ViewDetail';
import { DataTable } from 'utils/dataTable';
const { Text } = Typography;

const { Panel } = Collapse;

const ViewInvoiceDetailMain = (props) => {
    const { onCloseAction, activeKey, setactiveKey, formActionType, setIsViewModeVisible } = props;

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };

    const onChange = (values) => {
        if (activeKey?.includes(values)) {
            setactiveKey([]);
            return;
        }
        setactiveKey([]);
        setactiveKey([values]);
    };
    const columns = [
        {
            title: 'Invoice Number',
            dataIndex: 'innum',
            key: 'innum',
        },
        {
            title: 'Invoice Date ',
            dataIndex: 'indate',
            key: 'indate',
        },
        {
            title: 'Invoice Status ',
            dataIndex: 'instatus',
            key: 'instatus',
        },
    ];

    const data = [
        {
            key: '1',
            innum: 'INV-21-12-009',
            indate: '02 June 2023',
            instatus: 'Generated',
        },
        {
            key: '2',
            innum: 'INV-21-12-009',
            indate: '02 June 2023',
            instatus: 'Generated',
        },
        {
            key: '3',
            innum: 'INV-21-12-009',
            indate: '02 June 2023',
            instatus: 'Generated',
        },
    ];

    const optionalColumns = [
        {
            title: 'Delivery Note Number',
            dataIndex: 'dlnum',
            key: 'dlnum',
        },

        {
            title: 'Delivery Note Date ',
            dataIndex: 'dldate',
            key: 'dldate',
        },

        {
            title: 'Delivery Note Status ',
            dataIndex: 'dlstatus',
            key: 'dlstatus',
        },
    ];

    const optionalData = [
        {
            key: '1',
            dlnum: '81162112',
            dldate: '11 June 2023',
            dlstatus: 'Pending',
        },
        {
            key: '2',
            dlnum: '81162112',
            dldate: '11 June 2023',
            dlstatus: 'Approved',
        },
        {
            key: '3',
            dlnum: '81162112',
            dldate: '11 June 2023',
            dlstatus: '50,0000',
        },
    ];
    const viewProps = {
        activeKey,
        setactiveKey,
        onChange,
        styles,
        onCloseAction,
        handleEdit,
    };

    return (
        <>
            {!formActionType?.viewMode ? (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space size="middle" direction="vertical" className={styles.accordianContainer}>
                            <Collapse onChange={() => onChange(1)} expandIconPosition="end" expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={activeKey}>
                                <Panel
                                    header={
                                        <div className={styles.alignUser}>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                    Invoice Information
                                                </Text>
                                            </Col>
                                        </div>
                                    }
                                    key="1"
                                >
                                    <Divider />

                                    <Form autoComplete="off" layout="vertical">
                                        <DataTable removePagination={true} tableColumn={columns} tableData={data} pagination={false} />
                                    </Form>
                                </Panel>
                            </Collapse>
                            <Collapse onChange={() => onChange(2)} expandIconPosition="end" expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={activeKey}>
                                <Panel
                                    header={
                                        <div className={styles.alignUser}>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                    Delivery Information
                                                </Text>
                                            </Col>
                                        </div>
                                    }
                                    key="2"
                                >
                                    <Divider />

                                    <Form autoComplete="off" layout="vertical">
                                        <DataTable removePagination={true} tableColumn={optionalColumns} tableData={optionalData} pagination={false} />
                                    </Form>
                                </Panel>
                            </Collapse>
                        </Space>
                    </Col>
                </Row>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};

export const ViewInvoiceDetail = ViewInvoiceDetailMain;
