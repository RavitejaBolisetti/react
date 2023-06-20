/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import React from 'react';
import { Space, Typography, Descriptions, Card, Divider, Col, Row, Button } from 'antd';
import { FaRegUserCircle } from 'react-icons/fa';
import { BiTimeFive } from 'react-icons/bi';

const { Text } = Typography;
const ViewDetailMain = (props) => {
    const { styles, formData } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    console.log(formData, 'FORMDATA');
    return (
        <div className={styles.viewDrawerContainer}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Card
                    header={
                        <div className={styles.alignUser}>
                            <FaRegUserCircle className={styles.userCircle} />
                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                Customer Information
                            </Text>
                        </div>
                    }
                >
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Mobile Number">{formData?.mobileNumber}</Descriptions.Item>
                        <Descriptions.Item label="Customer Type">{formData?.customerType}</Descriptions.Item>
                        <Divider />

                        <Card>
                            <div className={`${styles.cardInsideBox} ${styles.customerName}`}>
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Text className={styles.customerName}>Customer Name</Text>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ textAlign: 'right' }}>
                                        <Button type="link" icon={<BiTimeFive />}>
                                            View History
                                        </Button>
                                    </Col>
                                    <Divider />
                                    {formData?.title}
                                    <span className={styles.nameSpacing}></span>
                                    {formData?.firstName}
                                    <span className={styles.nameSpacing}></span>
                                    {formData?.middleName}
                                    <span className={styles.nameSpacing}></span>
                                    {formData?.lastName}
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Button type="link" icon={<BiTimeFive />}>
                                            View History
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                        <br />
                        <br />
                        <Descriptions.Item label="Email Id">{formData?.emailId}</Descriptions.Item>
                        <Descriptions.Item label="Do you want to contact over whatsapp?">{formData?.corporateName}</Descriptions.Item>
                        <Descriptions.Item label="Whatsapp Number">{formData?.whatsappNumber}</Descriptions.Item>
                        <Divider />
                        <Descriptions.Item label="Corporate Type">{formData?.corporateType}</Descriptions.Item>
                        <Descriptions.Item label="Corporate Name">{formData?.corporateName}</Descriptions.Item>
                        <Descriptions.Item label="Corporate Category">{formData?.corporateCategory}</Descriptions.Item>
                        <Descriptions.Item label="Membership Type">{formData?.membershipTypeType}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
