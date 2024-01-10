/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Card, Descriptions, Collapse, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';
import { expandIcon } from 'utils/accordianExpandIcon';

const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={'Request Type' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.requestType, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Invoice Id' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.invoiceId, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Registration Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.registrationNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Invoice Date' || translateContent('amcRegistration.label.invoiceData')}>{checkAndSetDefaultValue(formData?.invoiceDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Chassis Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.chassisNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Vehicle Type' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.vehicleType, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Customer ID' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.customerID, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Customer Name' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.customerName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Reason For Request' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.reasonForRequest, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
