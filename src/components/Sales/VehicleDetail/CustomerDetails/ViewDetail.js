/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Space, Collapse, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import styles from 'components/common/Common.module.css';
import { expandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;
    const [activeKey, setactiveKey] = useState([]);
    const { billingCustomerResponse, ownerCustomerResponse, vehicleCustomerLoyaltyDetailsResponse, vehicleKeyAccountDetailsResponse } = formData;
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

    return (
        <div className={styles.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" className={styles.collapseContainer}>
                            <Panel header="Owner Customer" key="1">
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(ownerCustomerResponse?.customerId, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(ownerCustomerResponse?.mobileNumber, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Salutation">{checkAndSetDefaultValue(ownerCustomerResponse?.saluation, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(ownerCustomerResponse?.customerName, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Address">{checkAndSetDefaultValue(ownerCustomerResponse?.address, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="City/District">{checkAndSetDefaultValue(ownerCustomerResponse?.city, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="State">{checkAndSetDefaultValue(ownerCustomerResponse?.state, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Pin Code">{checkAndSetDefaultValue(ownerCustomerResponse?.pincode, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Email">{checkAndSetDefaultValue(ownerCustomerResponse?.email, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="GSTIN">{checkAndSetDefaultValue(ownerCustomerResponse?.gstin, isLoading)}</Descriptions.Item>
                                </Descriptions>
                            </Panel>
                        </Collapse>
                        <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" className={styles.collapseContainer}>
                            <Panel header="Billing Customer Details" key="2">
                                {/* <Checkbox>Same as Booking Customer</Checkbox> */}
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(billingCustomerResponse?.customerId, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(billingCustomerResponse?.mobileNumber, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Salutation">{checkAndSetDefaultValue(billingCustomerResponse?.saluation, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(billingCustomerResponse?.customerName, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Address">{checkAndSetDefaultValue(billingCustomerResponse?.address, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="City/District">{checkAndSetDefaultValue(billingCustomerResponse?.city, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="State">{checkAndSetDefaultValue(billingCustomerResponse?.state, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Pin Code">{checkAndSetDefaultValue(billingCustomerResponse?.pincode, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Email">{checkAndSetDefaultValue(billingCustomerResponse?.email, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="GSTIN">{checkAndSetDefaultValue(billingCustomerResponse?.gstin, isLoading)}</Descriptions.Item>
                                </Descriptions>
                            </Panel>
                        </Collapse>
                        <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end" className={styles.collapseContainer}>
                            <Panel header="Key Account Details" key="3">
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label="Key Account Code">{checkAndSetDefaultValue(vehicleKeyAccountDetailsResponse?.keyAccountCode, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="key Account Name">{checkAndSetDefaultValue(vehicleKeyAccountDetailsResponse?.keyAccountName, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Account Segement">{checkAndSetDefaultValue(vehicleKeyAccountDetailsResponse?.accountSegement, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Key Account Client Name">{checkAndSetDefaultValue(vehicleKeyAccountDetailsResponse?.keyAccountClientName, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Key Account Mapping Date">{checkAndSetDefaultValue(vehicleKeyAccountDetailsResponse?.keyAccountMappingDate, isLoading)}</Descriptions.Item>
                                </Descriptions>
                            </Panel>
                        </Collapse>
                        <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(4)} expandIconPosition="end" className={styles.collapseContainer}>
                            <Panel header="Key Account Details" key="4">
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label="Loyality Card Number">{checkAndSetDefaultValue(vehicleCustomerLoyaltyDetailsResponse?.loyalityCardNumber, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Assured Buy Back">{checkAndSetDefaultValue(vehicleCustomerLoyaltyDetailsResponse?.assuredBuyBack, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Status Of Vehicle">{checkAndSetDefaultValue(vehicleCustomerLoyaltyDetailsResponse?.statusOfVehicle, isLoading)}</Descriptions.Item>
                                </Descriptions>
                            </Panel>
                        </Collapse>
                        <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(5)} expandIconPosition="end" className={styles.collapseContainer}>
                            <Panel header="Ownership Change Request" key="5">
                                <Descriptions {...viewProps}>
                                    <div className={styles.viewNoDataFound}>Coming Soon</div>
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
