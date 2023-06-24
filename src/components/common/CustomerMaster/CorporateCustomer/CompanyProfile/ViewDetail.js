/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Space, Collapse, Typography, Descriptions, Card } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styles from 'components/common/Common.module.css';
import { FiDownload } from 'react-icons/fi';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formData, handleOnClick } = props;
    const [activeKey, setactiveKey] = useState([1]);
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
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
                                    Company Information
                                </Text>
                            </div>
                        }
                        key="1"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="PAN">{checkAndSetDefaultValue(formData?.panNumber)}</Descriptions.Item>
                            <Descriptions.Item label="GSTIN">{checkAndSetDefaultValue(formData?.gstinNumber)}</Descriptions.Item>
                        </Descriptions>

                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Usage/Application Categorization">{checkAndSetDefaultValue(formData?.applicationCategorization)}</Descriptions.Item>
                            <Descriptions.Item label="Usage/Application Sub-Category">{checkAndSetDefaultValue(formData?.applicationSubCategory)}</Descriptions.Item>
                            <Descriptions.Item label="Customer Category">{checkAndSetDefaultValue(formData?.customerCategory)}</Descriptions.Item>
                        </Descriptions>
                        {formData?.customerCategory === 'Fleet' && (
                            <>
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label="Business Details">{checkAndSetDefaultValue(formData?.businessDetails)}</Descriptions.Item>
                                    <Descriptions.Item label="Vehicle Deployment Detail">{checkAndSetDefaultValue(formData?.vechileDeploymentDetails)}</Descriptions.Item>
                                    <Descriptions.Item label="Key Role Details">{checkAndSetDefaultValue(formData?.keyRouteDetails)}</Descriptions.Item>
                                    <Descriptions.Item label="Major Route Details">{checkAndSetDefaultValue(formData?.majorRouteDetails)}</Descriptions.Item>
                                </Descriptions>
                            </>
                        )}
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
                                    Social Profiles
                                </Text>
                            </div>
                        }
                        key="2"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="M1-MMFSL">{checkAndSetDefaultValue(formData?.m1mmfsl)}</Descriptions.Item>
                            <Descriptions.Item label="Facebook Link">{checkAndSetDefaultValue(formData?.facebookLink)}</Descriptions.Item>
                            <Descriptions.Item label="Twitter Link">{checkAndSetDefaultValue(formData?.twitterLink)}</Descriptions.Item>
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
                                    Key Account Details
                                </Text>
                            </div>
                        }
                        key="3"
                    >
                        {formData?.keyAccountDetails && (
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Account Code">{checkAndSetDefaultValue(formData?.keyAccountDetails?.accountCode)}</Descriptions.Item>
                                <Descriptions.Item label="Account Name">{checkAndSetDefaultValue(formData?.keyAccountDetails?.accountName)}</Descriptions.Item>
                                <Descriptions.Item label="Account Segment">{checkAndSetDefaultValue(formData?.keyAccountDetails?.accountSegment)}</Descriptions.Item>
                                <Descriptions.Item label="Account Client Name">{checkAndSetDefaultValue(formData?.keyAccountDetails?.accountClientName)}</Descriptions.Item>
                                <Descriptions.Item label="Account Mapping Date">{checkAndSetDefaultValue(formData?.keyAccountDetails?.accountMappingDate)}</Descriptions.Item>
                            </Descriptions>
                        )}
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
                                    Authority Details(Who Knows Whom)
                                </Text>
                            </div>
                        }
                        key="4"
                    >
                        {formData?.authorityDetails && (
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Name Of Person">{checkAndSetDefaultValue(formData?.authorityDetails.personName)}</Descriptions.Item>
                                <Descriptions.Item label="Position">{checkAndSetDefaultValue(formData?.authorityDetails.postion)}</Descriptions.Item>
                                <Descriptions.Item label="Company Name">{checkAndSetDefaultValue(formData?.authorityDetails.companyName)}</Descriptions.Item>
                                <Descriptions.Item label="Remarks">{checkAndSetDefaultValue(formData?.authorityDetails.remarks)}</Descriptions.Item>
                            </Descriptions>
                        )}
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
                                    Upload Customer Form
                                </Text>
                            </div>
                        }
                        key="5"
                    >
                        <a>
                            <Card className={styles.viewDocumentStrip} key={formData?.customerFormDocId} title={formData?.customerFormDocId} extra={<FiDownload />} onClick={handleOnClick}></Card>
                        </a>
                        {/* {viewDocument && <img width="500" height="200" src={`data:image/png;base64,${viewDocument?.base64}`} />} */}
                    </Panel>
                </Collapse>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
