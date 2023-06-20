/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Select, DatePicker, Row, Col, Button, Form } from 'antd';

import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import { GetAge } from 'utils/getAge';
import dayjs from 'dayjs';

import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { TextArea, Search } = Input;

const FormBase = (props) => {
    const { customerType, onSave, form, onChange, editedId, relationData, onSearch } = props;

    const type = [
        { name: 'Yes', key: 'Yes', value: 'Yes' },
        { name: 'No', key: 'No', value: 'No' },
    ];

    let customer;
    if (customerType === 'Yes') {
        customer = true;
    } else if (customerType === 'No') {
        customer = false;
    }

    const onDateChange = (prop) => {
        let dateString = dayjs(prop).format('YYYY-MM-DD');
        let calAge1 = GetAge(dateString);
        form.setFieldsValue({
            relationAge: calAge1,
        });
    };

    const getRelationCode = (props) => {
        form.setFieldsValue({
            relationCode: props,
        });
    };

    const disableFutureDate = (value) => {
        return value > new Date();
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={'Yes'} label="M&M Customer" name="mnmCustomer" rules={[validateRequiredSelectField('M&M Customer')]}>
                        <Select placeholder={preparePlaceholderText('M&M Customer')} onChange={onChange} className={styles.inputBox} allowClear>
                            {type?.map((item) => (
                                <Option key={'mc' + item?.key} value={item?.value}>
                                    {item?.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                {customer ? (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={null} label="Customer Id" name="relationCustomerId">
                            <Search placeholder={preparePlaceholderText('Customer Id')} onSearch={onSearch} enterButton />
                        </Form.Item>
                    </Col>
                ) : null}

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={null} label="Customer Name" name="customerName" rules={[validateRequiredInputField('Customer Name')]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText('Customer Name')} disabled={customer} className={styles.inputBox} />
                    </Form.Item>
                </Col>
                {!customer ? (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={null} label="Relationship" name="relationship" rules={[validateRequiredSelectField('Relationship')]}>
                            <Select placeholder={preparePlaceholderText('Relationship')} className={styles.inputBox} allowClear disabled={customer} onChange={getRelationCode}>
                                {relationData?.map((item) => (
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
                        <Form.Item initialValue={null} label="Relationship" name="relationship" rules={[validateRequiredSelectField('Relationship')]}>
                            <Select placeholder={preparePlaceholderText('Relationship')} className={styles.inputBox} allowClear disabled={customer} onChange={getRelationCode}>
                                {relationData?.map((item) => (
                                    <Option key={'rel' + item?.key} value={item.key}>
                                        {item?.value}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                ) : null}
                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item label="Relation Code" name="relationCode" />
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Date of Birth" name="dateOfBirth" rules={[validateRequiredInputField('Date of Birth')]}>
                        <DatePicker format="YYYY-MM-DD" onChange={onDateChange} disabledDate={disableFutureDate} style={{ display: 'auto', width: '100%' }} disabled={customer} placeholder={preparePlaceholderSelect('Date of Birth')} className={styles.inputBox} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Age" name="relationAge" rules={[validateRequiredInputField('Age')]}>
                        <Input placeholder={preparePlaceholderText('Age')} className={styles.inputBox} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item label="Remark" name="remarks">
                        <TextArea rows={2} maxLength={250} placeholder={preparePlaceholderText('Remark')} disabled={customer} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item initialValue={editedId} label="Generated ID" name="editedId" />
                </Col>

                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item initialValue={props?.id ? props?.id : null} label="ID" name="id" />
                </Col>

                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item initialValue={'CUS1686811036620'} label="Customer Id" name="customerId" />
                </Col>
            </Row>

            <Row style={{ display: 'flex' }}>
                <Button type="primary" onClick={() => onSave(props)}>
                    Save
                </Button>

                <Button type="primary" style={{ margin: '0 0 0 1rem' }}>
                    Reset
                </Button>
            </Row>
        </>
    );
};

export const FormContainer = FormBase;
