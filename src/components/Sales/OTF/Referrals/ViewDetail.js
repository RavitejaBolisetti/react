/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import styles from 'components/common/Common.module.css';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';


const ViewDetailMain = (props) => {
    const { formData } = props;
    console.log('formData', formData);
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card className={styles.drawerCardView} style={{ backgroundColor: '#F2F2F2', borderRadius: '8px' }}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(formData?.customerId)}</Descriptions.Item>
                <Descriptions.Item label="Customer Type">{checkAndSetDefaultValue(formData?.customerType)}</Descriptions.Item>
                <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(formData?.customerName)}</Descriptions.Item>
                <Descriptions.Item label="Email ID">{checkAndSetDefaultValue(formData?.emailId)}</Descriptions.Item>
                <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData?.mobileNumber)}</Descriptions.Item>
                <Descriptions.Item label="Reg. Number">{checkAndSetDefaultValue(formData?.registrationNumber)}</Descriptions.Item>
                <Descriptions.Item label="Chessis Number">{checkAndSetDefaultValue(formData?.chasisNumber)}</Descriptions.Item>
                <Descriptions.Item label="D.O.B">{checkAndSetDefaultValue(formData?.dob)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
