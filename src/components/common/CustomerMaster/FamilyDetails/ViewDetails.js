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
                    <Descriptions.Item label="Credit Limit">{formData?.limitAmt}</Descriptions.Item>
                    <Descriptions.Item label="Credit Limit Days">{formData?.limitDays}</Descriptions.Item>
                    <Descriptions.Item label="Outstanding Amount">{formData?.outstandingAmt}</Descriptions.Item>
                    <Descriptions.Item label="Parts Discount">{formData?.partsDiscount}</Descriptions.Item>
                    <Descriptions.Item label="Labour Discount">{formData?.laborDiscount}</Descriptions.Item>
                    <Descriptions.Item label="Remarks">{formData?.remarks}</Descriptions.Item>
                    <Descriptions.Item label="VIP Customer">{formData?.status ? 'Active' : 'Inactive'}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
