/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Card } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';

const ViewDetailBase = (props) => {
    const { styles, formData } = props;
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
        <Card style={{ backgroundColor: '#F2F2F2' }}>
            <div className={styles.viewDrawerContainer}>
                <>
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Credit Limit">{formData?.creditAmount}</Descriptions.Item>
                        <Descriptions.Item label="Credit Limit Days">{formData?.creditDays}</Descriptions.Item>
                        <Descriptions.Item label="Outstanding Amount">{formData?.outstandingAmount}</Descriptions.Item>
                        <Descriptions.Item label="Parts Discount">{formData?.partsDiscount}</Descriptions.Item>
                        <Descriptions.Item label="Labour Discount">{formData?.labourDiscount}</Descriptions.Item>
                        <Descriptions.Item label="Remarks">{formData?.remarks}</Descriptions.Item>
                        {/* <Descriptions.Item label="VIP Dealer">{renderCheckbox(formData?.vipDealerInd)}</Descriptions.Item> */}
                        <div> {renderCheckbox(formData?.vipDealerInd)}VIP Dealer</div>
                    </Descriptions>
                </>
            </div>
        </Card>
    );
};

export const ViewDetail = ViewDetailBase;
