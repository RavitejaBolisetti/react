import React from 'react';
import { Card, Descriptions, Divider } from 'antd';
import { Col, Row, Button, Space, Collapse, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { FaRegUserCircle } from 'react-icons/fa';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { fromData, styles } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
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
                        <Descriptions.Item label="Mobile Number">{fromData?.mobileNumber}</Descriptions.Item>
                        <Descriptions.Item label="Customer Type">{fromData?.corporateCode}</Descriptions.Item>
                        <Divider />
                        <Descriptions.Item label="Company Name">{fromData?.compantName}</Descriptions.Item>
                        <Descriptions.Item label="Parent Company Code">{fromData?.parentCompanyCode}</Descriptions.Item>
                        <Divider />
                        <Descriptions.Item label="Corporate Type">{fromData?.corporateType}</Descriptions.Item>
                        <Descriptions.Item label="Corporate Name">{fromData?.corporateName}</Descriptions.Item>
                        <Descriptions.Item label="Corporate Code">{fromData?.corporateCode}</Descriptions.Item>
                        <Descriptions.Item label="Corporate Category">{fromData?.corporateCategory}</Descriptions.Item>
                        <Descriptions.Item label="Membership Type">{fromData?.membershipType}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </Space>
        </div>
    );
};

export const ViewCompanyCustomerDetails = ViewDetailMain;
