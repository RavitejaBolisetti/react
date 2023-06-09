import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, DatePicker, Space, Collapse, Typography } from 'antd';
import { validateRequiredInputField,validateRequiredSelectField} from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetails';
const { Text } = Typography;
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

    const schemeType = [{code:'hey'},{code:'bud'}]

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
                                            {/* <FaRegUserCircle className={styles.userCircle} /> */}
                                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                Scheme
                                            </Text>
                                        </div>
                                    }
                                    key="1"
                                >
                                    <Form autoComplete="off" layout="vertical" form={customerForm}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={''} label="Scheme Type" name="1" rules={[validateRequiredSelectField('Scheme Type')]}>
                                                    <Select
                                                        placeholder={preparePlaceholderSelect('Scheme Type')}
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        // onChange={parentName}
                                                        // disabled={editMode}
                                                    >
                                                        {schemeType?.map((item) => {
                                                            return <Option value={item?.code}>{item?.code}</Option>;
                                                        })}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={''} label="Scheme Category" name="2" rules={[validateRequiredInputField('Scheme Category')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('Scheme Category')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={''} label="Amount" name="3" rules={[validateRequiredInputField('Amount')]}>
                                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('Amount')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={''} label="Valid From" name="4" rules={[validateRequiredInputField('Valid From')]}>
                                                    <DatePicker className={styles.inputBox} placeholder={preparePlaceholderText('Valid From')} onChange={onChange} style={{width:'100%'}} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={''} label="Valid To" name="5" rules={[validateRequiredInputField('Valid To')]}>
                                                    <DatePicker className={styles.inputBox} placeholder={preparePlaceholderText('Valid To')} onChange={onChange} style={{width:'100%'}} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Form.Item initialValue={''} label="Description" name="6" rules={[validateRequiredInputField('Description')]}>
                                                    <TextArea className={styles.inputBox} placeholder={preparePlaceholderText('Description')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Panel>
                            </Collapse>

                            {/* <Row gutter={20}>
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
                            </Row> */}
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
