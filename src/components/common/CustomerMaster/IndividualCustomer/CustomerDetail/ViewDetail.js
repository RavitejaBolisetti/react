/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Typography, Descriptions, Card, Divider, Col, Row, Space, Button } from 'antd';
import { BiTimeFive } from 'react-icons/bi';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';

const { Text } = Typography;
const ViewDetailMain = (props) => {
    const { styles, formData, isLoading, typeData, configurableTypedata } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Card
                    header={
                        <div className={styles.alignUser}>
                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                Customer Information
                            </Text>
                        </div>
                    }
                >
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData?.mobileNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Customer Type">{checkAndSetDefaultValue(formData?.customerType, isLoading)}</Descriptions.Item>
                    </Descriptions>
                    <div className={styles.cardInsideBox}>
                        <Row>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Text>Customer Name</Text>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ textAlign: 'right' }}>
                                <Button type="link" icon={<BiTimeFive />}>
                                    View History
                                </Button>
                            </Col>
                            <Divider />
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.customerName}>
                                <Text>
                                    {formData?.titleCode}
                                    <span>&nbsp;</span>
                                    {formData?.firstName}
                                    <span>&nbsp;</span>
                                    {formData?.middleName}
                                    <span>&nbsp;</span>
                                    {formData?.lastName}
                                </Text>
                            </Col>
                        </Row>
                    </div>
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Email Id">{checkAndSetDefaultValue(formData?.emailId)}</Descriptions.Item>
                        <Descriptions.Item label="Do you want to contact over whatsapp?" className={formData?.whatsappCommunicationIndicator ? styles.yesText : styles.noText}>
                            {checkAndSetDefaultValue(formData?.whatsappCommunicationIndicator ? 'Yes' : 'No')}
                        </Descriptions.Item>
                        <Descriptions />
                        <Descriptions.Item label="Want to use Mobile no as whatsapp no?" className={formData?.whatsappCommunicationIndicator ? styles.yesText : styles.noText}>
                            {checkAndSetDefaultValue(formData?.mobileNumberAsWhatsappNumber ? 'Yes' : 'No')}
                        </Descriptions.Item>
                        <Descriptions.Item label="Whatsapp Number">{checkAndSetDefaultValue(formData?.whatsAppNumber)}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Corporate Type">{checkAndSetDefaultValue(formData?.corporateType, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Corporate Name">{checkAndSetDefaultValue(formData?.corporateName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Corporate Category">{checkAndSetDefaultValue(formData?.corporateCategory, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Membership Type">{checkAndSetDefaultValue(formData?.membershipType, isLoading)}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
