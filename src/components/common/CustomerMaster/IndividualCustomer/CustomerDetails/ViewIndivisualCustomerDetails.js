import React from 'react';
import { Space, Typography, Descriptions, Card, Divider } from 'antd';
import { FaRegUserCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';


const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { styles, formData } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const customerForm = {
        mobileNumber: '8707023991',
        customerType: 'Individual',
        title: 'Mr.',
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
                                <Text className={styles.customerName}>Customer Name</Text>
                                <Divider />
                                {formData?.title}
                                <span className={styles.nameSpacing}></span>
                                {formData?.firstName}
                                <span className={styles.nameSpacing}></span>
                                {formData.middleName}
                                <span className={styles.nameSpacing}></span>
                                {formData.lastName}
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

export const ViewIndivisualCustomerDetails = ViewDetailMain;
