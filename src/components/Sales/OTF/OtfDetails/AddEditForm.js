import React, { useState } from 'react';

import { Col, Input, Form, Row, Checkbox, Select, Button, InputNumber, DatePicker, Space, Card, Collapse, Typography, Descriptions } from 'antd';

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
    };

    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>OTF Details</h2>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Card>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Initial Promise Delivery Date">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Cust. Expected Delivery Date">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Sale Type">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Price Type Booking Amount">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Sales Consultant">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Special Request">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Place Of Registration">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Finance Agreed">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Delivery At">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Referral">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Influencer/Mitra Type">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Influencer/Mitra Name">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Mode Of Payment">{'hello'}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default AddEditForm;
