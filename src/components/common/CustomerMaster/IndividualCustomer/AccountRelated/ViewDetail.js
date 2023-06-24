/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Card } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

const ViewDetailBase = (props) => {
    const { styles, formData, isLoading } = props;
    console.log('🚀 ~ file: ViewDetail.js:12 ~ ViewDetailBase ~ Kuldeep:', formData);

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const renderCheckbox = (value) => {
        if (value) {
            return <CheckSquareOutlined />;
        } else {
            return;
        }
    };
    return (
        <div className={styles.viewDrawerContainer}>
            <Card>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Credit Limit">{checkAndSetDefaultValue(formData?.creditAmount, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Credit Limit Days">{checkAndSetDefaultValue(formData?.creditDays, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Outstanding Amount">{checkAndSetDefaultValue(formData?.outstandingAmount, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Parts Discount">{checkAndSetDefaultValue(formData?.partsDiscount, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Labour Discount">{checkAndSetDefaultValue(formData?.labourDiscount, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Remarks">{checkAndSetDefaultValue(formData?.remarks, isLoading)}</Descriptions.Item>
                    {/* <Descriptions.Item label="VIP Dealer">{checkAndSetDefaultValue(renderCheckbox(formData?.vipDealerInd), isLoading)}</Descriptions.Item> */}
                    <div> {renderCheckbox(formData?.vipDealerInd)}VIP Dealer</div>
                </Descriptions>
            </Card>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
