import React from 'react';
import { Descriptions } from 'antd';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { FaRegPlusSquare, FaPlus, FaRegUserCircle } from 'react-icons/fa';

const { Panel } = Collapse;
const { Text, Link } = Typography;

const ViewDetailMain = (props) => {
    const { activeKey, setactiveKey, onChange, styles, parameterType } = props;
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
    const AuthorityForm = {
        companyName: 'uttar pradesh',
        personName: 'ssss',
        postion: '12312',
        remarks: 'Delhi',
    };
    const keyAccountForm = {
        accountClientName: 'uttar pradesh',
        accountCode: 'ssss',
        accountMappingDate: '12312',
        accountName: 'Delhi',
        accountSegment: true,
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
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
                                <FaRegUserCircle className={styles.userCircle} />
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    {' '}
                                    Customer Information
                                </Text>
                            </div>
                        }
                        key="1"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Customer Type">{customerForm?.customerType}</Descriptions.Item>
                            <Descriptions.Item label="corporate Code">{customerForm?.corporateCode}</Descriptions.Item>
                            <Descriptions.Item label="Customer Category">{customerForm?.CustomerCategory}</Descriptions.Item>
                            <Descriptions.Item label="Usage Categorization">{customerForm?.usageCategorization}</Descriptions.Item>
                            <Descriptions.Item label="usage Categorization Category">{customerForm?.usageCategorizationcategory ? 'Active' : 'Inactive'}</Descriptions.Item>
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
                                <FaRegUserCircle className={styles.userCircle} />
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    {' '}
                                    Key Account Details
                                </Text>
                            </div>
                        }
                        key="2"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Account Client Name">{keyAccountForm?.accountClientName}</Descriptions.Item>
                            <Descriptions.Item label="Account Code">{keyAccountForm?.accountCode}</Descriptions.Item>
                            <Descriptions.Item label="Account Mapping Date">{keyAccountForm?.accountMappingDate}</Descriptions.Item>
                            <Descriptions.Item label="Account Name">{keyAccountForm?.accountName}</Descriptions.Item>
                            <Descriptions.Item label="Account Segment">{keyAccountForm?.accountSegment ? 'Active' : 'Inactive'}</Descriptions.Item>
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
                                <FaRegUserCircle className={styles.userCircle} />
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    {' '}
                                    Authority Details
                                </Text>
                            </div>
                        }
                        key="3"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Company Name">{AuthorityForm?.companyName}</Descriptions.Item>
                            <Descriptions.Item label="Person Name">{AuthorityForm?.personName}</Descriptions.Item>
                            <Descriptions.Item label="Postion">{AuthorityForm?.postion}</Descriptions.Item>
                            <Descriptions.Item label="Remarks">{AuthorityForm?.remarks}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
