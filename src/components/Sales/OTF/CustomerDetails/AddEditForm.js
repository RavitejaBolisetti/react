import React, { useState } from 'react';

import { Col, Input, Form, Row, Checkbox, Select, Button, InputNumber, DatePicker, Space, Card, Collapse, Typography, Descriptions } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import styles from 'components/common/Common.module.css';

const { Text, Link } = Typography;

const { Panel } = Collapse;

function AddEditForm() {
    const [activeKey, setactiveKey] = useState([1]);

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 3 },
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.filter((item) => {
                if (item != values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
        console.log('values', values);
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Collapse
                            expandIcon={() => {
                                if (activeKey.includes(1)) {
                                    return <MinusOutlined className={styles.iconsColor} />;
                                } else {
                                    return <PlusOutlined className={styles.iconsColor} />;
                                }
                            }}
                            activeKey={activeKey}
                            onChange={() => onChange(1)}
                            expandIconPosition="end"
                        >
                            <Panel
                                header={
                                    <div className={styles.alignUser}>
                                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                            Booking Customer
                                        </Text>
                                    </div>
                                }
                                key="1"
                            >
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label="Customer ID">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Customer Type">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Mobile Number">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Salutation">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Customer Name">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Address">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="City/District">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="State">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Pin Code">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Alternate Number">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Email">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="PAN">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Aadhar">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="GSTIN">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Driving License">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Trade Licence">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Birth Date">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Do You Want to Add Corporate Details">{'hello'}</Descriptions.Item>
                                </Descriptions>
                            </Panel>
                        </Collapse>
                        <Collapse
                            expandIcon={() => {
                                if (activeKey.includes(2)) {
                                    return <MinusOutlined className={styles.iconsColor} />;
                                } else {
                                    return <PlusOutlined className={styles.iconsColor} />;
                                }
                            }}
                            activeKey={activeKey}
                            onChange={() => onChange(2)}
                            expandIconPosition="end"
                        >
                            <Panel
                                header={
                                    <div className={styles.alignUser}>
                                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                            Billing Customer
                                        </Text>
                                    </div>
                                }
                                key="2"
                            >
                                <Checkbox>Same as Booking Customer</Checkbox>
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label="Customer ID">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Customer Type">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Mobile Number">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Salutation">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Customer Name">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Address">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="City/District">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="State">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Pin Code">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Alternate Number">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Email">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="PAN">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Aadhar">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="GSTIN">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Driving License">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Trade Licence">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Birth Date">{'hello'}</Descriptions.Item>
                                    <Descriptions.Item label="Do You Want to Add Corporate Details">{'hello'}</Descriptions.Item>
                                </Descriptions>
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
        </>
    );
}

export default AddEditForm;
