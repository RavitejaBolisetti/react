import React from 'react';

import { Table, Form, Row, Col, Button, Input, Collapse } from 'antd';
import { FaSave } from 'react-icons/fa';
import { validateRequiredInputField } from 'utils/validation';

import styles from '../Common.module.css';
import AddEditForm from './AddEditForm';

const { Panel } = Collapse;

export const ProductMaster = () => {
    const [form] = Form.useForm();

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    };

    const rendFn = (key) => {
        return (
            <Form form={form}>
                <Form.Item name={key} rules={[validateRequiredInputField('Enter data')]}>
                    <Input placeholder={key} />
                </Form.Item>
            </Form>
        );
    };

    const tblPrepareColumns = ({ title, dataIndex }) => {
        return {
            title,
            dataIndex,
        };
    };

    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'Srl',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Attribute Name',
            dataIndex: 'AttributeName',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Attribute Value',
            dataIndex: 'AttributeValue',
        })
    );

    const dataSource = [
        {
            Srl: '1',
            AttributeName: 'Sample',
            AttributeValue: rendFn('Sample'),
        },
        {
            Srl: '2',
            AttributeName: 'Sample',
            AttributeValue: rendFn('Sample2'),
        },
        {
            Srl: '3',
            AttributeName: 'Sample',
            AttributeValue: rendFn('Sample3'),
        },
        {
            Srl: '4',
            AttributeName: 'Sample',
            AttributeValue: rendFn('Sample4'),
        },
    ];

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                        <Panel header="Product Details" key="1">
                            <AddEditForm showAttributeDetail={true} />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <Row gutter={20} style={{ marginTop: '20px' }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                        <Panel header="Product Attributes Details (Mahindra Scorpio Classic Petrol)" key="2">
                            <Table style={{ fontSize: '40px' }} columns={tableColumn} dataSource={dataSource} onChange={onChange} pagination={false} />
                            <Form>
                                <Form.Item>
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <div className={styles.buttonContainer}>
                                                <Button danger>
                                                    <FaSave className={styles.buttonIcon} />
                                                    Save
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </>
    );
};
