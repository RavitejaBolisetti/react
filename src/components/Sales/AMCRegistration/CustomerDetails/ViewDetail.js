/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';

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
                <Descriptions.Item label={translateContent('amcRegistration.label.customerId')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCode, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('amcRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('amcRegistration.label.customerAddress')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.address, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('amcRegistration.label.state')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.state, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('amcRegistration.label.city')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.city, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('amcRegistration.label.district')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('amcRegistration.label.tehsil')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.tehsil, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('amcRegistration.label.locality')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.locality, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('amcRegistration.label.pinCode')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.pincode, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('amcRegistration.label.mobile')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.mobileNumber, isLoading)}</Descriptions.Item>
                {/* <Descriptions.Item label={translateContent('amcRegistration.label.gstin')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstIn, isLoading)}</Descriptions.Item> */}
            </Descriptions>
        </Card>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
