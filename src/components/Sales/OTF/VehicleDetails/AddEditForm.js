import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse, Typography, Divider } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { accordianExpandIcon, expandIcon } from 'utils/accordianExpandIcon';
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
const { Text, Link } = Typography;

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const attributeData = ['mh1', 'mh2', 'mh3', 'mh4'];

const AddEditFormMain = (props) => {
    const { onCloseAction, isViewModeVisible, formActionType, setIsViewModeVisible } = props;
    const [form] = Form.useForm();
    const [customerForm] = Form.useForm();
    const [keyAccountForm] = Form.useForm();
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [addButton, setAddButton] = useState(true);
    const [authorityForm] = Form.useForm();
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [openAccordian, setOpenAccordian] = useState();
    const [FinalFormData, setFinalFormData] = useState({
        customerForm: [],
        keyAccountForm: [],
        authorityForm: [],
    });
    const [customerFormValues, setcustomerForm] = useState();
    const [collapseView, setCollapseView] = useState(false);
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
    const handleEdit = () => {
        setIsViewModeVisible(false);
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
        setIsReadOnly(false);
    };
    const addContactHandeler = (e) => {
        // e.preventDefault();
        e.stopPropagation();
        form.resetFields();
        console.log('clicked');
        setShowAddEditForm(true);
        setOpenAccordian('2');
        setIsReadOnly(true);
    };

    const onHandleAddChange = () => {
        setCollapseView(true);
    };

    const onHandleResetButton = () => {
        keyAccountForm.resetFields();
    };

    const onFinish = () => {
        setShowAddEditForm(false);

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
                        <Space size="middle" direction="vertical" className={styles.accordianContainer}>
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
                                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                Vehicle Information
                                            </Text>
                                        </div>
                                    }
                                    key="1"
                                >
                                    <Divider />
                                    <Form autoComplete="off" layout="vertical" form={form}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Vehicle Usage Type" name="usageType" data-testid="usageType" rules={[validateRequiredSelectField('vehicle usage Type')]}>
                                                    <Select placeholder="Select" disabled={false} loading={false} allowClear>
                                                        <Option value="usageType">usageType</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Model" name="model" data-testid="model">
                                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="model">customerType</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Vehicle Variant" name="vehicleVariant" data-testid="vehicleVariant">
                                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="vehicleVariant">vehicleVariant</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Available Stock" name="availableStock" data-testid="availableStock">
                                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="availableStock">availableStock</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Vehicle Allocated Status" name="vehicleAllocatedStatus" data-testid="vehicleAllocatedStatus">
                                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="vehicleAllocatedStatus">vehicleAllocatedStatus</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="PO Number" name="poNumber">
                                                    <Input placeholder={preparePlaceholderText('PO Number')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="PO Date" name="poDate">
                                                    <Input placeholder={preparePlaceholderText('PO Date')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="PO Status" name="poStatus">
                                                    <Input placeholder={preparePlaceholderText('PO Status')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="SO Number" name="soNumber">
                                                    <Input placeholder={preparePlaceholderText('SO Number')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="SO Status" name="soStatus">
                                                    <Input placeholder={preparePlaceholderText('SO Status')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="VIN Number" name="vinNumber">
                                                    <Input placeholder={preparePlaceholderText('VIN number')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Discount Amount" name="discountAmount">
                                                    <Input placeholder={preparePlaceholderText('Discount Amount')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Vehicle Selling Price" name="vehicleSellingPrice">
                                                    <Input placeholder={preparePlaceholderText('Vehicle Selling Price')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Charge Amount" name="chargeAmount">
                                                    <Input placeholder={preparePlaceholderText('Charge Amount')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="OTF Amount" name="otfAmount">
                                                    <Input placeholder={preparePlaceholderText('OTF Amount')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Panel>
                            </Collapse>
                            <Collapse onChange={() => handleCollapse(2)} expandIconPosition="end" expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian}>
                                <Panel
                                    header={
                                        <div className={styles.alignUser}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                    Tax & Charges Information
                                                </Text>

                                                <Button onClick={addContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isReadOnly}>
                                                    Add
                                                </Button>
                                            </Col>
                                        </div>
                                    }
                                    key="2"
                                >
                                    <Divider />
                                    <Form autoComplete="off" layout="vertical" form={keyAccountForm}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Tax/Charges Type" name="type">
                                                    <Input placeholder={preparePlaceholderText('Type')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Tax/Charges Code" name="code">
                                                    <Input placeholder={preparePlaceholderText('Code')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Rate" name="rate">
                                                    <Input placeholder={preparePlaceholderText('Rate')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Rate Type" name="rateType">
                                                    <Input placeholder={preparePlaceholderText('Rate Type')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Form.Item label="Charge Description" name="description">
                                                    <TextArea placeholder={preparePlaceholderText('description')} showCount maxLength={100} autoSize={{ minRows: 2, maxRows: 5 }} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                <Button type="primary" onClick={onHandleAddChange}>
                                                    Add
                                                </Button>
                                                <Button danger onClick={onHandleResetButton}>
                                                    Reset
                                                </Button>
                                            </Col>
                                        </Row>

                                        <Collapse
                                            expandIcon={() => {
                                                if (activeKey.includes(4)) {
                                                    return <MinusOutlined className={styles.iconsColor} />;
                                                } else {
                                                    return <PlusOutlined className={styles.iconsColor} />;
                                                }
                                            }}
                                            activeKey={activeKey}
                                            onChange={() => onChange(4)}
                                            expandIconPosition="end"
                                        >
                                            
                                        </Collapse>
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
