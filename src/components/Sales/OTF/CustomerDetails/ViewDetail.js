/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Space, Collapse, Typography, Descriptions } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;
    const [activeKey, setactiveKey] = useState([1]);

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
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

    const bookingBirthDate = dayjs(formData.bookingCustomer?.birthDate).format('DD/MM/YYYY');
    const billingBirthDate = dayjs(formData.billingCustomer?.birthDate).format('DD/MM/YYYY');

    return (
        <div className={styles.drawerBodyRight}>
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
                            className={styles.collapseContainer}
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
                                    <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(formData.bookingCustomer?.customerId, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Customer Type">{checkAndSetDefaultValue(formData.bookingCustomer?.customerType, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData.bookingCustomer?.mobileNumber, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Salutation">{checkAndSetDefaultValue(formData.bookingCustomer?.saluation, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(formData.bookingCustomer?.customerName, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Address">{checkAndSetDefaultValue(formData.bookingCustomer?.address, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="City/District">{checkAndSetDefaultValue(formData.bookingCustomer?.district, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="State">{checkAndSetDefaultValue(formData.bookingCustomer?.state, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Pin Code">{checkAndSetDefaultValue(formData.bookingCustomer?.pincode, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Alternate Number">{checkAndSetDefaultValue(formData.bookingCustomer?.alternateNumber, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Email">{checkAndSetDefaultValue(formData.bookingCustomer?.email, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="PAN">{checkAndSetDefaultValue(formData.bookingCustomer?.panNo, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Aadhar">{checkAndSetDefaultValue(formData.bookingCustomer?.aadharNumber, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="GSTIN">{checkAndSetDefaultValue(formData.bookingCustomer?.gstin, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Driving License">{checkAndSetDefaultValue(formData.bookingCustomer?.drivingLicense, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Trade Licence">{checkAndSetDefaultValue(formData.bookingCustomer?.tradeLicense, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Birth Date">{checkAndSetDefaultValue(bookingBirthDate)} </Descriptions.Item>
                                    {/* <Descriptions.Item label="Do You Want to Add Corporate Details">{checkAndSetDefaultValue(formData.bookingCustomer?.sameAsBookingCustomer, isLoading)}</Descriptions.Item> */}
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
                            className={styles.collapseContainer}
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
                                {/* <Checkbox>Same as Booking Customer</Checkbox> */}
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(formData.billingCustomer?.customerId, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Customer Type">{checkAndSetDefaultValue(formData.billingCustomer?.customerType, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData.billingCustomer?.mobileNumber, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Salutation">{checkAndSetDefaultValue(formData.billingCustomer?.saluation, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(formData.billingCustomer?.customerName, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Address">{checkAndSetDefaultValue(formData.billingCustomer?.address, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="City/District">{checkAndSetDefaultValue(formData.billingCustomer?.district, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="State">{checkAndSetDefaultValue(formData.billingCustomer?.state, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Pin Code">{checkAndSetDefaultValue(formData.billingCustomer?.pincode, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Alternate Number">{checkAndSetDefaultValue(formData.billingCustomer?.alternateNumber, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Email">{checkAndSetDefaultValue(formData.billingCustomer?.email, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="PAN">{checkAndSetDefaultValue(formData.billingCustomer?.panNo, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Aadhar">{checkAndSetDefaultValue(formData.billingCustomer?.aadharNumber, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="GSTIN">{checkAndSetDefaultValue(formData.billingCustomer?.gstin, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Driving License">{checkAndSetDefaultValue(formData.billingCustomer?.drivingLicense, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Trade Licence">{checkAndSetDefaultValue(formData.billingCustomer?.tradeLicense, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Birth Date">{checkAndSetDefaultValue(billingBirthDate, isLoading)}</Descriptions.Item>
                                    {/* <Descriptions.Item label="Do You Want to Add Corporate Details">{checkAndSetDefaultValue(formData.billingCustomer?.sameAsBookingCustomer, isLoading)}</Descriptions.Item> */}
                                </Descriptions>
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
