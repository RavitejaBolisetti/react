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

import styles from 'assets/sass/app.module.scss';

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card className={styles.drawerCardView}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Referral ID">{checkAndSetDefaultValue(formData?.referralId, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Registration Number">{checkAndSetDefaultValue(formData?.registrationNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Chassis Number">{checkAndSetDefaultValue(formData?.chassisNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(formData?.customerId, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Customer Type">{checkAndSetDefaultValue(getCodeValue(typeData?.CUST_TYPE, formData?.customerType), isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(formData?.customerName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData?.mobileNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Email ID">{checkAndSetDefaultValue(formData?.emailId, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
