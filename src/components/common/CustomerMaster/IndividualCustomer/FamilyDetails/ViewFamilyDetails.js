import React from 'react';
import { Descriptions, Card, Row, Col } from 'antd';

const ViewDetailBase = (props) => {
    const {
        //formData,
        styles,
    } = props;
    const formData = {
        mnmCustomer: 'Customer',
        customerCode: 'CDE',
        familyMembername: 'Member',
        relationship: 'brother',
        dateOfBirth: '69 Sep 1999',
        relationAge: '69',
        remarks: 'm&m',
    };
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <>
            {/* div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`} */}
            <Card>
                <Descriptions {...viewProps}>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Descriptions.Item label="M&M Customer">{formData?.mnmCustomer}</Descriptions.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Descriptions.Item label="Customer ID">{formData?.customerCode}</Descriptions.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Descriptions.Item label="Customer Name">{formData?.familyMembername}</Descriptions.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Descriptions.Item label="Relationship">{formData?.relationship}</Descriptions.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Descriptions.Item label="Date of Birth">{formData?.dateOfBirth}</Descriptions.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Descriptions.Item label="Age">{formData?.relationAge}</Descriptions.Item>
                        </Col>
                    </Row>
                    <Descriptions.Item label="Remark">{formData?.remarks}</Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
};

export const ViewDetail = ViewDetailBase;
