/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, Select, DatePicker, Card, Collapse, Divider, Space, Typography, Tooltip } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { InfoCircleOutlined } from '@ant-design/icons';

import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, typeData } = props;

    const [activeKey, setactiveKey] = useState([1]);

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
        <div className={styles.accessInfo}>
            <Collapse defaultActiveKey={['1']} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                <Panel
                    header={
                        <Space direction="vertical">
                            <Space>
                                <Text className={styles.headText}> Model: Scorpio </Text>
                                <Text className={styles.headText}> {`|`}</Text>
                                <Text className={styles.headText}> VIN: 234254543453</Text>
                            </Space>
                            <Text className={styles.subSection}> Vehicle Status: Received</Text>
                        </Space>
                    }
                    key="1"
                >
                    {/* <AccessoriesInformationCard formData={element} /> */}
                    {/* </Panel> */}
                    {/* <Panel header="Model: Scorpio | VIN: 234254543453" key="1"> */}
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.infoWrapper}>
                            <Form.Item label="Model Description" name="initialPromiseDeliveryDate">
                                <Input
                                    maxLength={10}
                                    suffix={
                                        <Tooltip title="Extra information">
                                            <InfoCircleOutlined
                                                style={{
                                                    color: 'rgba(0,0,0,.45)',
                                                }}
                                            />
                                        </Tooltip>
                                    }
                                    placeholder={preparePlaceholderText('Model Description')}
                                    disabled={true}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="VIN" name="custExpectedDeliveryDate">
                                <Input maxLength={10} placeholder={preparePlaceholderText('VIN')} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.saleType} name="saleType" label="Key Number">
                                <Input maxLength={10} placeholder={preparePlaceholderText('Key Number')} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="MFG Date" name="priceType">
                                <DatePicker disabled={true} style={{ display: 'auto', width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="saleConsultant" label="Received On">
                                <DatePicker disabled={true} format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.bookingAmount} label="Vehicle Cost" name="bookingAmount">
                                <Input maxLength={10} placeholder={preparePlaceholderText('Vehicle Cost')} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.specialRequest} label="Demo Vehicle" name="specialRequest">
                                <Select placeholder="Select" showSearch allowClear options={typeData['SALE_TYP']} fieldNames={{ label: 'value', value: 'key' }} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.placeOfRegistration} label="Vehicle Status" name="placeOfRegistration">
                                <Select placeholder="Select" showSearch allowClear options={typeData['SALE_TYP']} fieldNames={{ label: 'value', value: 'key' }} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.deliveryAt} label="Physical Status" name="deliveryAt">
                                <Select placeholder="Select" showSearch allowClear options={typeData['SALE_TYP']} fieldNames={{ label: 'value', value: 'key' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.referral} label="Shortage" name="referral">
                                <Select placeholder="Select" showSearch allowClear options={typeData['SALE_TYP']} fieldNames={{ label: 'value', value: 'key' }} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.mitraType} name="mitraType" label="Vehicle Receipt Checklist No.">
                                <Input maxLength={10} placeholder={preparePlaceholderText('Vehicle Receipt Checklist No.')} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        </div>
    );
};

export const AddEditForm = AddEditFormMain;
