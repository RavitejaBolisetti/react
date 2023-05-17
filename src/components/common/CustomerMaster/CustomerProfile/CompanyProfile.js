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
const CompanyProfileMain = (props) => {
    const { form } = props;

    return (
        <>
            <Form form={form} id="myForm" autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Firm/Company Name" name="firmName" rules={[validateRequiredInputField('Firm/Company Name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter Name')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Parent Firm/Company Code" name="companyCode" rules={[validateRequiredInputField('Parent Firm/Company Code')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter Code')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Parent Firm/Company Name" name="parentFirm" >
                            <Input maxLength={50} placeholder={preparePlaceholderText('Parent Concept')} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Pincode" name="applicationType" rules={[validateRequiredSelectField('application type')]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} maxLength={50} placeholder={preparePlaceholderText('pincode')}>
                                <Option>select</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Tehsil" name="applicationName" rules={[validateRequiredInputField('application name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('tehsil')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="City" name="applicationName" rules={[validateRequiredInputField('application name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('city')} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="District" name="applicationName" rules={[validateRequiredInputField('application name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('district')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="State" name="applicationName" rules={[validateRequiredInputField('application name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('state')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Contact Name" name="applicationName" rules={[validateRequiredInputField('application name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('contact name')} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Contact Name" name="applicationName" rules={[validateRequiredInputField('application name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('contact name')} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};
export const CompanyProfile = CompanyProfileMain;
