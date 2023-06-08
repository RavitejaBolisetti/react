import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse, Typography } from 'antd';
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
import { ViewDetail } from './ViewFinanceDetail';
const { Text, Link } = Typography;

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const attributeData = ['mh1', 'mh2', 'mh3', 'mh4'];
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

    const [handleActive, sethandleActive] = useState();
    const handleFormValueChange = () => {};
    const handleFormFieldChange = () => {};
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
            {!isViewModeVisible ? (
                // <Row gutter={20}>
                //     <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                //         <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                //             <Collapse
                //                 expandIcon={() => {
                //                     if (activeKey.includes(1)) {
                //                         return <MinusOutlined className={styles.iconsColor} />;
                //                     } else {
                //                         return <PlusOutlined className={styles.iconsColor} />;
                //                     }
                //                 }}
                //                 activeKey={activeKey}
                //                 onChange={() => onChange(1)}
                //                 expandIconPosition="end"
                //             >
                //                 <Panel
                //                     header={
                //                         <div className={styles.alignUser}>
                //                             <FaRegUserCircle className={styles.userCircle} />
                //                             <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                //                                 {' '}
                //                                 Finance Information
                //                             </Text>
                //                         </div>
                //                     }
                //                     key="1"
                //                 >
                //                     <Form autoComplete="off" layout="vertical" form={customerForm}>
                //                         <Row gutter={20}>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Financier" name="financier" data-testid="customerType" rules={[validateRequiredSelectField('customer Type')]}>
                //                                     <Select placeholder="Select" disabled={false} loading={false} allowClear>
                //                                         <Option value="financier1">HDFC</Option>
                //                                         <Option value="financier2">SBI</Option>

                //                                     </Select>
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Branch" name="branch" data-testid="corporateCode">
                //                                     <Input placeholder={preparePlaceholderText('branch')}></Input>
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="File Number" name="filenumber" data-testid="usageCategorization">
                //                                     <Input placeholder={preparePlaceholderText('file number')}></Input>
                //                                 </Form.Item>
                //                             </Col>
                //                         </Row>

                //                         <Row gutter={20}>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Loan Amount" name="loanamoount" data-testid="usageCategorization">
                //                                     <Input placeholder={preparePlaceholderText('loan amount')}></Input>
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="EMI" name="emi" data-testid="customerType">
                //                                     <Input placeholder={preparePlaceholderText('emi')}></Input>
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Finance Done" name="financedone" data-testid="CustomerCategory">
                //                                     <Select disabled={false} loading={false} placeholder="Select" allowClear>
                //                                         <Option value="financedone1">Yes</Option>
                //                                         <Option value="financedone2">No</Option>
                //                                     </Select>
                //                                 </Form.Item>
                //                             </Col>
                //                         </Row>
                //                         <Row gutter={20}>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="D.O. Recived" name="dorecived" data-testid="CustomerCategory">
                //                                     <Select disabled={false} loading={false} placeholder="Select" allowClear>
                //                                         <Option value="dorecived1">Yes</Option>
                //                                         <Option value="dorecived2">No</Option>
                //                                     </Select>
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="D.O. Number" name="donumber" data-testid="customerType">
                //                                     <Input placeholder={preparePlaceholderText('do number')}></Input>
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="D.O. Date" name="dodate" data-testid="CustomerCategory">
                //                                     <Input placeholder={preparePlaceholderText('do date')}></Input>
                //                                 </Form.Item>
                //                             </Col>
                //                         </Row>
                //                         <Row gutter={20}>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Finance Arranged By" name="arrangedby" data-testid="CustomerCategory">
                //                                     <Input placeholder={preparePlaceholderText('finance arranged by')}></Input>
                //                                 </Form.Item>
                //                             </Col>
                //                         </Row>
                //                     </Form>
                //                 </Panel>
                //             </Collapse>

                //             <Collapse
                //                 expandIcon={() => {
                //                     if (activeKey.includes(3)) {
                //                         return <MinusOutlined className={styles.iconsColor} />;
                //                     } else {
                //                         return <PlusOutlined className={styles.iconsColor} />;
                //                     }
                //                 }}
                //                 activeKey={activeKey}
                //                 onChange={() => onChange(3)}
                //                 expandIconPosition="end"
                //             >
                //                 <Panel
                //                     header={
                //                         <div className={styles.alignUser}>
                //                             <FaRegUserCircle className={styles.userCircle} />
                //                             <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                //                                 Invoice/Delivery Information
                //                             </Text>
                //                         </div>
                //                     }
                //                     key="3"
                //                 >
                //                     <Form autoComplete="off" layout="vertical" form={authorityForm}>
                //                         <Row gutter={20}>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Invoice/Delivery Type" name="delivery" data-testid="CustomerCategory">
                //                                     <Select disabled={false} loading={false} placeholder="Select" allowClear>
                //                                         <Option value="delivery1">Delivery Note</Option>
                //                                         <Option value="delivery2">Delivery Note1</Option>
                //                                     </Select>
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Invoice/Delivery No." name="deliverynumber">
                //                                     <Input placeholder={preparePlaceholderText('invoice/delivery no')} />
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Invoice/Delivery Date" name="deliverydate1">
                //                                     <Input placeholder={preparePlaceholderText('invoice/delivery date')} />
                //                                 </Form.Item>
                //                             </Col>
                //                         </Row>
                //                         <Row gutter={20}>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Invoice/Delivery Status" name="deliverystatus">
                //                                     <Input placeholder={preparePlaceholderText('invoice/delivery status')} />
                //                                 </Form.Item>
                //                             </Col>
                //                         </Row>
                //                     </Form>
                //                 </Panel>
                //             </Collapse>
                //             <Row gutter={20}>
                //                 <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                //                     <Button danger onClick={onCloseAction}>
                //                         Cancel
                //                     </Button>
                //                 </Col>
                //                 <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                //                     <Button type="primary" onClick={onFinish} className={styles.floatRight}>
                //                         Save & Proceed
                //                     </Button>
                //                 </Col>
                //             </Row>
                //         </Space>
                //     </Col>
                // </Row>
                <ViewDetail {...viewProps} />
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
