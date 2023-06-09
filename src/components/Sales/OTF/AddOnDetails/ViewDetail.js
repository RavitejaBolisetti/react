import React from 'react';
import { Descriptions } from 'antd';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { FaRegPlusSquare, FaPlus, FaRegUserCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';

import AccessoriesInformationCard from './ViewDetails/AccessoriesInformationCard';

const { Panel } = Collapse;
const { Text, Link } = Typography;

const ViewDetailMain = (props) => {
    const { activeKey, setActiveKey, onChange, styles, parameterType, handleEdit, onCloseAction } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const customerForm = {
        customerType: 'uttar pradesh',
        corporateCode: 'ssss',
        CustomerCategory: '12312',
        usageCategorization: 'Delhi',
        usageCategorizationcategory: true,
    };
    const addonAccessoriesAccessories = [{ accessoriesName: 'Shield' }, { accessoriesName: 'RSA' }, { accessoriesName: 'AMC' }, { accessoriesName: 'FMS' }];

    return (
        <Space style={{ display: 'flex' }} direction="vertical" size="middle">
            <Collapse
                expandIcon={() => {
                    if (activeKey ==='ci') {
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
                            {/* <FaRegUserCircle className={styles?.userCircle} /> */}
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
                                {/* <FaRegUserCircle className={styles?.userCircle} /> */}
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    {accessories.accessoriesName }
                                </Text>
                            </div>
                        }
                        key={index}
                    >
                        <Text>DETAILS</Text>
                    </Panel>
                </Collapse>
            ))}
        </Space>
    );
};

export const ViewDetail = ViewDetailMain;
