/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Collapse, Descriptions, Divider } from 'antd';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { DATA_TYPE } from 'constants/dataType';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;
    const [activeKey, setactiveKey] = useState([]);

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

    const bookingBirthDate = formData?.bookingCustomer?.birthDate;
    const billingBirthDate = formData?.billingCustomer?.birthDate;

    return (
        <div className={styles.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                        <Panel header="Booking Customer" key="1">
                            <Divider />
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
                                <Descriptions.Item label="Aadhar">{checkAndSetDefaultValue(formData.billingCustomer?.aadharNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="GSTIN">{checkAndSetDefaultValue(formData.bookingCustomer?.gstin, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Driving License">{checkAndSetDefaultValue(formData.bookingCustomer?.drivingLicense, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Trade Licence">{checkAndSetDefaultValue(formData.billingCustomer?.tradeLicense, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Birth Date">{checkAndSetDefaultValue(bookingBirthDate, isLoading, DATA_TYPE?.DATE?.key)} </Descriptions.Item>
                                {/* <Descriptions.Item label="Do You Want to Add Corporate Details">{checkAndSetDefaultValue(formData.bookingCustomer?.sameAsBookingCustomer, isLoading)}</Descriptions.Item> */}
                            </Descriptions>
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                        <Panel header="Billing Customer" key="2">
                            <Divider />
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
                                <Descriptions.Item label="Birth Date">{checkAndSetDefaultValue(billingBirthDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                {/* <Descriptions.Item label="Do You Want to Add Corporate Details">{checkAndSetDefaultValue(formData.billingCustomer?.sameAsBookingCustomer, isLoading)}</Descriptions.Item> */}
                            </Descriptions>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
