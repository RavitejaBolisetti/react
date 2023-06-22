/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import styles from 'components/common/Common.module.css';

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
                <Descriptions.Item label="Customer ID">{formData?.customerId??'NA'}</Descriptions.Item>
                <Descriptions.Item label="Customer Type">{formData?.customerType??'NA'}</Descriptions.Item>
                <Descriptions.Item label="Customer Name">{formData?.customerName??'NA'}</Descriptions.Item>
                <Descriptions.Item label="Email ID">{formData?.emailId??'NA'}</Descriptions.Item>
                <Descriptions.Item label="Mobile Number">{formData?.mobileNumber??'NA'}</Descriptions.Item>
                <Descriptions.Item label="Reg. Number">{formData?.registrationNumber??'NA'}</Descriptions.Item>
                <Descriptions.Item label="Chessis Number">{formData?.chasisNumber??'NA'}</Descriptions.Item>
                <Descriptions.Item label="D.O.B">{formData?.dob??'NA'}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
