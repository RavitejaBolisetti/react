import React from 'react';
import { Col, Row, Space, Collapse, Typography, Divider } from 'antd';
import styles from 'components/common/Common.module.css';
import { DataTable } from 'utils/dataTable';
const { Text } = Typography;

const { Panel } = Collapse;

const ViewInvoiceDetailMain = (props) => {
    const { activeKey, setactiveKey, optionalData, dynamicExpandIcon, optionalColumns, data, columns } = props;

    const onChange = (values) => {
        if (activeKey?.includes(values)) {
            setactiveKey([]);
            return;
        }
        setactiveKey([]);
        setactiveKey([values]);
    };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Space size="middle" direction="vertical" className={styles.accordianContainer}>
                    <Collapse onChange={() => onChange(1)} expandIconPosition="end" expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={activeKey}>
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

                            <DataTable srlTitle={'#'} removePagination={true} tableColumn={columns} tableData={data} />
                        </Panel>
                    </Collapse>
                    <Collapse onChange={() => onChange(2)} expandIconPosition="end" expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={activeKey}>
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

                            <DataTable srlTitle={'#'} removePagination={true} tableColumn={optionalColumns} tableData={optionalData} />
                        </Panel>
                    </Collapse>
                </Space>
            </Col>
        </Row>
    );
};

export const ViewInvoiceDetail = ViewInvoiceDetailMain;
