/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Space, Collapse, Typography, Descriptions } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Svg from 'assets/images/Filter.svg';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';


const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { setActiveKey, activeKey, styles, formData, viewDocument } = props;

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
                                <img width="500" height="200" src={`data:image/png;base64,${viewDocument?.base64}`} />{' '}
                            </div>
                            <br />
                            <br />
                            <Descriptions.Item label="Date of Birth">{checkAndSetDefaultValue(formData?.dateOfBirth)}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{checkAndSetDefaultValue(formData?.gender)}</Descriptions.Item>
                            <Descriptions.Item label="Maritial Status">{checkAndSetDefaultValue(formData?.martialStatus)}</Descriptions.Item>
                            <Descriptions.Item label="Wedding Anniversary Date">{checkAndSetDefaultValue(formData?.weddingAnniversary)}</Descriptions.Item>
                            <Descriptions.Item label="Occupation">{checkAndSetDefaultValue(formData?.occuption)}</Descriptions.Item>
                            <Descriptions.Item label="Annual Income">{checkAndSetDefaultValue(formData?.annualIncome)}</Descriptions.Item>
                            <Descriptions.Item label="Driving License No.">{checkAndSetDefaultValue(formData?.drivingLicenseNumber)}</Descriptions.Item>
                            <Descriptions.Item label="Aadhar No.">{checkAndSetDefaultValue(formData?.adharNumber)}</Descriptions.Item>
                            <Descriptions.Item label="Voter ID">{checkAndSetDefaultValue(formData?.voterId)}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Used">{checkAndSetDefaultValue(formData?.vehicleUsed)}</Descriptions.Item>
                            <Descriptions.Item label="Mother Tongue">{checkAndSetDefaultValue(formData?.preferredLanguage)}</Descriptions.Item>
                            <Descriptions.Item label="Religion">{checkAndSetDefaultValue(formData?.religion)}</Descriptions.Item>
                            <Descriptions.Item label="PAN">{checkAndSetDefaultValue(formData?.panNumber)}</Descriptions.Item>
                            <Descriptions.Item label="GSTIN">{checkAndSetDefaultValue(formData?.gstin)}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Usage/Application Categorization">{checkAndSetDefaultValue(formData?.usageCategorizationcategory)}</Descriptions.Item>
                            <Descriptions.Item label="Usage/Application Sub-Category">{checkAndSetDefaultValue(formData?.subCategory)}</Descriptions.Item>
                            <Descriptions.Item label="Customer Category">{checkAndSetDefaultValue(formData?.customerCategory)}</Descriptions.Item>
                        </Descriptions>
                        {formData?.customerCategory === 'Fleet' ? (
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Business Details">{checkAndSetDefaultValue(formData?.buisnessDetails)}</Descriptions.Item>
                                <Descriptions.Item label="Vehicle Deployment Detail">{checkAndSetDefaultValue(formData?.vehicleDetails)}</Descriptions.Item>
                                <Descriptions.Item label="Key Role Details">{checkAndSetDefaultValue(formData?.keyRole)}</Descriptions.Item>
                                <Descriptions.Item label="Major Route Details">{checkAndSetDefaultValue(formData?.routeDetails)}</Descriptions.Item>
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
                            <Descriptions.Item label="M1-MMFSL">{checkAndSetDefaultValue(formData?.mmfsl)}</Descriptions.Item>
                            <Descriptions.Item label="Facebook Link">{checkAndSetDefaultValue(formData?.facebookId)}</Descriptions.Item>
                            <Descriptions.Item label="Twitter Link">{checkAndSetDefaultValue(formData?.twitterId)}</Descriptions.Item>
                            <Descriptions.Item label="Instagram Link">{checkAndSetDefaultValue(formData?.instagramId)}</Descriptions.Item>
                            <Descriptions.Item label="Youtube Channel">{checkAndSetDefaultValue(formData?.youtubeChannel)}</Descriptions.Item>
                            <Descriptions.Item label="Team BHP Link">{checkAndSetDefaultValue(formData?.teamBhp)}</Descriptions.Item>
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
                            <Descriptions.Item label="Account Code">{checkAndSetDefaultValue(formData?.accountCode)}</Descriptions.Item>
                            <Descriptions.Item label="Account Name">{checkAndSetDefaultValue(formData?.accountName)}</Descriptions.Item>
                            <Descriptions.Item label="Account Segement">{checkAndSetDefaultValue(formData?.accountSegement)}</Descriptions.Item>
                            <Descriptions.Item label="Account Client Name">{checkAndSetDefaultValue(formData?.accountClientName)}</Descriptions.Item>
                            <Descriptions.Item label="Account Mapping Date">{checkAndSetDefaultValue(formData?.accountMappingDate)}</Descriptions.Item>
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
                            <Descriptions.Item label="Name Of Person">{checkAndSetDefaultValue(formData?.nameOfPerson)}</Descriptions.Item>
                            <Descriptions.Item label="Position">{checkAndSetDefaultValue(formData?.position)}</Descriptions.Item>
                            <Descriptions.Item label="Company Name">{checkAndSetDefaultValue(formData?.companyName)}</Descriptions.Item>
                            <Descriptions.Item label="Remarks">{checkAndSetDefaultValue(formData?.remarks)}</Descriptions.Item>
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
