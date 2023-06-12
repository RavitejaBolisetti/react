import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Space, Collapse, Typography } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { FaRegUserCircle } from 'react-icons/fa';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewFinanceDetail';
const { Text } = Typography;

const { Option } = Select;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formActionType } = props;
    const { onCloseAction, setIsViewModeVisible } = props;
    const [customerForm] = Form.useForm();
    const [authorityForm] = Form.useForm();
    const [activeKey, setactiveKey] = useState([1]);

    const handleEdit = () => {
        setIsViewModeVisible(false);
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

    const viewProps = {
        activeKey,
        setactiveKey,
        onChange,
        styles,
        onCloseAction,
        handleEdit,
    };

    return (
        <>
            {!formActionType?.viewMode ? (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
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
                                                Finance Information
                                            </Text>
                                        </div>
                                    }
                                    key="1"
                                >
                                    <Form autoComplete="off" layout="vertical" form={customerForm}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Financier" name="financier" data-testid="customerType">
                                                    <Select placeholder="Select" disabled={false} loading={false} allowClear>
                                                        <Option value="financier1">HDFC</Option>
                                                        <Option value="financier2">SBI</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Branch" name="branch" data-testid="corporateCode">
                                                    <Input placeholder={preparePlaceholderText('branch')}></Input>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="File Number" name="filenumber" data-testid="usageCategorization">
                                                    <Input placeholder={preparePlaceholderText('file number')}></Input>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Loan Amount" name="loanamoount" data-testid="usageCategorization">
                                                    <Input placeholder={preparePlaceholderText('loan amount')}></Input>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="EMI" name="emi" data-testid="customerType">
                                                    <Input placeholder={preparePlaceholderText('emi')}></Input>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Finance Done" name="financedone" data-testid="CustomerCategory">
                                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="financedone1">Yes</Option>
                                                        <Option value="financedone2">No</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="D.O. Recived" name="dorecived" data-testid="CustomerCategory">
                                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="dorecived1">Yes</Option>
                                                        <Option value="dorecived2">No</Option>
                                                        <Option value="dorecived3">NA</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="D.O. Number" name="donumber" data-testid="customerType" rules={[validateRequiredSelectField('D.O. number')]}>
                                                    <Input placeholder={preparePlaceholderText('do number')}></Input>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="D.O. Date" name="dodate" data-testid="CustomerCategory" rules={[validateRequiredSelectField('D.O. date')]}>
                                                    <Input placeholder={preparePlaceholderText('do date')}></Input>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Finance Arranged By" name="arrangedby" data-testid="CustomerCategory">
                                                    <Input placeholder={preparePlaceholderText('finance arranged by')}></Input>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
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
                                                Invoice/Delivery Information
                                            </Text>
                                        </div>
                                    }
                                    key="3"
                                >
                                    <Form autoComplete="off" layout="vertical" form={authorityForm}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Invoice/Delivery Type" name="delivery" data-testid="CustomerCategory">
                                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="delivery1">Delivery Note</Option>
                                                        <Option value="delivery2">Delivery Note1</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Invoice/Delivery No." name="deliverynumber">
                                                    <Input placeholder={preparePlaceholderText('invoice/delivery no')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Invoice/Delivery Date" name="deliverydate1">
                                                    <Input placeholder={preparePlaceholderText('invoice/delivery date')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Invoice/Delivery Status" name="deliverystatus">
                                                    <Input placeholder={preparePlaceholderText('invoice/delivery status')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Panel>
                            </Collapse>
                        </Space>
                    </Col>
                </Row>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
