/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Collapse, Descriptions, Card, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';
import { expandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;
    const [activeKey, setactiveKey] = useState([]);
    const { billingCustomer, ownerCustomer, vehicleCustomerLoyaltyDetails, vehicleKeyAccountDetails } = formData;
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
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                        <Panel header="Owner Customer" key="1">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(ownerCustomer?.customerId, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(ownerCustomer?.mobileNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Salutation">{checkAndSetDefaultValue(ownerCustomer?.saluation, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(ownerCustomer?.customerName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Address">{checkAndSetDefaultValue(ownerCustomer?.address, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="City/District">{checkAndSetDefaultValue(ownerCustomer?.city, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="State">{checkAndSetDefaultValue(ownerCustomer?.state, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Pin Code">{checkAndSetDefaultValue(ownerCustomer?.pincode, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Email">{checkAndSetDefaultValue(ownerCustomer?.email, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="GSTIN">{checkAndSetDefaultValue(ownerCustomer?.gstin, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                        <Panel header="Billing Customer Details" key="2">
                            <Divider />
                            {/* <Checkbox>Same as Booking Customer</Checkbox> */}
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(billingCustomer?.customerId, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(billingCustomer?.mobileNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Salutation">{checkAndSetDefaultValue(billingCustomer?.saluation, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(billingCustomer?.customerName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Address">{checkAndSetDefaultValue(billingCustomer?.address, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="City/District">{checkAndSetDefaultValue(billingCustomer?.city, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="State">{checkAndSetDefaultValue(billingCustomer?.state, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Pin Code">{checkAndSetDefaultValue(billingCustomer?.pincode, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Email">{checkAndSetDefaultValue(billingCustomer?.email, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="GSTIN">{checkAndSetDefaultValue(billingCustomer?.gstin, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end">
                        <Panel header="Key Account Details" key="3">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Key Account Code">{checkAndSetDefaultValue(vehicleKeyAccountDetails?.keyAccountCode, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="key Account Name">{checkAndSetDefaultValue(vehicleKeyAccountDetails?.keyAccountName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Account Segement">{checkAndSetDefaultValue(vehicleKeyAccountDetails?.accountSegement, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Key Account Client Name">{checkAndSetDefaultValue(vehicleKeyAccountDetails?.keyAccountClientName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Key Account Mapping Date">{checkAndSetDefaultValue(vehicleKeyAccountDetails?.keyAccountMappingDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(4)} expandIconPosition="end">
                        <Panel header="Loyalty Details" key="4">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Loyalty Card Number">{checkAndSetDefaultValue(vehicleCustomerLoyaltyDetails?.loyalityCardNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Assured Buy Back">{checkAndSetDefaultValue(vehicleCustomerLoyaltyDetails?.assuredBuyBack, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Status Of Vehicle">{checkAndSetDefaultValue(vehicleCustomerLoyaltyDetails?.statusOfVehicle, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(5)} expandIconPosition="end">
                        <Panel header="Ownership Change Request" key="5">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Card>Coming Soon</Card>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
