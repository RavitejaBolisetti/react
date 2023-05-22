import React from 'react';
import { Descriptions } from 'antd';

const ViewDetailBase = ({ formData, styles, parameterType }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="M&M Customer">{formData?.mnmCustomer}</Descriptions.Item>
                    <Descriptions.Item label="Customer ID">{formData?.customerCode}</Descriptions.Item>
                    <Descriptions.Item label="Customer Name">{formData?.familyMembername}</Descriptions.Item>
                    <Descriptions.Item label="Relationship">{formData?.relationship}</Descriptions.Item>
                    <Descriptions.Item label="Date of Birth">{formData?.dateOfBirth}</Descriptions.Item>
                    <Descriptions.Item label="Age">{formData?.relationAge}</Descriptions.Item>
                    <Descriptions.Item label="Remark">{formData?.remarks}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
