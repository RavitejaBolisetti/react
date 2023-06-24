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
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';


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
                
                    <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData?.mobileNumber)}</Descriptions.Item>
                    <Descriptions.Item label="Customer Type">{checkAndSetDefaultValue(formData?.customerType)}</Descriptions.Item>
                    <Divider />
                    <Descriptions.Item label="Company Name">{checkAndSetDefaultValue(formData?.companyName)}</Descriptions.Item>
                    <Descriptions.Item label="Parent Company Code">{checkAndSetDefaultValue(formData?.parentCompanyCode)}</Descriptions.Item>
                    <Divider />
                    <Descriptions.Item label="Corporate Type">{checkAndSetDefaultValue(formData?.corporateType)}</Descriptions.Item>
                    <Descriptions.Item label="Corporate Name">{checkAndSetDefaultValue(formData?.corporateName)}</Descriptions.Item>
                    <Descriptions.Item label="Corporate Code">{checkAndSetDefaultValue(formData?.corporateCode)}</Descriptions.Item>
                    <Descriptions.Item label="Corporate Category">{checkAndSetDefaultValue(formData?.corporateCategory)}</Descriptions.Item>
                    <Descriptions.Item label="Membership Type">{checkAndSetDefaultValue(formData?.membershipType)}</Descriptions.Item>
                </Descriptions>
            </div>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;

