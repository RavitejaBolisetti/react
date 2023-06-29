/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Space, Collapse, Typography, Descriptions, Card } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { FiDownload } from 'react-icons/fi';
import { getCodeValue } from 'utils/getCodeValue';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { setActiveKey, activeKey, styles, formData, viewDocument, handleOnClickCustomerForm, isLoading, appCategoryData } = props;

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
                                <img width="120" height="100" src={`data:image/png;base64,${viewDocument?.base64}`} />
                            </div>
                            <br />
                            <br />
                            <Descriptions.Item label="Date of Birth">{checkAndSetDefaultValue(formData?.dateOfBirth, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.GENDER_CD, formData?.gender), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Maritial Status">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.MARITAL_STATUS, formData?.martialStatus), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Wedding Anniversary Date">{checkAndSetDefaultValue(formData?.weddingAnniversary, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Occupation">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.OCC_TYPE, formData?.occuption), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Annual Income">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.Annual_Income, formData?.annualIncome), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Driving License No.">{checkAndSetDefaultValue(formData?.drivingLicenseNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Aadhar No.">{checkAndSetDefaultValue(formData?.adharNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Voter ID">{checkAndSetDefaultValue(formData?.voterId, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Used">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.Vehicle_Used, formData?.vehicleUsed), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Mother Tongue">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.MOTHER_TOUNGE, formData?.motherTongue), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Religion">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.RELGION, formData?.religion), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="PAN">{checkAndSetDefaultValue(formData?.panNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="GSTIN">{checkAndSetDefaultValue(formData?.gstin, isLoading)}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Usage/Application Categorization">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.APP_CAT, formData?.applicationCategorization), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Usage/Application Sub-Category">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.APP_SUB_CAT, formData?.applicationSubCategory), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Customer Category">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.CUS_CAT, formData?.customerCategory), isLoading)}</Descriptions.Item>
                        </Descriptions>
                        {formData?.customerCategory === 'Fleet' ? (
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Business Details">{checkAndSetDefaultValue(formData?.buisnessDetails, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Vehicle Deployment Detail">{checkAndSetDefaultValue(formData?.vehicleDetails, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Key Role Details">{checkAndSetDefaultValue(formData?.keyRole, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Major Route Details">{checkAndSetDefaultValue(formData?.routeDetails, isLoading)}</Descriptions.Item>
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
                            <Descriptions.Item label="M1-MMFSL">{checkAndSetDefaultValue(formData?.mmfsl, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Facebook Link">{checkAndSetDefaultValue(formData?.facebookLink, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Twitter Link">{checkAndSetDefaultValue(formData?.twitterLink, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Instagram Link">{checkAndSetDefaultValue(formData?.instagramLink, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Youtube Channel">{checkAndSetDefaultValue(formData?.youtubeChannelLink, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Team BHP Link">{checkAndSetDefaultValue(formData?.teamBhpLink, isLoading)}</Descriptions.Item>
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
                            <Descriptions.Item label="Account Code">{checkAndSetDefaultValue(formData?.accountCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Account Name">{checkAndSetDefaultValue(formData?.accountName, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Account Segement">{checkAndSetDefaultValue(formData?.accountSegement, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Account Client Name">{checkAndSetDefaultValue(formData?.accountClientName, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Account Mapping Date">{checkAndSetDefaultValue(formData?.accountMappingDate, isLoading)}</Descriptions.Item>
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
                            <Descriptions.Item label="Name Of Person">{checkAndSetDefaultValue(formData?.authorityDetails?.personName, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Position">{checkAndSetDefaultValue(formData?.authorityDetails?.postion, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Company Name">{checkAndSetDefaultValue(formData?.authorityDetails?.companyName, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Remarks">{checkAndSetDefaultValue(formData?.authorityDetails?.remarks, isLoading)}</Descriptions.Item>
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
                    >
                        <Card className={styles.viewDocumentStrip} key={viewDocument?.fileName} title={viewDocument?.fileName} extra={<FiDownload />} onClick={handleOnClickCustomerForm}></Card>
                    </Panel>
                </Collapse>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
