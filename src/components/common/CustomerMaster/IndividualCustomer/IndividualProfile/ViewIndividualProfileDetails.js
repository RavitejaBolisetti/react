import React from 'react';
import { Space, Collapse, Typography, Descriptions, Divider, Row, Col } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { FaRegUserCircle } from 'react-icons/fa';
import Svg from 'assets/images/Filter.svg';
import styles from 'components/common/Common.module.css';

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
        image: 'https://ad-dms-documents-storage.s3.amazonaws.com/CUS003/Customer_Profile_Document/Screenshot 2023-05-08 153022-cus003-1684308707424.png',
        dateOfBirth: '1986-04-03',
        gender: 'Male',
        martialStatus: 'MARRIED',
        weddingAnniversary: '2015-04-03',
        occuption: 'Service',
        annualIncome: '5-10 Lakhs',
        panNumber: 'AZPPK2001D',
        adharNumber: '**** **** ***2311',
        voterId: 'FJLTLP1548156',
        vehicleUsed: 'Self-Driven',
        preferredLanguage: 'hindi',
        membershipType: 'Individual',
        mmfsl: 'mfsl001',
        drivingLicenseNumber: 'UP1620195565156',
        gstin: '29GGGGG1314R9Z6',
        usageCategorizationcategory: 'Application Category',
        subCategory: 'Sub Category',
        customerCategory: 'Common',
        religion: 'hindu',
    };
    const socialMedia = {
        mmfsl: 'ps@mahindra.com',
        facebookId: 'facebook@286',
        twitterId: 'twitter@234',
        instagramId: 'insta@123',
        youtubeChannel: 'youtube@1234',
        teamBhp: 'koncept@mahindra',
    };
    const keyAccountDetailsForm = {
        accountCode: 'CFG464787',
        accountName: 'Koncept',
        accountSegement: 'Individual',
        accountClientName: 'Pal Singh',
        accountMappingDate: '12-11-2022',
    };
    const authorityDetails = {
        nameOfPerson: 'Pal Singh',
        position: 'Manager',
        companyName: 'Koncept',
        remarks: 'This is remarks',
    };

    return (
        <div className={styles.viewDrawerContainer}>
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
                            <div>
                                <img src={Svg} alt="message icon" />
                            </div>
                            <br />
                            <br />
                            <Descriptions.Item label="Date of Birth">{individualForm?.dateOfBirth}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{individualForm?.gender}</Descriptions.Item>
                            <Descriptions.Item label="Maritial Status">{individualForm?.martialStatus}</Descriptions.Item>
                            <Descriptions.Item label="Anniversary Date">{individualForm?.weddingAnniversary}</Descriptions.Item>
                            <Descriptions.Item label="Occupation">{individualForm?.occuption}</Descriptions.Item>
                            <Descriptions.Item label="Annual Income">{individualForm?.annualIncome}</Descriptions.Item>
                            <Descriptions.Item label="Driving License No.">{individualForm?.drivingLicenseNumber}</Descriptions.Item>
                            <Descriptions.Item label="Aadhar No.">{individualForm?.adharNumber}</Descriptions.Item>
                            <Descriptions.Item label="Voter ID">{individualForm?.voterId}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Used">{individualForm?.vehicleUsed}</Descriptions.Item>
                            <Descriptions.Item label="Mother Tongue">{individualForm?.preferredLanguage}</Descriptions.Item>
                            <Descriptions.Item label="Religion">{individualForm?.religion}</Descriptions.Item>
                            <Descriptions.Item label="Membership Type">{individualForm?.membershipType}</Descriptions.Item>
                            <Descriptions.Item label="PAN">{individualForm?.panNumber}</Descriptions.Item>
                            <Descriptions.Item label="GSTIN">{individualForm?.gstin}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Usage/Application Categorization">{individualForm?.usageCategorizationcategory}</Descriptions.Item>
                            <Descriptions.Item label="Usage/Application Sub-Category">{individualForm?.subCategory}</Descriptions.Item>
                            <Descriptions.Item label="Customer Category">{individualForm?.customerCategory}</Descriptions.Item>
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
                                    Key Account Details
                                </Text>
                            </div>
                        }
                        key="2"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Account Code">{keyAccountDetailsForm?.accountCode}</Descriptions.Item>
                            <Descriptions.Item label="Account Name">{keyAccountDetailsForm?.accountName}</Descriptions.Item>
                            <Descriptions.Item label="Account Segement">{keyAccountDetailsForm?.accountSegement}</Descriptions.Item>
                            <Descriptions.Item label="Account Client Name">{keyAccountDetailsForm?.accountClientName}</Descriptions.Item>
                            <Descriptions.Item label="Account Mapping Date">{keyAccountDetailsForm?.accountMappingDate}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
                <Collapse
                    expandIcon={() => {
                        if (activeKey.includes(3)) {
                            return <MinusOutlined className={styles.iconsColor} />;
                        } else {
                            return <PlusOutlined className={styles.iconsColor} />;
                        }
                    }}
                    activeKey={activeKey}
                    onChange={() => onChange(3)}
                    expandIconPosition="end"
                >
                    <Panel
                        header={
                            <div className={styles.alignUser}>
                                <FaRegUserCircle className={styles.userCircle} />
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    Authority Details (Who Knows Whom)
                                </Text>
                            </div>
                        }
                        key="3"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Name Of Person">{authorityDetails?.nameOfPerson}</Descriptions.Item>
                            <Descriptions.Item label="Position">{authorityDetails?.position}</Descriptions.Item>
                            <Descriptions.Item label="Company Name">{authorityDetails?.companyName}</Descriptions.Item>
                            <Descriptions.Item label="Remarks">{authorityDetails?.remarks}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>

                <Collapse
                    expandIcon={() => {
                        if (activeKey.includes(5)) {
                            return <MinusOutlined className={styles.iconsColor} />;
                        } else {
                            return <PlusOutlined className={styles.iconsColor} />;
                        }
                    }}
                    activeKey={activeKey}
                    onChange={() => onChange(5)}
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
                        key="5"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="M1-MMFSL">{socialMedia?.mmfsl}</Descriptions.Item>
                            <Descriptions.Item label="Facebook Link">{socialMedia?.facebookId}</Descriptions.Item>
                            <Descriptions.Item label="Twitter Link">{socialMedia?.twitterId}</Descriptions.Item>
                            <Descriptions.Item label="Instagram Link">{socialMedia?.instagramId}</Descriptions.Item>
                            <Descriptions.Item label="Youtube Channel">{socialMedia?.youtubeChannel}</Descriptions.Item>
                            <Descriptions.Item label="Team BHP Link">{socialMedia?.teamBhp}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
