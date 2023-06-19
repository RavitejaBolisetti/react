import React from 'react';
import { Col, Row, Button, Space, Collapse, Typography, Descriptions, Card, Divider } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { FaRegUserCircle } from 'react-icons/fa';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { activeKey, onChange, styles, handleEdit, onCloseAction } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const customerForm = {
        mobileNumber: '8707023991',
        customerType: 'Individual',
        title:'Mr.',
        firstName: 'Arvind',
        middleName: 'Pal',
        lastName: 'Singh',
        emailId: 'pal.arvind@gmail.com',
        contactedOverWhatsapp: true,
        useMobileNumber: 'false',
        whatsappNumber: '8707023991',
        corporateType: 'Non-Listed',
        corporateCategory: 'C1',
        corporateName: 'ABC',
        membershipType: 'Gold',
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
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
                        <Descriptions.Item label="Mobile Number">{customerForm?.mobileNumber}</Descriptions.Item>
                        <Descriptions.Item label="Customer Type">{customerForm?.customerType}</Descriptions.Item>
                        <Divider/>
                        

                        <Card>
                            <div className={`${styles.cardInsideBox} ${styles.customerName}`}>
                                <Text className={styles.customerName}>Customer Name</Text>
                                <Divider />
                                {customerForm?.title}
                                <span className={styles.nameSpacing}></span>
                                {customerForm?.firstName}
                                <span className={styles.nameSpacing}></span>
                                {customerForm.middleName}
                                <span className={styles.nameSpacing}></span>
                                {customerForm.lastName}
                            </div>
                        </Card>
                        <br />
                        <br />
                        <Descriptions.Item label="Email Id">{customerForm?.emailId}</Descriptions.Item>
                        <Descriptions.Item label="Do you want to contact over whatsapp?">{customerForm?.corporateName}</Descriptions.Item>
                        <Descriptions.Item label="Customer Category">{customerForm?.corporateName}</Descriptions.Item>
                        <Descriptions.Item label="usage Categorization Category">{customerForm?.usageCategorizationcategory ? 'Active' : 'Inactive'}</Descriptions.Item>
                    </Descriptions>
                </Card>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Button danger onClick={onCloseAction}>
                            Cancel
                        </Button>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Button type="primary" onClick={handleEdit} className={styles.floatRight}>
                            Edit
                        </Button>
                    </Col>
                </Row>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
