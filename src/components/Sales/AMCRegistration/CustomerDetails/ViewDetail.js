/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { PARAM_MASTER } from 'constants/paramMaster';
import { getCodeValue } from 'utils/getCodeValue';

const ViewDetailMain = (props) => {
    const { styles, formData, isLoading, typeData } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    return (
        <Card>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(formData?.customerId, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(formData?.customerName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Address">{checkAndSetDefaultValue(formData?.customerAddress, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="State">{checkAndSetDefaultValue(formData?.state, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="City">{checkAndSetDefaultValue(formData?.customerCity, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="District">{checkAndSetDefaultValue(formData?.district, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Tehsil">{checkAndSetDefaultValue(formData?.district, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Locality">{checkAndSetDefaultValue(formData?.district, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Pincode">{checkAndSetDefaultValue(formData?.pinCode, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Mobile No.">{checkAndSetDefaultValue(formData?.customerPhoneNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="GSTIN">{checkAndSetDefaultValue(formData?.email, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
