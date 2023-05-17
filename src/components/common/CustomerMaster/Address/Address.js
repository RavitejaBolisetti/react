import React, { useState } from 'react';

import { Col, Collapse, Row, Button, Form, Input, Select, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons'  ;
import { PlusOutlined } from '@ant-design/icons';


import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validationFieldLetteNumberandPeriod, validateRequiredSelectField, validateAlphanumericWithSpace } from 'utils/validation';

const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select;

const Address = () => {
    const [form] = Form.useForm();
    const [openAccordian, setOpenAccordian] = useState('');
    const [isFieldDisable, setIsFieldDisable] = useState(false);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    return (
        <Collapse onChange={() => handleCollapse(1)}  expandIcon={({ isActive }) => isActive ? <UserOutlined /> : <UserOutlined />} activeKey={openAccordian}>
            <Panel
                header={
                    <>
                        <Space>
                            <Text strong> Company Address</Text> <Button icon={<PlusOutlined />} type="primary">Add Address</Button>
                        </Space>{' '}
                    </>
                }
                key="1"
            >
                <Form form={form} id="myForm" autoComplete="off" layout="vertical">
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Address Type" name="applicationType" rules={[validateRequiredSelectField('application type')]}>
                                <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} maxLength={50} placeholder={preparePlaceholderText('address Type')}>
                                    <Option>select</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Address Line 1" name="applicationName" rules={[validateRequiredInputField('application name'), validateAlphanumericWithSpace('application name')]}>
                                <Input disabled={isFieldDisable} maxLength={50} placeholder={preparePlaceholderText('address Line 1')} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Address Line 2" name="applicationTitle" rules={[validateRequiredInputField('application title'), validateAlphanumericWithSpace('application title')]}>
                                <Input maxLength={50} placeholder={preparePlaceholderText('address Line 2')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Pincode" name="applicationType" rules={[validateRequiredSelectField('application type')]}>
                                <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} maxLength={50} placeholder={preparePlaceholderText('pincode')}>
                                    <Option>select</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Tehsil" name="applicationName" rules={[validateRequiredInputField('application name'), validateAlphanumericWithSpace('application name')]}>
                                <Input disabled={isFieldDisable} maxLength={50} placeholder={preparePlaceholderText('tehsil')} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="City" name="applicationName" rules={[validateRequiredInputField('application name'), validateAlphanumericWithSpace('application name')]}>
                                <Input disabled={isFieldDisable} maxLength={50} placeholder={preparePlaceholderText('city')} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="District" name="applicationName" rules={[validateRequiredInputField('application name'), validateAlphanumericWithSpace('application name')]}>
                                <Input disabled={isFieldDisable} maxLength={50} placeholder={preparePlaceholderText('district')} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="State" name="applicationName" rules={[validateRequiredInputField('application name'), validateAlphanumericWithSpace('application name')]}>
                                <Input disabled={isFieldDisable} maxLength={50} placeholder={preparePlaceholderText('state')} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Contact Name" name="applicationName" rules={[validateRequiredInputField('application name'), validateAlphanumericWithSpace('application name')]}>
                                <Input disabled={isFieldDisable} maxLength={50} placeholder={preparePlaceholderText('contact name')} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Contact Name" name="applicationName" rules={[validateRequiredInputField('application name'), validateAlphanumericWithSpace('application name')]}>
                                <Input disabled={isFieldDisable} maxLength={50} placeholder={preparePlaceholderText('contact name')} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Panel>
        </Collapse>
    );
};

export default Address;
