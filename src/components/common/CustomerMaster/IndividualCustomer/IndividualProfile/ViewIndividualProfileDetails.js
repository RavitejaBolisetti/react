import React from 'react';
import { Descriptions } from 'antd';
import { Space, Collapse, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { FaRegUserCircle } from 'react-icons/fa';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { activeKey, onChange, styles } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const individualForm = {
        customerCode: 'CUS003',
        firstName: 'Ranhdir',
        middleName: '',
        lastName: 'Kumar',
        mobileNumber: '9971576373',
        whatsappNumber: '9971576373',
        whatsappCommunicationAllowed: null,
        email: 'john@gmail.com',
        image: 'https://ad-dms-documents-storage.s3.amazonaws.com/CUS003/Customer_Profile_Document/Screenshot 2023-05-08 153022-cus003-1684308707424.png',
        dateOfBirth: '1986-04-03',
        gender: 'string',
        martialStatus: 'MARRIED',
        weddingAnniversary: '2015-04-03',
        occuption: 'Service',
        annualIncome: 100000,
        panNumber: 'AZPPK2001D',
        adharNumber: '850863712311',
        vechileUsed: null,
        preferredLanguage: 'hindi',
        membershipType: 'individual',
        mmfsl: 'mfsl001',
        drivingLicenseNumber: 'string',
        gstin: '29GGGGG1314R9Z6',
        customerConsent: 'string',
        customerConsentForm: 'string',
    };
    const uploadCustomerForm = {
        facebookId: 'facebook@286',
        twitterId: 'twitter@234',
        instagramId: 'insta@123',
        youtubeChannel: 'youtube@1234',
        teamBhp: 'string',
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Collapse
                    expandIcon={() => {
                        if (activeKey.includes(1)) {
                            return <MinusOutlined className={styles.iconsColor} />;
                        } else {
                            return <PlusOutlined className={styles.iconsColor} />;
                        }
                    }}
                    activeKey={activeKey}
                    onChange={() => onChange(1)}
                    expandIconPosition="end"
                >
                    <Panel
                        header={
                            <div className={styles.alignUser}>
                                <FaRegUserCircle className={styles.userCircle} />
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    {' '}
                                    Individual Information
                                </Text>
                            </div>
                        }
                        key="1"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Customer Code">{individualForm?.customerCode}</Descriptions.Item>
                            <Descriptions.Item label="First Name">{individualForm?.firstName}</Descriptions.Item>
                            <Descriptions.Item label="Middle Name">{individualForm?.middleName}</Descriptions.Item>
                            <Descriptions.Item label="Last Name">{individualForm?.lastName}</Descriptions.Item>
                            <Descriptions.Item label="Mobile Number">{individualForm?.mobileNumber}</Descriptions.Item>
                            <Descriptions.Item label="Want to use Mobile no as whatsapp no?">{individualForm?.whatsappCommunicationAllowed ? 'Active' : 'Inactive'}</Descriptions.Item>
                            <Descriptions.Item label="Whatsapp Number">{individualForm?.whatsappNumber}</Descriptions.Item>
                            <Descriptions.Item label="Do you want to contacted over whatsapp?">{individualForm?.whatsappCommunicationAllowed ? 'Active' : 'Inactive'}</Descriptions.Item>
                            <Descriptions.Item label="Email ID">{individualForm?.email}</Descriptions.Item>
                            <Descriptions.Item label="Date of Birth">{individualForm?.dateOfBirth}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{individualForm?.gender}</Descriptions.Item>
                            <Descriptions.Item label="Maritial Status">{individualForm?.martialStatus}</Descriptions.Item>
                            <Descriptions.Item label="Anniversary Date">{individualForm?.weddingAnniversary}</Descriptions.Item>
                            <Descriptions.Item label="Occupation">{individualForm?.occupation}</Descriptions.Item>
                            <Descriptions.Item label="Annual Income">{individualForm?.annualIncome}</Descriptions.Item>
                            <Descriptions.Item label="PAN">{individualForm?.panNumber}</Descriptions.Item>
                            <Descriptions.Item label="Aadhar No.">{individualForm?.voterId}</Descriptions.Item>
                            <Descriptions.Item label="Voter ID">{individualForm?.usageCategorizationcategory}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Used">{individualForm?.vehicleUsed}</Descriptions.Item>
                            <Descriptions.Item label="Mother Tongue">{individualForm?.preferredLanguage}</Descriptions.Item>
                            <Descriptions.Item label="Religion">{individualForm?.religion}</Descriptions.Item>
                            <Descriptions.Item label="Membership Type">{individualForm?.membershipType}</Descriptions.Item>
                            <Descriptions.Item label="Driving License No.">{individualForm?.drivingLicenseNumber}</Descriptions.Item>
                            <Descriptions.Item label="GSTIN">{individualForm?.gstin}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>

                <Collapse
                    expandIcon={() => {
                        if (activeKey.includes(2)) {
                            return <MinusOutlined className={styles.iconsColor} />;
                        } else {
                            return <PlusOutlined className={styles.iconsColor} />;
                        }
                    }}
                    activeKey={activeKey}
                    onChange={() => onChange(2)}
                    expandIconPosition="end"
                >
                    <Panel
                        header={
                            <div className={styles.alignUser}>
                                <FaRegUserCircle className={styles.userCircle} />
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    {' '}
                                    Social Profile
                                </Text>
                            </div>
                        }
                        key="2"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="M1-MMFSL">{uploadCustomerForm?.mmfsl}</Descriptions.Item>
                            <Descriptions.Item label="Facebook Link">{uploadCustomerForm?.facebookId}</Descriptions.Item>
                            <Descriptions.Item label="Twitter Link">{uploadCustomerForm?.twitterId}</Descriptions.Item>
                            <Descriptions.Item label="Instagram Link">{uploadCustomerForm?.instagramId}</Descriptions.Item>
                            <Descriptions.Item label="Youtube Channel">{uploadCustomerForm?.youtubeChannel}</Descriptions.Item>
                            <Descriptions.Item label="Team BHP Link">{uploadCustomerForm?.teamBhp}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
