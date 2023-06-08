import React from 'react';
import { Descriptions } from 'antd';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse, Typography, Divider } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { FaRegPlusSquare, FaPlus, FaRegUserCircle } from 'react-icons/fa';

const { Panel } = Collapse;
const { Text, Link } = Typography;

const ViewDetailMain = (props) => {
    const { activeKey, setactiveKey, onChange, styles, parameterType, handleEdit, onCloseAction } = props;
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
                            {/* <FaRegUserCircle className={styles.userCircle} /> */}
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

            {/* <Row gutter={20}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Button danger onClick={onCloseAction}>
                            Cancel
                        </Button>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Button type="primary" onClick={handleEdit} className={styles.floatRight}>
                            Edit
                        </Button>
                    </Col>
                </Row> */}
        </Space>
    );
};

export const ViewDetail = ViewDetailMain;
