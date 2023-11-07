/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';
import { translateContent } from 'utils/translateContent';
const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('commonModules.label.referrals.referralId')}>{checkAndSetDefaultValue(formData?.referralId, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.referrals.vehicleRegistrationNumber')}>{checkAndSetDefaultValue(formData?.registrationNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.referrals.chassisNumber')}>{checkAndSetDefaultValue(formData?.chassisNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.referrals.customerCode')}>{checkAndSetDefaultValue(formData?.customerId, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.referrals.customerType')}>{checkAndSetDefaultValue(getCodeValue(typeData?.CUST_TYPE, formData?.customerType), isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.referrals.customerName')}>{checkAndSetDefaultValue(formData?.customerName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.referrals.mobileNumber')}>{checkAndSetDefaultValue(formData?.mobileNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.referrals.emailId')}>{checkAndSetDefaultValue(formData?.emailId, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.referrals.dateOfBirth')}>{checkAndSetDefaultValue(formData?.dob, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
