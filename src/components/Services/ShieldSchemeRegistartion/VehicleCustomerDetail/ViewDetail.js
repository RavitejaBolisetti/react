/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Collapse, Descriptions, Divider } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { convertDateMonthYear } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

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

    return (
        <div className={styles.viewDrawerContainer}>
            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" collapsible="icon">
                <Panel header="Vehicle Details" key="1">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="VIN No.">{checkAndSetDefaultValue(formData?.vehicleDetails?.vin, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Vehicle Registration No.">{checkAndSetDefaultValue(formData?.vehicleDetails?.vehicleRegistrationNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Original Warranty Start Date">{checkAndSetDefaultValue(convertDateMonthYear(formData?.vehicleDetails?.orgWarrantyStartDate), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(formData?.vehicleDetails?.modelGroup, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Model Family">{checkAndSetDefaultValue(formData?.vehicleDetails?.modelFamily, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Model Description">{checkAndSetDefaultValue(formData?.vehicleDetails?.modelDescription, isLoading)}</Descriptions.Item>
                    </Descriptions>
                </Panel>
            </Collapse>
            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" collapsible="icon">
                <Panel header="Customer Details" key="2">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(formData?.customerDetails?.customerId, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(formData?.customerDetails?.customerName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Address">{checkAndSetDefaultValue(formData?.customerDetails?.address, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="State">{checkAndSetDefaultValue(formData?.customerDetails?.state, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="District">{checkAndSetDefaultValue(formData?.customerDetails?.district, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Tehsil">{checkAndSetDefaultValue(formData?.customerDetails?.tehsil, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="City">{checkAndSetDefaultValue(formData?.customerDetails?.city, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Locality">{checkAndSetDefaultValue(formData?.customerDetails?.locality, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Pincode">{checkAndSetDefaultValue(formData?.customerDetails?.pinCode, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData?.customerDetails?.mobileNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="GSTIN">{checkAndSetDefaultValue(formData?.customerDetails?.gstIn, isLoading)}</Descriptions.Item>
                    </Descriptions>
                </Panel>
            </Collapse>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
