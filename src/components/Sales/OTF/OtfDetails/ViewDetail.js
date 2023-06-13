import React from 'react';
import { Col, Row, Card, Descriptions } from 'antd';

const ViewDetailMain = (props) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Card>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Initial Promise Delivery Date">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Cust. Expected Delivery Date">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Sale Type">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Price Type">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Booking Amount">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Sales Consultant">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Special Request">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Place Of Registration">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Finance Agreed">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Delivery At">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Referral">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Influencer/Mitra Type">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Influencer/Mitra Name">{'hello'}</Descriptions.Item>
                            <Descriptions.Item label="Mode Of Payment">{'hello'}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export const ViewDetail = ViewDetailMain;
