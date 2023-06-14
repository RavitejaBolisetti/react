import React, { useState, useEffect } from 'react';
import { Col, Row, Space, Collapse, Typography, Divider } from 'antd';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import styles from 'components/common/Common.module.css';
import { DataTable } from 'utils/dataTable';
import { ViewInvoiceDetail } from './ViewInvoiceDetail';
const { Text } = Typography;

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onCloseAction, formActionType, setIsViewModeVisible } = props;
    const [activeKey, setactiveKey] = useState([1]);

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };
    useEffect(() => {
        console.log('activeKey', activeKey);
    }, [activeKey]);

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
        optionalData,
        optionalColumns,
        data,
        columns,
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

                                    <DataTable removePagination={true} tableColumn={columns} tableData={data} />
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

                                    <DataTable removePagination={true} tableColumn={optionalColumns} tableData={optionalData} />
                                </Panel>
                            </Collapse>
                        </Space>
                    </Col>
                </Row>
            ) : (
                <ViewInvoiceDetail {...viewProps} />
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
