import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, DatePicker, Space, Collapse, Typography, Card } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';
// const { Text } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;
// const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onCloseAction, isViewModeVisible, setIsViewModeVisible,formActionType } = props;
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

    // const onFinishCustomerInformation = (values) => {
    //     setFinalFormData({ ...FinalFormData, customerForm: values });
    // };
    // const onFinshkeyAccount = (values) => {
    //     setFinalFormData({ ...FinalFormData, keyAccountForm: values });
    // };
    // const onFinishAuthorityDetails = (values) => {
    //     setFinalFormData({ ...FinalFormData, authorityForm: values });
    // };
    // const sameAsBookingCustomer = (e) => {
    //     console.log(`checked = ${e.target.checked}`);
    //     setIsBookingCustomer(e.target.checked);
    // };

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
                            <Card style={{ backgroundColor: '#f2f2f2' }}>
                                <Form autoComplete="off" layout="vertical" form={customerForm}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={''} label="Insurance Company" name="2" rules={[validateRequiredInputField('Insurance Company')]}>
                                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Insurance Company')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={''} label="Insurance Cover Note" name="2" rules={[validateRequiredInputField('Insurance Cover Note')]}>
                                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Insurance Cover Note')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={''} label="Insurance Amount" name="3" rules={[validateRequiredInputField('Insurance Amount')]}>
                                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Insurance Amount')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={''} label="Date" name="4" rules={[validateRequiredInputField('Date')]}>
                                                <DatePicker className={styles.inputBox} placeholder={preparePlaceholderText('Date')} onChange={onChange} style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={''} label="Registration Number" name="3" rules={[validateRequiredInputField('Registration Number')]}>
                                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Registration Number')} />
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
