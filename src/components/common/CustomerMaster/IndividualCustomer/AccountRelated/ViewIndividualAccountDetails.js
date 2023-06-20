import React from 'react';
import { Descriptions } from 'antd';
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
        <div className={styles.viewDrawerContainer}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Credit Limit">{formData?.creditAmount}</Descriptions.Item>
                    <Descriptions.Item label="Credit Limit Days">{formData?.creditDays}</Descriptions.Item>
                    <Descriptions.Item label="Outstanding Amount">{formData?.outstandingAmt}</Descriptions.Item>
                    <Descriptions.Item label="Parts Discount">{formData?.partsDiscount}</Descriptions.Item>
                    <Descriptions.Item label="Labour Discount">{formData?.labourDiscount}</Descriptions.Item>
                    <Descriptions.Item label="Remarks">{formData?.remarks}</Descriptions.Item>
                    {/* <Descriptions.Item label="VIP Dealer">{renderCheckbox(formData?.vipDealerInd)}</Descriptions.Item> */}
                    <div> {renderCheckbox(formData?.vipDealerInd)}VIP Dealer</div>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
