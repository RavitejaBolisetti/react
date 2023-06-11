import React from 'react';
import { Space, Collapse, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import AccessoriesInformationCard from './ViewDetails/AccessoriesInformationCard';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { activeKey, onChange, styles } = props;

    const addonAccessoriesAccessories = [{ accessoriesName: 'Shield' }, { accessoriesName: 'RSA' }, { accessoriesName: 'AMC' }, { accessoriesName: 'FMS' }];

    return (
        <Space style={{ display: 'flex' }} direction="vertical" size="middle">
            <Collapse
                expandIcon={() => {
                    if (activeKey === 'ci') {
                        return <MinusOutlined className={styles?.iconsColor} />;
                    } else {
                        return <PlusOutlined className={styles?.iconsColor} />;
                    }
                }}
                activeKey={activeKey}
                onChange={() => onChange('ci')}
                expandIconPosition="end"
            >
                <Panel
                    header={
                        <div className={styles?.alignUser}>
                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                Customer Information
                            </Text>
                        </div>
                    }
                    key={'ci'}
                >
                    <AccessoriesInformationCard />
                </Panel>
            </Collapse>

            {addonAccessoriesAccessories.map((accessories, index) => (
                <Collapse
                    expandIcon={() => {
                        if (activeKey === index) {
                            return <MinusOutlined className={styles?.iconsColor} />;
                        } else {
                            return <PlusOutlined className={styles?.iconsColor} />;
                        }
                    }}
                    activeKey={activeKey}
                    onChange={() => onChange(index)}
                    expandIconPosition="end"
                >
                    <Panel
                        header={
                            <div className={styles?.alignUser}>
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    {accessories.accessoriesName}
                                </Text>
                            </div>
                        }
                        key={index}
                    >
                        <Text key={'dtl' + index}>DETAILS</Text>
                    </Panel>
                </Collapse>
            ))}
        </Space>
    );
};

export const ViewDetail = ViewDetailMain;
