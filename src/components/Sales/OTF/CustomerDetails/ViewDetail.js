/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Space, Collapse, Typography, Descriptions } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formData } = props;
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
                                <Descriptions.Item label="Customer ID">{formData.bookingCustomer?.customerId}</Descriptions.Item>
                                <Descriptions.Item label="Customer Type">{formData.bookingCustomer?.customerType}</Descriptions.Item>
                                <Descriptions.Item label="Mobile Number">{formData.bookingCustomer?.mobileNumber}</Descriptions.Item>
                                <Descriptions.Item label="Salutation">{formData.bookingCustomer?.saluation}</Descriptions.Item>
                                <Descriptions.Item label="Customer Name">{formData.bookingCustomer?.customerName}</Descriptions.Item>
                                <Descriptions.Item label="Address">{formData.bookingCustomer?.address}</Descriptions.Item>
                                <Descriptions.Item label="City/District">{formData.bookingCustomer?.district}</Descriptions.Item>
                                <Descriptions.Item label="State">{formData.bookingCustomer?.state}</Descriptions.Item>
                                <Descriptions.Item label="Pin Code">{formData.bookingCustomer?.pincode}</Descriptions.Item>
                                <Descriptions.Item label="Alternate Number">{formData.bookingCustomer?.alternateNumber}</Descriptions.Item>
                                <Descriptions.Item label="Email">{formData.bookingCustomer?.email}</Descriptions.Item>
                                <Descriptions.Item label="PAN">{formData.bookingCustomer?.panNo}</Descriptions.Item>
                                <Descriptions.Item label="Aadhar">{formData.bookingCustomer?.aadharNumber}</Descriptions.Item>
                                <Descriptions.Item label="GSTIN">{formData.bookingCustomer?.gstin}</Descriptions.Item>
                                <Descriptions.Item label="Driving License">{formData.bookingCustomer?.drivingLicense}</Descriptions.Item>
                                <Descriptions.Item label="Trade Licence">{formData.bookingCustomer?.tradeLicense}</Descriptions.Item>
                                <Descriptions.Item label="Birth Date">{bookingBirthDate} </Descriptions.Item>
                                {/* <Descriptions.Item label="Do You Want to Add Corporate Details">{formData.bookingCustomer?.sameAsBookingCustomer}</Descriptions.Item> */}
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
                                <Descriptions.Item label="Customer ID">{formData.billingCustomer?.customerId}</Descriptions.Item>
                                <Descriptions.Item label="Customer Type">{formData.billingCustomer?.customerType}</Descriptions.Item>
                                <Descriptions.Item label="Mobile Number">{formData.billingCustomer?.mobileNumber}</Descriptions.Item>
                                <Descriptions.Item label="Salutation">{formData.billingCustomer?.saluation}</Descriptions.Item>
                                <Descriptions.Item label="Customer Name">{formData.billingCustomer?.customerName}</Descriptions.Item>
                                <Descriptions.Item label="Address">{formData.billingCustomer?.address}</Descriptions.Item>
                                <Descriptions.Item label="City/District">{formData.billingCustomer?.district}</Descriptions.Item>
                                <Descriptions.Item label="State">{formData.billingCustomer?.state}</Descriptions.Item>
                                <Descriptions.Item label="Pin Code">{formData.billingCustomer?.pincode}</Descriptions.Item>
                                <Descriptions.Item label="Alternate Number">{formData.billingCustomer?.alternateNumber}</Descriptions.Item>
                                <Descriptions.Item label="Email">{formData.billingCustomer?.email}</Descriptions.Item>
                                <Descriptions.Item label="PAN">{formData.billingCustomer?.panNo}</Descriptions.Item>
                                <Descriptions.Item label="Aadhar">{formData.billingCustomer?.aadharNumber}</Descriptions.Item>
                                <Descriptions.Item label="GSTIN">{formData.billingCustomer?.gstin}</Descriptions.Item>
                                <Descriptions.Item label="Driving License">{formData.billingCustomer?.drivingLicense}</Descriptions.Item>
                                <Descriptions.Item label="Trade Licence">{formData.billingCustomer?.tradeLicense}</Descriptions.Item>
                                <Descriptions.Item label="Birth Date">{billingBirthDate}</Descriptions.Item>
                                {/* <Descriptions.Item label="Do You Want to Add Corporate Details">{formData.billingCustomer?.sameAsBookingCustomer}</Descriptions.Item> */}
                            </Descriptions>
                        </Panel>
                    </Collapse>
                </Space>
            </Col>
        </Row>
    );
};

export const ViewDetail = ViewDetailMain;
