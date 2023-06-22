/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Space, Collapse, Typography, Divider, Descriptions } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

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

    const schemeData = [
        {
            schemeType: 'WOW',
            schemeCategory: 'Wind',
            amount: 900,
            validFrom: '10/10/2023',
            validTo: '1/11/2023',
            id: 1,
            description: 'Refer the best High Touch Engineer-Routing & Switching',
        },
        {
            schemeType: 'WOW',
            schemeCategory: 'Wind',
            amount: 900,
            validFrom: '10/10/2023',
            validTo: '1/11/2023',
            id: 2,
            description: 'Refer the best High Touch Engineer-Routing & Switching',
        },
        {
            schemeType: 'WOW',
            schemeCategory: 'Wind',
            amount: 900,
            validFrom: '10/10/2023',
            validTo: '1/11/2023',
            id: 3,
            description: 'Refer the best High Touch Engineer-Routing & Switching',
        },
    ];

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <Space direction="vertical" size="middle" className={styles.accordianContainer}>
                {schemeData?.map((schemeForm) => (
                    <Collapse
                        expandIcon={() => {
                            if (activeKey.includes(schemeForm?.id)) {
                                return <MinusOutlined className={styles.iconsColor} />;
                            } else {
                                return <PlusOutlined className={styles.iconsColor} />;
                            }
                        }}
                        activeKey={activeKey}
                        onChange={() => onChange(schemeForm?.id)}
                        expandIconPosition="end"
                        className={styles.collapseContainer}
                    >
                        <Panel
                            header={
                                <div className={styles.alignUser}>
                                    <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                        Scheme
                                    </Text>
                                </div>
                            }
                            key={schemeForm?.id}
                        >
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Scheme Type">{schemeForm?.schemeType}</Descriptions.Item>
                                <Descriptions.Item label="Scheme Category">{schemeForm?.schemeCategory}</Descriptions.Item>
                                <Descriptions.Item label="Amount">{schemeForm?.amount}</Descriptions.Item>
                                <Descriptions.Item label="Valid From">{schemeForm?.validFrom}</Descriptions.Item>
                                <Descriptions.Item label="Valid To">{schemeForm?.validTo}</Descriptions.Item>
                                <Descriptions.Item label="" />
                                <Descriptions.Item label="Description">{schemeForm?.description}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                ))}
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
