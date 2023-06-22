import React from 'react';
import { Card, Descriptions } from 'antd';

const ViewDetailMain = (props) => {
    const { styles, insuranceData } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <>
            <Card>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Insurance Company">{insuranceData?.insuranceCompany}</Descriptions.Item>
                    <Descriptions.Item label="Insurance Cover Note">{insuranceData?.insuranceCoverNote}</Descriptions.Item>
                    <Descriptions.Item label="Insurance Amount">{insuranceData?.insuranceAmount}</Descriptions.Item>
                    <Descriptions.Item label="Date">{insuranceData?.insuranceDate}</Descriptions.Item>
                    <Descriptions.Item label="Registration Number">{insuranceData?.registrationNumber}</Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
};

export const ViewDetail = ViewDetailMain;
