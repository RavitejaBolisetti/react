/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Input, Select, DatePicker, Row, Col, Button, Form } from 'antd';

import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { YES_NO_FLAG } from 'constants/yesNoFlag';
import { GetAge } from 'utils/getAge';
import { disableFutureDate } from 'utils/disableDate';
import { dateFormat, formatDate } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Option } = Select;
const { TextArea, Search } = Input;

const FormBase = (props) => {
    const { customerType, onSave, form, onChange, relationData, onSearch, isSearchLoading, onCancel, showForm, initialVal, editedValues } = props;

    const [customer, setCustomer] = useState(null);

    const onDateChange = (prop) => {
        let dateString = formatDate(prop);
        let calAge1 = GetAge(dateString);
        if (prop === null) {
            form.setFieldsValue({
                relationAge: null,
            });
        } else {
            form.setFieldsValue({
                relationAge: calAge1,
            });
        }
    };

    const getRelationCode = (props) => {
        let relationCode = relationData?.REL_TYPE?.find((e) => e.value === props);
        form.setFieldsValue({
            relationCode: relationCode?.key,
        });
    };

    useEffect(() => {
        if (showForm) {
            form.resetFields();
        } else if (customerType === initialVal) {
            form.setFieldsValue(editedValues);
        } else {
            form.setFieldsValue({
                customerName: null,
                relationship: null,
                relationCode: null,
                dateOfBirth: null,
                relationAge: null,
                remarks: null,
            });
        }

        if (customerType === YES_NO_FLAG?.YES?.key) {
            setCustomer(true);
        } else if (customerType === YES_NO_FLAG?.NO?.key) {
            setCustomer(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerType]);

    return (
        <div>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={customerType} label={translateContent('customerMaster.label.mCustomer')} name="mnmCustomer" rules={[validateRequiredSelectField(translateContent('customerMaster.validation.customer'))]}>
                        <Select placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.mCustomer'))} onChange={onChange}>
                            {relationData?.YES_NO_FLG?.map((item) => (
                                <Option key={'yn' + item?.key} value={item.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                {customer ? (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={props?.relationCustomerId ? props?.relationCustomerId : ''} label={translateContent('customerMaster.label.cusId')} name="relationCustomerId">
                            <Search placeholder={translateContent('customerMaster.placeholder.cusId')} allowClear loading={isSearchLoading} onSearch={onSearch} />
                        </Form.Item>
                    </Col>
                ) : (
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item initialValue={props?.relationCustomerId ? props?.relationCustomerId : ''} label={translateContent('customerMaster.label.cusId')} name="relationCustomerId">
                            <Search placeholder={translateContent('customerMaster.placeholder.cusId')} allowClear loading={isSearchLoading} onSearch={onSearch} />
                        </Form.Item>
                    </Col>
                )}

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={null} label={translateContent('customerMaster.label.cusName')} name="customerName" rules={[validateRequiredInputField(translateContent('customerMaster.validation.cusName'))]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.cusName'))} disabled={customer} />
                    </Form.Item>
                </Col>
                {!customer ? (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={null} label={translateContent('customerMaster.label.relationship')} name="relationship" rules={[validateRequiredSelectField(translateContent('customerMaster.validation.relationship'))]}>
                            <Select placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.relationship'))} allowClear onChange={getRelationCode}>
                                {relationData?.REL_TYPE?.map((item) => (
                                    <Option key={'rel' + item?.key} value={item.value}>
                                        {item?.value}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                ) : null}
            </Row>

            <Row gutter={20}>
                {customer ? (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={null} label={translateContent('customerMaster.label.relationship')} name="relationship" rules={[validateRequiredSelectField(translateContent('customerMaster.validation.relationship'))]}>
                            <Select placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.relationship'))} allowClear onChange={getRelationCode}>
                                {relationData?.REL_TYPE?.map((item) => (
                                    <Option key={'rel' + item?.key} value={item.value}>
                                        {item?.value}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                ) : null}
                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item label={translateContent('customerMaster.label.relationCode')} name="relationCode" />
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('customerMaster.label.birth')} name="dateOfBirth" rules={[validateRequiredInputField(translateContent('customerMaster.validation.dob'))]}>
                        <DatePicker format={dateFormat} onChange={onDateChange} disabledDate={disableFutureDate} disabled={customer} placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.dateOfBirth'))} getPopupContainer={(triggerNode) => triggerNode.parentElement} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('customerMaster.label.age')} name="relationAge" rules={[validateRequiredInputField(translateContent('customerMaster.validation.age'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.age'))} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item label={translateContent('customerMaster.label.remark')} name="remarks">
                        <TextArea maxLength={300} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.remark'))} disabled={customer} showCount />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item initialValue={props?.editedId ? props?.editedId : ''} label={translateContent('customerMaster.label.generatedID')} name="editedId" />
                </Col>

                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item initialValue={props?.id ? props?.id : ''} label={translateContent('customerMaster.label.iD')} name="id" />
                </Col>

                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item initialValue={props?.customerId ? props?.customerId : ''} label={translateContent('customerMaster.label.customerId')} name="customerId" />
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={`${styles.buttonsGroupLeft} ${styles.marB20}`}>
                    <Button
                        type="primary"
                        onClick={() => {
                            onSave();
                        }}
                    >
                        {translateContent('global.buttons.save')}
                    </Button>
                    <Button onClick={onCancel} danger>
                        {translateContent('global.buttons.cancel')}
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export const FormContainer = FormBase;
