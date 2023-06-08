import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, Space, Collapse, Typography, Checkbox } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { FaRegPlusSquare, FaPlus, FaRegUserCircle } from 'react-icons/fa';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';
const { Text, Link } = Typography;

const { Option } = Select;
const { TextArea } = Input;
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
    const [done, setDone] = useState();
    const [ isBookingCustomer, setIsBookingCustomer ] = useState(false);

    useEffect(() => {
        setFinalFormData({ ...FinalFormData, customerForm: customerFormValues, keyAccountForm: keyAccountFormValues, authorityForm: authorityFormValues });
    }, [done]);
    useEffect(() => {
        console.log('FinalFormData', FinalFormData);
    }, [FinalFormData]);

    const [activeKey, setactiveKey] = useState([1]);

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };
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
    const sameAsBookingCustomer = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setIsBookingCustomer(e.target.checked);
    }
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
                                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                Booking Customer
                                            </Text>
                                        </div>
                                    }
                                    key="1"
                                >
                                    <Form autoComplete="off" layout="vertical" form={customerForm}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="Customer ID" name="code" rules={[validateRequiredInputField('Customer ID')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('Customer ID')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="Customer Type" name="code" rules={[validateRequiredInputField('Customer Type')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('Customer Type')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="Mobile Number" name="code" rules={[validateRequiredInputField('Mobile Number')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('Mobile Number')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="Salutation" name="code" rules={[validateRequiredInputField('Salutation')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('Salutation')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="Customer Name" name="code" rules={[validateRequiredInputField('Customer Name')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('Customer Name')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="Address" name="code" rules={[validateRequiredInputField('Address')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('Address')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="City/District" name="code" rules={[validateRequiredInputField('City/District')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('City/District')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="State" name="code" rules={[validateRequiredInputField('State')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('State')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="PIN Code" name="code" rules={[validateRequiredInputField('PIN Code')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('PIN Code')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="Alternate Number" name="code" rules={[validateRequiredInputField('Alternate Number')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('Alternate Number')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="Email" name="code" rules={[validateRequiredInputField('Email')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('Email')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="PAN" name="code" rules={[validateRequiredInputField('PAN')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('PAN')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="Aadhar" name="code" rules={[validateRequiredInputField('Aadhar')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('Aadhar')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="GSTIN" name="code" rules={[validateRequiredInputField('GSTIN')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('GSTIN')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="Driving License" name="code" rules={[validateRequiredInputField('Driving License')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('Driving License')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="Trade License" name="code" rules={[validateRequiredInputField('Trade License')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('Trade License')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={0} label="Birthdate" name="code" rules={[validateRequiredInputField('Birthdate')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('Birthdate')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                {/* <Form.Item initialValue={editMode ? formData.status : true} label="Do you want to add Corporate Details" labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status">
                                                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                                                </Form.Item> */}
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
                                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                Bill To Customer
                                            </Text>
                                        </div>
                                    }
                                    key="2"
                                >
                                    <Checkbox onChange={sameAsBookingCustomer}>Same As Booking Customer</Checkbox>
                                    {
                                        !isBookingCustomer ?
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
                                        : <></>                                            
                                    }
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
