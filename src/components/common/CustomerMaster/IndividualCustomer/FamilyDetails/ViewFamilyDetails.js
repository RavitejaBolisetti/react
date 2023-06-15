import React from 'react';
import { Descriptions, Card, Space, Row } from 'antd';

const ViewDetailBase = (props) => {
    const {
        //formData,
        styles,
    } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 },
    };
    return (
        <div className={`${styles?.viewContainer} ${styles?.hierarchyRightContaners}`}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Card style={{backgroundColor:'#f2f2f2'}}>
                <Descriptions {...viewProps}>
                 
                    <Descriptions.Item label="M&M Customer">{props?.mnmCustomer}</Descriptions.Item>

                    <Descriptions.Item label="Customer ID">{props?.customerCode}</Descriptions.Item>

                    <Descriptions.Item label="Customer Name">{props?.familyMembername}</Descriptions.Item>
             

                    <Descriptions.Item label="Relationship">{props?.relationship}</Descriptions.Item>

                    <Descriptions.Item label="Date of Birth">{props?.dateOfBirth}</Descriptions.Item>

                    <Descriptions.Item label="Age">{props?.relationAge}</Descriptions.Item>

                    <Descriptions.Item label="Remark">{props?.remarks}</Descriptions.Item>
                </Descriptions>
                </Card>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;