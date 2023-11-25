/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Collapse, Descriptions, Divider } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { getCodeValue } from 'utils/getCodeValue';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, modelFamilyData, ProductHierarchyData, isLoading } = props;
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
                <Panel header={translateContent('shieldSchemeRegistration.heading.vehicleDetails')} key="1">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.vin')}>{checkAndSetDefaultValue(formData?.vehicleDetails?.vin, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.vehicleRegistrationNo')}>{checkAndSetDefaultValue(formData?.vehicleDetails?.vehicleRegistrationNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.orgWarrantyStartDate')}>{checkAndSetDefaultValue(convertDateMonthYear(formData?.vehicleDetails?.orgWarrantyStartDate), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.modelGroup')}>{checkAndSetDefaultValue(getCodeValue(ProductHierarchyData, formData?.vehicleDetails?.modelGroup, 'modelGroupDescription', false, 'modelGroupCode'), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.modelFamily')}>{checkAndSetDefaultValue(getCodeValue(modelFamilyData, formData?.vehicleDetails?.modelFamily, 'familyDescription', false, 'familyCode'), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.modelDescription')}>{checkAndSetDefaultValue(formData?.vehicleDetails?.modelDescription, isLoading)}</Descriptions.Item>
                    </Descriptions>
                </Panel>
            </Collapse>
            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" collapsible="icon">
                <Panel header={translateContent('shieldSchemeRegistration.heading.customerDetails')} key="2">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.customerId')}>{checkAndSetDefaultValue(formData?.customerDetails?.customerId, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.customerDetails?.customerName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.address')}>{checkAndSetDefaultValue(formData?.customerDetails?.address, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.state')}>{checkAndSetDefaultValue(formData?.customerDetails?.state, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.district')}>{checkAndSetDefaultValue(formData?.customerDetails?.district, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.tehsil')}>{checkAndSetDefaultValue(formData?.customerDetails?.tehsil, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.city')}>{checkAndSetDefaultValue(formData?.customerDetails?.city, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.locality')}>{checkAndSetDefaultValue(formData?.customerDetails?.locality, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.pincode')}>{checkAndSetDefaultValue(formData?.customerDetails?.pinCode, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.mobileNumber')}>{checkAndSetDefaultValue(formData?.customerDetails?.mobileNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('shieldSchemeRegistration.label.gstIn')}>{checkAndSetDefaultValue(formData?.customerDetails?.gstIn, isLoading)}</Descriptions.Item>
                    </Descriptions>
                </Panel>
            </Collapse>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
