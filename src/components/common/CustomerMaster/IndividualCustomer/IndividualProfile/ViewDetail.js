/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Space, Collapse, Typography, Descriptions } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Svg from 'assets/images/Filter.svg';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { setActiveKey, activeKey, styles, formData } = props;

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setActiveKey(newActivekeys);
        } else {
            setActiveKey([...activeKey, values]);
        }
    };
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
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
                            <Descriptions.Item label="Date of Birth">{formData?.dateOfBirth}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{formData?.gender}</Descriptions.Item>
                            <Descriptions.Item label="Maritial Status">{formData?.martialStatus}</Descriptions.Item>
                            <Descriptions.Item label="Wedding Anniversary Date">{formData?.weddingAnniversary}</Descriptions.Item>
                            <Descriptions.Item label="Occupation">{formData?.occuption}</Descriptions.Item>
                            <Descriptions.Item label="Annual Income">{formData?.annualIncome}</Descriptions.Item>
                            <Descriptions.Item label="Driving License No.">{formData?.drivingLicenseNumber}</Descriptions.Item>
                            <Descriptions.Item label="Aadhar No.">{formData?.adharNumber}</Descriptions.Item>
                            <Descriptions.Item label="Voter ID">{formData?.voterId}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Used">{formData?.vehicleUsed}</Descriptions.Item>
                            <Descriptions.Item label="Mother Tongue">{formData?.preferredLanguage}</Descriptions.Item>
                            <Descriptions.Item label="Religion">{formData?.religion}</Descriptions.Item>
                            <Descriptions.Item label="PAN">{formData?.panNumber}</Descriptions.Item>
                            <Descriptions.Item label="GSTIN">{formData?.gstin}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Usage/Application Categorization">{formData?.usageCategorizationcategory}</Descriptions.Item>
                            <Descriptions.Item label="Usage/Application Sub-Category">{formData?.subCategory}</Descriptions.Item>
                            <Descriptions.Item label="Customer Category">{formData?.customerCategory}</Descriptions.Item>
                        </Descriptions>
                        {formData?.customerCategory === 'Fleet' ? (
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Business Details">{formData?.buisnessDetails}</Descriptions.Item>
                                <Descriptions.Item label="Vehicle Deployment Detail">{formData?.vehicleDetails}</Descriptions.Item>
                                <Descriptions.Item label="Key Role Details">{formData?.keyRole}</Descriptions.Item>
                                <Descriptions.Item label="Major Route Details">{formData?.routeDetails}</Descriptions.Item>
                            </Descriptions>
                        ) : null}
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
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    {' '}
                                    Social Profile
                                </Text>
                            </div>
                        }
                        key="5"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="M1-MMFSL">{formData?.mmfsl}</Descriptions.Item>
                            <Descriptions.Item label="Facebook Link">{formData?.facebookId}</Descriptions.Item>
                            <Descriptions.Item label="Twitter Link">{formData?.twitterId}</Descriptions.Item>
                            <Descriptions.Item label="Instagram Link">{formData?.instagramId}</Descriptions.Item>
                            <Descriptions.Item label="Youtube Channel">{formData?.youtubeChannel}</Descriptions.Item>
                            <Descriptions.Item label="Team BHP Link">{formData?.teamBhp}</Descriptions.Item>
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
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    Key Account Details
                                </Text>
                            </div>
                        }
                        key="2"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Account Code">{formData?.accountCode}</Descriptions.Item>
                            <Descriptions.Item label="Account Name">{formData?.accountName}</Descriptions.Item>
                            <Descriptions.Item label="Account Segement">{formData?.accountSegement}</Descriptions.Item>
                            <Descriptions.Item label="Account Client Name">{formData?.accountClientName}</Descriptions.Item>
                            <Descriptions.Item label="Account Mapping Date">{formData?.accountMappingDate}</Descriptions.Item>
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
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    Authority Details (Who Knows Whom)
                                </Text>
                            </div>
                        }
                        key="3"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Name Of Person">{formData?.nameOfPerson}</Descriptions.Item>
                            <Descriptions.Item label="Position">{formData?.position}</Descriptions.Item>
                            <Descriptions.Item label="Company Name">{formData?.companyName}</Descriptions.Item>
                            <Descriptions.Item label="Remarks">{formData?.remarks}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
                <Collapse
                    expandIcon={() => {
                        if (activeKey.includes(4)) {
                            return <MinusOutlined className={styles.iconsColor} />;
                        } else {
                            return <PlusOutlined className={styles.iconsColor} />;
                        }
                    }}
                    activeKey={activeKey}
                    onChange={() => onChange(4)}
                    expandIconPosition="end"
                >
                    <Panel
                        header={
                            <div className={styles.alignUser}>
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    Upload Customer Form
                                </Text>
                            </div>
                        }
                        key="4"
                    ></Panel>
                </Collapse>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
