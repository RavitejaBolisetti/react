/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Space, Collapse, Typography, Descriptions } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { activeKey, styles, schemeData, isLoading } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <Space direction="vertical" size="middle" className={styles.accordianContainer}>
                {schemeData[0]?.schemes?.map((schemeForm, index) => (
                    <Collapse
                        expandIcon={() => {
                            if (activeKey?.includes(schemeForm?.id)) {
                                return <MinusOutlined className={styles.iconsColor} />;
                            } else {
                                return <PlusOutlined className={styles.iconsColor} />;
                            }
                        }}
                        activeKey={activeKey}
                        expandIconPosition="end"
                        className={styles.collapseContainer}
                    >
                        <Panel
                            header={
                                <div className={styles.alignUser}>
                                    <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                        {`Scheme ${index + 1}`}
                                    </Text>
                                </div>
                            }
                            key={schemeForm?.id}
                        >
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Scheme Type">{checkAndSetDefaultValue(schemeForm?.schemeType, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Scheme Category">{checkAndSetDefaultValue(schemeForm?.schemeCategory, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Amount">{checkAndSetDefaultValue(schemeForm?.amount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Valid From">{checkAndSetDefaultValue(schemeForm?.validFrom, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Valid To">{checkAndSetDefaultValue(schemeForm?.validTo, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="" />
                                <Descriptions.Item label="Description">{checkAndSetDefaultValue(schemeForm?.description, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                ))}
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
