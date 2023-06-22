/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Divider } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formData, styles } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card style={{ backgroundColor: '#F2F2F2' }}>
            <div className={styles.viewDrawerContainer}>
                <Descriptions {...viewProps}>
                
                    <Descriptions.Item label="Mobile Number">{formData?.mobileNumber}</Descriptions.Item>
                    <Descriptions.Item label="Customer Type">{formData?.customerType}</Descriptions.Item>
                    <Divider />
                    <Descriptions.Item label="Company Name">{formData?.companyName}</Descriptions.Item>
                    <Descriptions.Item label="Parent Company Code">{formData?.parentCompanyCode}</Descriptions.Item>
                    <Divider />
                    <Descriptions.Item label="Corporate Type">{formData?.corporateType}</Descriptions.Item>
                    <Descriptions.Item label="Corporate Name">{formData?.corporateName}</Descriptions.Item>
                    <Descriptions.Item label="Corporate Code">{formData?.corporateCode}</Descriptions.Item>
                    <Descriptions.Item label="Corporate Category">{formData?.corporateCategory}</Descriptions.Item>
                    <Descriptions.Item label="Membership Type">{formData?.membershipType}</Descriptions.Item>
                </Descriptions>
            </div>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;

