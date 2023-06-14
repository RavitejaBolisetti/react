import React, { useState } from 'react';
import { Col, Form, Row, Space, Collapse, Typography, Divider } from 'antd';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import styles from 'components/common/Common.module.css';
import { DataTable } from 'utils/dataTable';
import { ViewInvoiceDetail } from './ViewInvoiceDetail';
const { Text } = Typography;

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onCloseAction, formActionType, setIsViewModeVisible } = props;
    const [openAccordian, setOpenAccordian] = useState();
    const [activeKey, setactiveKey] = useState([1]);

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };
    const columns = [
        {
            title: 'Srl',
            dataIndex: 'srl',
            key: 'srl',
        },
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
            innum: 'CGST @18%',
            indate: '18%',
            instatus: '80,0000',
        },
        {
            key: '2',
            innum: 'CGST @18%',
            indate: '18%',
            instatus: '80,0000',
        },
        {
            key: '3',
            innum: 'CGST @18%',
            indate: '18%',
            instatus: '80,0000',
        },
    ];

    const optionalColumns = [
        {
            title: 'Srl',
            dataIndex: 'srl',
            key: 'srl',
        },
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
            dlnum: 'Registration Charges',
            dldate: '12%',
            dlstatus: '80,0000',
        },
        {
            key: '2',
            dlnum: 'Registration Charges',
            dldate: '18%',
            dlstatus: '80,0000',
        },
        {
            key: '3',
            dlnum: 'Registration Charges',
            dldate: '12%',
            dlstatus: '80,0000',
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
                            <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={activeKey}>
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
                            <Collapse onChange={() => handleCollapse(2)} expandIconPosition="end" expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={activeKey}>
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
                <ViewInvoiceDetail {...viewProps} />
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
