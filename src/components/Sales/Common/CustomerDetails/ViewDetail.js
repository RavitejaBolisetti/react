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
import { getCodeValue } from 'utils/getCodeValue';

const { Panel } = Collapse;
const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData, showAgeGroup = true } = props;
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

    const customerDetail = (customerData) => (
        <Descriptions {...viewProps}>
            <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(customerData?.mobileNumber, isLoading)}</Descriptions.Item>
            <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(customerData?.customerId, isLoading)}</Descriptions.Item>
            <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(customerData?.customerName, isLoading)}</Descriptions.Item>
            <Descriptions.Item label="Email">{checkAndSetDefaultValue(customerData?.email, isLoading)}</Descriptions.Item>
            <Descriptions.Item label="Gender">{checkAndSetDefaultValue(getCodeValue(typeData?.GENDER, customerData?.gender), isLoading)}</Descriptions.Item>
            {showAgeGroup && <Descriptions.Item label="Age Group">{checkAndSetDefaultValue(getCodeValue(typeData?.AGE_RANGE, customerData?.ageGroup), isLoading)}</Descriptions.Item>}
            <Descriptions.Item label="Address">{checkAndSetDefaultValue(customerData?.address, isLoading)}</Descriptions.Item>
            <Descriptions.Item label="City/District">{checkAndSetDefaultValue(customerData?.district, isLoading)}</Descriptions.Item>
            <Descriptions.Item label="State">{checkAndSetDefaultValue(customerData?.state, isLoading)}</Descriptions.Item>
            <Descriptions.Item label="Pin Code">{checkAndSetDefaultValue(customerData?.pincode, isLoading)}</Descriptions.Item>
            <Descriptions.Item label="Alternate Number">{checkAndSetDefaultValue(customerData?.alternateNumber, isLoading)}</Descriptions.Item>
            <Descriptions.Item label="PAN">{checkAndSetDefaultValue(customerData?.panNo, isLoading)}</Descriptions.Item>
            <Descriptions.Item label="GSTIN">{checkAndSetDefaultValue(customerData?.gstin, isLoading)}</Descriptions.Item>
            <Descriptions.Item label="Birth Date">{checkAndSetDefaultValue(customerData?.birthDate, isLoading, DATA_TYPE?.DATE?.key)} </Descriptions.Item>
            {/* <Descriptions.Item label="Customer Type">{checkAndSetDefaultValue(customerData?.customerType, isLoading)}</Descriptions.Item> */}
            {/* <Descriptions.Item label="Salutation">{checkAndSetDefaultValue(customerData?.saluation, isLoading)}</Descriptions.Item> */}
            {/* <Descriptions.Item label="Aadhar">{checkAndSetDefaultValue(formData.billingCustomer?.aadharNumber, isLoading)}</Descriptions.Item> */}
            {/* <Descriptions.Item label="Driving License">{checkAndSetDefaultValue(customerData?.drivingLicense, isLoading)}</Descriptions.Item> */}
            {/* <Descriptions.Item label="Trade Licence">{checkAndSetDefaultValue(formData.billingCustomer?.tradeLicense, isLoading)}</Descriptions.Item> */}
            {/* <Descriptions.Item label="Do You Want to Add Corporate Details">{checkAndSetDefaultValue(customerData?.sameAsBookingCustomer, isLoading)}</Descriptions.Item> */}
        </Descriptions>
    );
    return (
        <div className={styles.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                        <Panel header="Booking Customer" key="1">
                            <Divider />
                            {customerDetail(formData?.bookingCustomer)}
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                        <Panel header="Billing Customer" key="2">
                            <Divider />
                            {/* <Checkbox>Same as Booking Customer</Checkbox> */}
                            {customerDetail(formData?.billingCustomer)}
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
