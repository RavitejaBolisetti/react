import React, { useState } from 'react';

import { Col, Input, Form, Row, Checkbox, Space, Collapse, Typography } from 'antd';

import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import AddEditForm from './AddEditForm';

import { ViewDetail } from './ViewDetail';

import styles from 'components/common/Common.module.css';

const { Text } = Typography;

const { Panel } = Collapse;

export const CustomerDetailsMaster = (props) => {
    const { formActionType, onFinish, onFinishFailed, formData } = props;

    const [bookingCustomer] = Form.useForm();
    const [billingCustomer] = Form.useForm();

    const [activeKey, setactiveKey] = useState([1]);

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 3 },
        styles,
        activeKey,
        setactiveKey,
    };

    const formProps = {
        bookingCustomer,
        billingCustomer,
        activeKey,
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

    return (
        <>
            {!formActionType?.viewMode ? (
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
                                    <AddEditForm {...formProps} />
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
                                    <AddEditForm {...formProps} />
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
