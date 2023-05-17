import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { PARAM_MASTER } from 'constants/paramMaster';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { FaRegPlusSquare, FaPlus, FaRegUserCircle } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineClose } from 'react-icons/ai';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { MinusBorderedIcon, PlusBorderedIcon } from 'Icons';

import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const attributeData = ['mh1', 'mh2', 'mh3', 'mh4'];
const AddEditFormMain = (props) => {
    const [customerForm] = Form.useForm();
    const [keyAccountForm] = Form.useForm();
    const [AuthorityForm] = Form.useForm();

    const [defaultActivekeyCollapse, setdefaultActivekeyCollapse] = useState(['1']);

    const handleFormValueChange = () => {};
    const handleFormFieldChange = () => {};
    const onFinish = () => {};
    const onFinishFailed = () => {
        customerForm.validateFields();
        keyAccountForm.validateFields();
        AuthorityForm.validateFields();
    };
    const onChange = (values) => {};

    const onFinishCustomerInformation = (values) => {};
    const onFinshkeyAccount = (values) => {};
    const onFinishAuthorityDetails = (values) => {};

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Collapse expandIcon={() => <PlusOutlined />} activeKey={defaultActivekeyCollapse} onChange={onChange} expandIconPosition="end">
                            <Panel
                                header={
                                    <>
                                        <FaRegUserCircle /> Customer Information
                                    </>
                                }
                                key="1"
                            >
                                <Form autoComplete="off" layout="vertical" form={customerForm} onFinish={onFinishCustomerInformation} onFinishFailed={onFinishFailed}>
                                    <Row>
                                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                            <Form.Item label="customer Type" name="customerType" data-testid="customerType" rules={[validateRequiredSelectField('customer Type')]}>
                                                <Select placeholder="Select" disabled={false} showSearch loading={false} allowClear>
                                                    <Option value="customerType">customerType</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                            <Form.Item label="Corporate Code" name="corporateCode" data-testid="corporateCode" rules={[validateRequiredSelectField('corporate Code')]}>
                                                <Select disabled={false} showSearch loading={false} placeholder="Select" allowClear>
                                                    <Option value="corporateCode">customerType</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Usage/Application Categorization" name="usageCategorization" data-testid="usageCategorization" rules={[validateRequiredSelectField('usageCategorization')]}>
                                                <Select disabled={false} showSearch loading={false} placeholder="Select" allowClear>
                                                    <Option value="usageCategorization">usageCategorization</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Usage/Application Sub-category" name="usageCategorizationcategory" data-testid="customerType" rules={[validateRequiredSelectField('Usage/Application Sub-category')]}>
                                                <Select disabled={false} showSearch loading={false} placeholder="Select what you want" allowClear>
                                                    <Option value="Usage/Application Sub-category">Usage/Application Sub-category</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Customer Category" name="CustomerCategory" data-testid="CustomerCategory" rules={[validateRequiredSelectField('Customer Category')]}>
                                                <Select disabled={false} showSearch loading={false} placeholder="Select" allowClear>
                                                    <Option value="CustomerCategory">CustomerCategory</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Panel>
                        </Collapse>

                        <Collapse expandIcon={() => <PlusOutlined />} activeKey={defaultActivekeyCollapse} onChange={onChange} expandIconPosition="end">
                            <Panel
                                header={
                                    <>
                                        <FaRegUserCircle /> Key Account details
                                    </>
                                }
                                key="2"
                            >
                                <Form autoComplete="off" layout="vertical" form={keyAccountForm} onFinish={onFinshkeyAccount} onFinishFailed={onFinishFailed}>
                                    <Row>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Account Code" name="accountCode" rules={[]}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Account Name" name="accountName" rules={[]}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Account Segment" name="accountSegment" rules={[]}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Account Client Name" name="accountClientName" rules={[]}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Account Mapping Date" name="accountMappingDate" rules={[]}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Panel>
                        </Collapse>

                        <Collapse expandIcon={() => <PlusOutlined />} activeKey={defaultActivekeyCollapse} onChange={onChange} expandIconPosition="end">
                            <Panel
                                header={
                                    <>
                                        <FaRegUserCircle /> Authority details
                                    </>
                                }
                                key="3"
                            >
                                <Form autoComplete="off" layout="vertical" form={AuthorityForm} onFinish={onFinishAuthorityDetails} onFinishFailed={onFinishFailed}>
                                    <Row>
                                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                            <Form.Item label="customer Type" name="customerType" data-testid="customerType" rules={[validateRequiredSelectField('customer Type')]}>
                                                <Select placeholder="Select" disabled={false} showSearch loading={false} allowClear>
                                                    <Option value="customerType">customerType</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                            <Form.Item label="Corporate Code" name="corporateCode" data-testid="corporateCode" rules={[validateRequiredSelectField('corporate Code')]}>
                                                <Select disabled={false} showSearch loading={false} placeholder="Select" allowClear>
                                                    <Option value="corporateCode">customerType</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Usage/Application Categorization" name="usageCategorization" data-testid="usageCategorization" rules={[validateRequiredSelectField('usageCategorization')]}>
                                                <Select disabled={false} showSearch loading={false} placeholder="Select" allowClear>
                                                    <Option value="usageCategorization">usageCategorization</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Usage/Application Sub-category" name="usageCategorizationcategory" data-testid="customerType" rules={[validateRequiredSelectField('Usage/Application Sub-category')]}>
                                                <Select disabled={false} showSearch loading={false} placeholder="Select what you want" allowClear>
                                                    <Option value="Usage/Application Sub-category">Usage/Application Sub-category</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Customer Category" name="CustomerCategory" data-testid="CustomerCategory" rules={[validateRequiredSelectField('Customer Category')]}>
                                                <Select disabled={false} showSearch loading={false} placeholder="Select" allowClear>
                                                    <Option value="CustomerCategory">CustomerCategory</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>

            <Button type="primary" htmlType="submit">
                Save & Proceed
            </Button>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
