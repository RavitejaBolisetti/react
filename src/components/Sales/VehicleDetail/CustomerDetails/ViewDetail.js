/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Collapse, Descriptions, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;
    const [activeKey, setactiveKey] = useState([]);
    const { billingCustomer, ownerCustomer } = formData;
    //const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
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
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" collapsible="icon">
                        <Panel header={translateContent('vehicleDetail.vehicledetails.label.ownerDetails')} key="1">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.customerId')}>{checkAndSetDefaultValue(ownerCustomer?.customerId, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.mobileNumber')}>{checkAndSetDefaultValue(ownerCustomer?.mobileNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.salutation')}>{checkAndSetDefaultValue(ownerCustomer?.saluation, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.customerName')}>{checkAndSetDefaultValue(ownerCustomer?.customerName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.address')}>{checkAndSetDefaultValue(ownerCustomer?.address, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.cityPincode')}>{checkAndSetDefaultValue(ownerCustomer?.city, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.state')}>{checkAndSetDefaultValue(ownerCustomer?.state, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.pincode')}>{checkAndSetDefaultValue(ownerCustomer?.pincode, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.email')}>{checkAndSetDefaultValue(ownerCustomer?.email, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.gstin')}>{checkAndSetDefaultValue(ownerCustomer?.gstin, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" collapsible="icon">
                        <Panel header={translateContent('vehicleDetail.customerDetails.heading.billingDetails')} key="2">
                            <Divider />
                            {/* <Checkbox>Same as Booking Customer</Checkbox> */}
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.customerId')}>{checkAndSetDefaultValue(billingCustomer?.customerId, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.mobileNumber')}>{checkAndSetDefaultValue(billingCustomer?.mobileNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.salutation')}>{checkAndSetDefaultValue(billingCustomer?.saluation, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.customerName')}>{checkAndSetDefaultValue(billingCustomer?.customerName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.address')}>{checkAndSetDefaultValue(billingCustomer?.address, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.cityDistrict')}>{checkAndSetDefaultValue(billingCustomer?.city, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.state')}>{checkAndSetDefaultValue(billingCustomer?.state, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.pincode')}>{checkAndSetDefaultValue(billingCustomer?.pincode, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.email')}>{checkAndSetDefaultValue(billingCustomer?.email, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.customerDetails.label.gstin')}>{checkAndSetDefaultValue(billingCustomer?.gstin, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                    {/* <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end" collapsible="icon">
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
                    </Collapse> */}
                    {/* <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(4)} expandIconPosition="end" collapsible="icon">
                        <Panel header="Loyalty Details" key="4">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Loyalty Card Number">{checkAndSetDefaultValue(vehicleCustomerLoyaltyDetails?.loyalityCardNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Assured Buy Back">{checkAndSetDefaultValue(vehicleCustomerLoyaltyDetails?.assuredBuyBack, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Status Of Vehicle">{checkAndSetDefaultValue(vehicleCustomerLoyaltyDetails?.statusOfVehicle, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse> */}
                    {/* <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(5)} expandIconPosition="end" collapsible="icon">
                        <Panel header="Ownership Change Request" key="5">
                            <Divider />
                            <NoDataFound informtion={noDataTitle} />
                        </Panel>
                    </Collapse> */}
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
