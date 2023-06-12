import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, Space, Collapse } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { FaRegUserCircle } from 'react-icons/fa';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewCompanyCustomerDetails';

const { Option } = Select;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onCloseAction, isViewModeVisible, setIsViewModeVisible } = props;
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
    const [customerCategory, setcustomerCategory] = useState();
    const [done, setDone] = useState();
    
    useEffect(() => {
        setFinalFormData({ ...FinalFormData, customerForm: customerFormValues, keyAccountForm: keyAccountFormValues, authorityForm: authorityFormValues });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [done]);

    const [activeKey, setactiveKey] = useState([1]);

    const handleCustomerCategory = (value) => {
        setcustomerCategory(value);
    };

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };

    const onFinish = () => {
        const customerFormValues = customerForm.getFieldsValue();
        const keyAccountFormValues = keyAccountForm.getFieldsValue();
        const authorityFormValues = authorityForm.getFieldsValue();
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
        onCloseAction,
        styles,
        handleEdit,
    };

    return (
        <>
            {!isViewModeVisible ? (
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
                                                    <Select placeholder="Select" disabled={false} loading={false} allowClear>
                                                        <Option value="customerType">customerType</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Corporate Code" name="corporateCode" data-testid="corporateCode">
                                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="corporateCode">customerType</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Corporate Type" name="corporateType" data-testid="corporateType">
                                                    <Select disabled={true} loading={false} placeholder="Select" allowClear>
                                                        <Option value="corporateCode">customerType</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Corporate Name" name="corporateName" data-testid="corporateName">
                                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="corporateCode">customerType</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Usage/Application Categorization" name="usageCategorization" data-testid="usageCategorization">
                                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="usageCategorization">usageCategorization</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Usage/Application Sub-category" name="usageCategorizationcategory" data-testid="customerType">
                                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="Usage/Application Sub-category">Usage/Application Sub-category</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Customer Category" name="CustomerCategory" data-testid="CustomerCategory">
                                                    <Select onChange={handleCustomerCategory} disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="Fleet">Fleet</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        {customerCategory && (
                                            <>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                        <Form.Item label="Business Details" name="businessdetails" data-testid="businessdetails">
                                                            <Input placeholder={preparePlaceholderText('business details')} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                        <Form.Item label="Vehicle Employment Details" name="vehicleemploymentdetails" data-testid="vehicleemploymentdetails">
                                                            <Input placeholder={preparePlaceholderText('deployment details')} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                        <Form.Item label="Key Role Details" name="keyroledetails" data-testid="keyroledetails">
                                                            <Input placeholder={preparePlaceholderText('role details')} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                        <Form.Item label="Major Route Details" name="majorroutedetails" data-testid="majorroutedetails">
                                                            <Input placeholder={preparePlaceholderText('major route details')} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </>
                                        )}
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

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Button danger onClick={onCloseAction}>
                                        Cancel
                                    </Button>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Button type="primary" onClick={onFinish} className={styles.floatRight}>
                                        Save & Proceed
                                    </Button>
                                </Col>
                            </Row>
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
