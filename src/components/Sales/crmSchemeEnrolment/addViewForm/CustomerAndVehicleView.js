/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Collapse, Divider, Tooltip } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;

const CustomerAndVehicleViewMain = (props) => {
    const { isLoading, activeKey, onChange, customerData, vehicleDataDetails } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const modelInfo = (
        <span>
            Color - {vehicleDataDetails?.colour}
            <div>Seating Capacity - {vehicleDataDetails?.seatingCapacity}</div>
            Variant - {vehicleDataDetails?.variants}
        </span>
    );

    return (
        <div className={styles.viewDrawerContainer}>
            <Collapse activeKey={activeKey} onChange={() => onChange(3)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon">
                <Panel header="Customer Details" key="3">
                    <Divider />
                    <Card>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(customerData?.customerId, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(customerData?.customerName)}</Descriptions.Item>
                            <Descriptions.Item label="Address">{checkAndSetDefaultValue(customerData?.customerAddress, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Locality">{checkAndSetDefaultValue(customerData?.locality, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Tehsil">{checkAndSetDefaultValue(customerData?.tehsil, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="District">{checkAndSetDefaultValue(customerData?.district, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="City">{checkAndSetDefaultValue(customerData?.city, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="State">{checkAndSetDefaultValue(customerData?.state, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Pin Code">{checkAndSetDefaultValue(customerData?.pinCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Mobile No.">{checkAndSetDefaultValue(customerData?.mobileNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Email ID">{checkAndSetDefaultValue(customerData?.emailId, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Panel>
            </Collapse>
            <Collapse activeKey={activeKey} onChange={() => onChange(4)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon">
                <Panel header="Vehicle Details" key="4">
                    <Divider />
                    <Card>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Vehicle No.">{checkAndSetDefaultValue(vehicleDataDetails?.vehicleNumber, isLoading)}</Descriptions.Item>
                            {/* <Descriptions.Item label="Model">
                                {checkAndSetDefaultValue(vehicleDataDetails?.model, isLoading)}
                                <Tooltip title={modelInfo} placement="bottom" color="#6495ED" key="#6495ED">
                                    <ExclamationCircleOutlined style={{ color: '#6495ED', margin: '0 0 0 8px' }} />
                                </Tooltip>
                            </Descriptions.Item> */}
                            <Descriptions.Item label="Model Code">{checkAndSetDefaultValue(vehicleDataDetails?.modelCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item />
                            <Descriptions.Item span={3} label="Model Description">
                                {checkAndSetDefaultValue(vehicleDataDetails?.modelDescription, isLoading)}
                                <Tooltip title={modelInfo} placement="bottom" color="#6495ED" key="#6495ED">
                                    <ExclamationCircleOutlined style={{ color: '#6495ED', margin: '0 0 0 8px' }} />
                                </Tooltip>
                            </Descriptions.Item>
                            <Descriptions.Item label="Sale Date">{checkAndSetDefaultValue(vehicleDataDetails?.soldDate || vehicleDataDetails?.saleDate, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Sold By">{checkAndSetDefaultValue(vehicleDataDetails?.soldBy, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Panel>
            </Collapse>
        </div>
    );
};

export const CustomerAndVehicleView = CustomerAndVehicleViewMain;
