/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Space, Collapse, Typography, Descriptions } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formData } = props;
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
        console.log('values', values);
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
                            <Descriptions.Item label="PAN">{formData?.panNumber}</Descriptions.Item>
                            <Descriptions.Item label="GSTIN">{formData?.gstinNumber}</Descriptions.Item>
                        </Descriptions>

                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Usage/Application Categorization">{formData?.applicationCategorization}</Descriptions.Item>
                            <Descriptions.Item label="Usage/Application Sub-Category">{formData?.applicationSubCategory}</Descriptions.Item>
                            <Descriptions.Item label="Customer Category">{formData?.customerCategory}</Descriptions.Item>
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
                                    Social Profiles
                                </Text>
                            </div>
                        }
                        key="2"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="M1-MMFSL">{formData?.m1mmfsl}</Descriptions.Item>
                            <Descriptions.Item label="Facebook Link">{formData?.facebookLink}</Descriptions.Item>
                            <Descriptions.Item label="Twitter Link">{formData?.twitterLink}</Descriptions.Item>
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
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Account Code">{formData?.keyAccountDetails.accountCode}</Descriptions.Item>
                            <Descriptions.Item label="Account Name">{formData?.keyAccountDetails.accountName}</Descriptions.Item>
                            <Descriptions.Item label="Account Segment">{formData?.keyAccountDetails.accountSegment}</Descriptions.Item>
                            <Descriptions.Item label="Account Client Name">{formData?.keyAccountDetails.accountClientName}</Descriptions.Item>
                            <Descriptions.Item label="Account Mapping Data">{formData?.keyAccountDetails.mappingData}</Descriptions.Item>
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
                                    Authority Details(Who Knows Whom)
                                </Text>
                            </div>
                        }
                        key="4"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Name Of Person">{formData?.authorityDetails[0].personName}</Descriptions.Item>
                            <Descriptions.Item label="Position">{formData?.authorityDetails[0].postion}</Descriptions.Item>
                            <Descriptions.Item label="Company Name">{formData?.authorityDetails[0].companyName}</Descriptions.Item>
                            <Descriptions.Item label="Remarks">{formData?.authorityDetails[0].remarks}</Descriptions.Item>
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
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    Upload Customer Form
                                </Text>
                            </div>
                        }
                        key="5"
                    ></Panel>
                </Collapse>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
