import React from 'react';
import { Descriptions } from 'antd';
import { CheckSquareOutlined, CloseOutlined } from '@ant-design/icons';

const ViewDetailBase = (props) => {
    const { styles, parameterType } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const formData = {
        limitAmt: '2500000',
        limitDays: '90',
        outstandingAmt: '1900000',
        partsDiscount: '25',
        laborDiscount: '19',
        remarks: 'Loren Ispum Dummy Text',
        vipDealerInd: true,
    };

    const renderCheckbox = (value) => {
        if (value) {
            return <CheckSquareOutlined style={{ color: 'red' }} />;
        } else {
            return <CloseOutlined style={{ color: 'green' }} />;
        }
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
                    <Descriptions.Item label="VIP Dealer">{renderCheckbox(formData?.vipDealerInd)}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
