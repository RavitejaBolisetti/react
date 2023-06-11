import React from 'react';
import { Space, Collapse, Typography, Divider,Descriptions } from 'antd';
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
    const schemeForm = {
        schemeType: 'WOW',
        schemeCategory: 'Wind',
        amount: 900,
        validFrom: '10/10/2023',
        validTo: '1/11/2023',
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <Space direction="vertical" size="middle" className={styles.accordianContainer}>
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
                                    Scheme
                                </Text>
                            </div>
                        }
                        key="1"
                    >
                        <Divider />
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Scheme Type">{schemeForm?.schemeType}</Descriptions.Item>
                            <Descriptions.Item label="Scheme Category">{schemeForm?.schemeCategory}</Descriptions.Item>
                            <Descriptions.Item label="Amount">{schemeForm?.amount}</Descriptions.Item>
                            <Descriptions.Item label="Valid From">{schemeForm?.validFrom}</Descriptions.Item>
                            <Descriptions.Item label="Valid To">{schemeForm?.validTo}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>

            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
