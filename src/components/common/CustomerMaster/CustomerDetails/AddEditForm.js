import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { PARAM_MASTER } from 'constants/paramMaster';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { FaRegPlusSquare, FaPlus, FaRegUserCircle } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineClose } from 'react-icons/ai';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
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
    const [authorityForm] = Form.useForm();
    const [FinalFormData, setFinalFormData] = useState({
        customerForm: [],
        keyAccountForm: [],
        authorityForm: [],
    });
    const [customerFormValues, setcustomerForm] = useState();
    const [keyAccountFormValues, setkeyAccountFormValues] = useState();
    const [authorityFormValues, setauthorityFormValues] = useState();
    const [done, setDone] = useState();
    useEffect(() => {
        setFinalFormData({ ...FinalFormData, customerForm: customerFormValues, keyAccountForm: keyAccountFormValues, authorityForm: authorityFormValues });
    }, [done]);
    useEffect(() => {
        console.log('FinalFormData', FinalFormData);
    }, [FinalFormData]);

    const [activeKey, setactiveKey] = useState([1]);

    const [handleActive, sethandleActive] = useState();
    const handleFormValueChange = () => {};
    const handleFormFieldChange = () => {};
    const onFinish = () => {
        const customerFormValues = customerForm.getFieldsValue();
        const keyAccountFormValues = keyAccountForm.getFieldsValue();

        const authorityFormValues = authorityForm.getFieldsValue();

        console.log('customerFormValues', customerFormValues, 'keyAccountFormValues', keyAccountFormValues, 'authorityFormValues', authorityFormValues);

        customerForm
            .validateFields()
            .then(() => {
                authorityForm
                    .validateFields()
                    .then(() => {
                        setcustomerForm(customerFormValues);
                        setauthorityFormValues(authorityFormValues);
                        setkeyAccountFormValues(keyAccountFormValues);
                        setDone(!done);
                    })
                    .catch(() => {
                        console.log('error');
                        setactiveKey([3]);
                    });
            })
            .catch(() => {
                setactiveKey([1]);
            });
    };
    const onFinishFailed = () => {
        customerForm.validateFields();
        keyAccountForm.validateFields();
        authorityForm.validateFields();
    };
    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.filter((item) => {
                if (item != values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
        console.log('values', values);
    };

    const onFinishCustomerInformation = (values) => {
        setFinalFormData({ ...FinalFormData, customerForm: values });
    };
    const onFinshkeyAccount = (values) => {
        setFinalFormData({ ...FinalFormData, keyAccountForm: values });
    };
    const onFinishAuthorityDetails = (values) => {
        setFinalFormData({ ...FinalFormData, authorityForm: values });
    };

    return (
        <>
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
                                        <div style={{ paddingLeft: '10px', paddingTop: '3px' }}> Customer Information</div>
                                    </div>
                                }
                                key="1"
                            >
                                <Form autoComplete="off" layout="vertical" form={customerForm}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Customer Type" name="customerType" data-testid="customerType" rules={[validateRequiredSelectField('customer Type')]}>
                                                <Select placeholder="Select" disabled={false} showSearch loading={false} allowClear>
                                                    <Option value="customerType">customerType</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Corporate Code" name="corporateCode" data-testid="corporateCode">
                                                <Select disabled={false} showSearch loading={false} placeholder="Select" allowClear>
                                                    <Option value="corporateCode">customerType</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Usage/Application Categorization" name="usageCategorization" data-testid="usageCategorization">
                                                <Select disabled={false} showSearch loading={false} placeholder="Select" allowClear>
                                                    <Option value="usageCategorization">usageCategorization</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Usage/Application Sub-category" name="usageCategorizationcategory" data-testid="customerType">
                                                <Select disabled={false} showSearch loading={false} placeholder="Select" allowClear>
                                                    <Option value="Usage/Application Sub-category">Usage/Application Sub-category</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Customer Category" name="CustomerCategory" data-testid="CustomerCategory">
                                                <Select disabled={false} showSearch loading={false} placeholder="Select" allowClear>
                                                    <Option value="CustomerCategory">CustomerCategory</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
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
                                        <div style={{ paddingLeft: '10px', paddingTop: '3px' }}>Key Account details</div>
                                    </div>
                                }
                                key="2"
                            >
                                <Form autoComplete="off" layout="vertical" form={keyAccountForm}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Account Code" name="accountCode">
                                                <Input disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Account Name" name="accountName">
                                                <Input disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Account Segment" name="accountSegment">
                                                <Input disabled />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Account Client Name" name="accountClientName">
                                                <Input disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Account Mapping Date" name="accountMappingDate">
                                                <Input disabled />
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
                                        <div style={{ paddingLeft: '10px', paddingTop: '3px' }}>Authority details</div>
                                    </div>
                                }
                                key="3"
                            >
                                <Form autoComplete="off" layout="vertical" form={authorityForm}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item
                                                label="Name of  Person"
                                                name="personName"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input placeholder={preparePlaceholderText('name')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Position" name="postion">
                                                <Input placeholder={preparePlaceholderText('position')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Company Name" name="companyName">
                                                <Input placeholder={preparePlaceholderText('company name')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Form.Item name="remarks" label="Remarks">
                                                <Input.TextArea placeholder={preparePlaceholderText('remarks')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Panel>
                        </Collapse>

                        <Button type="primary" onClick={onFinish}>
                            Save & Proceed
                        </Button>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
