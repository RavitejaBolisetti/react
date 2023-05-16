import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';

import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { FaRegPlusSquare, FaPlus } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineClose } from 'react-icons/ai';
import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const FamilyDetailsMain = (props) => {
    const { form } = props;

    return (
        <>
            <Form form={form} id="myForm" autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="M&M Customer" name="applicationType" rules={[validateRequiredSelectField('application type')]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} maxLength={50} placeholder={preparePlaceholderText('pincode')} >
                                <Option>select</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Customer ID" name="customerId" rules={[validateRequiredInputField('Parent Firm/Company Code')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter Code')} className={styles.inputBox}/>
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Customer Name" name="customerName">
                            <Input maxLength={50} placeholder={preparePlaceholderText('Parent Concept')} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Relationship" name="relationship" rules={[validateRequiredInputField('application name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('tehsil')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Date of Birth" name="DOB" rules={[validateRequiredInputField('Date of Registration')]}>
                            <DatePicker format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} placeholder={preparePlaceholderSelect('Date of Registration')} className={styles.inputBox} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Age" name="age">
                            <Input maxLength={50} placeholder={preparePlaceholderText('Parent Concept')} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={100} xxl={100}>
                        <Form.Item label="Remark" name="remark" rules={[validateRequiredInputField('application name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('contact name')} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};
export const FamilyDetails = FamilyDetailsMain;
