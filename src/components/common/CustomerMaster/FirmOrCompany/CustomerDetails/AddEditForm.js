import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, Space, Collapse, Divider, Card } from 'antd';
import { validateMobileNoField, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { FaRegUserCircle } from 'react-icons/fa';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewCompanyCustomerDetails';
import { memberShip } from 'constants/modules/CustomerMaster/individualProfile';

const { Option } = Select;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onCloseAction, isViewModeVisible, setIsViewModeVisible, formActionType } = props;
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
            {!formActionType?.viewMode ? (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card
                                header={
                                    <div className={styles.alignUser}>
                                        <FaRegUserCircle className={styles.userCircle} />
                                        <div style={{ paddingLeft: '10px', paddingTop: '3px' }}> Customer Information</div>
                                    </div>
                                }
                            >
                                <Form autoComplete="off" layout="vertical" form={customerForm}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Mobile Number" name="mobileNumber" data-testid="mobileNumber" rules={[validateMobileNoField('mobile number')]}>
                                                <Input placeholder={preparePlaceholderText('mobile number')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Customer Type" name="customerType" data-testid="customerType" rules={[validateRequiredSelectField('customer Type')]}>
                                                <Select placeholder="Select" disabled={false} loading={false} allowClear>
                                                    <Option value="customerType">Corporate</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Divider />
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Company Name" name="companyName" data-testid="companyName" rules={[validateRequiredInputField('company name')]}>
                                                <Input placeholder={preparePlaceholderText('company name')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Parent Company Code" name="parentCode" data-testid="parentCode" rules={[validateRequiredInputField('parent company code')]}>
                                                <Input placeholder={preparePlaceholderText('parent company code')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Parent Company Name" name="parentName" data-testid="parentName">
                                                <Input placeholder={preparePlaceholderText('parent company name')} disabled />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Divider />
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Corporate Type" name="corporateType" data-testid="corporateType">
                                                <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                    <Option value="corporateType">Listed</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Corporate Name" name="corporateName" data-testid="corporateName">
                                                <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                    <Option value="corporateName">Corporate ABC</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={222} label="Corporate Code" name="corporateCode" data-testid="corporate code">
                                                <Input placeholder={preparePlaceholderText('parent company name')} disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Corporate Category" name="corporateCategory" data-testid="corporateCategory">
                                                <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                    <Option value="corporateCategory">Corporate Category 1</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Membership Type" name="membershipType" data-testid="membershipType" rules={[validateRequiredSelectField('membership type')]}>
                                                <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                    {memberShip?.map((item) => (
                                                        <Option key={'memb' + item.key}>{item.name}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
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
