import React, { useState } from 'react';

import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { Col, Input, Form, Row, Select, Card } from 'antd';

const AddEditFormMain = (props) => {
    const { formActionType, formData, form, onFinishFailed, onFinish } = props;

    const viewProps = {
        styles,
    };

    return !formActionType?.viewMode ? (
        <Card style={{ marginBottom: '410px', backgroundColor: '#F2F2F2', borderRadius: '8px', marginBottom: '50px' }}>
            <Form form={form} autoComplete="off" layout="vertical" colon={false} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="customerId" label="Customer ID" initialValue={formData?.customerId} rules={[validateRequiredInputField('id')]}>
                            <Input maxLength={6} placeholder={preparePlaceholderText('id')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="customerName" label="Customer Name" initialValue={formData?.customerName}>
                            <Input disabled={true} placeholder={preparePlaceholderText('customer name')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="make" label="Make" initialValue={formData?.make} rules={[validateRequiredSelectField('Make')]}>
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                options={[{}]}
                                placeholder={preparePlaceholderSelect('make')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="modalGroup" label="Modal   Group" initialValue={formData?.modalGroup} rules={[validateRequiredSelectField('modalGroup')]}>
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                options={[{}]}
                                placeholder={preparePlaceholderSelect('Modal Group')}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="variant" label="Variant" initialValue={formData?.variant} rules={[validateRequiredInputField('variant')]}>
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                options={[{}]}
                                placeholder={preparePlaceholderSelect('variant')}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="oldRegNumber" label="Old Reg Number" initialValue={formData?.address} rules={[validateRequiredInputField('Old Reg Number')]}>
                            <Input placeholder={preparePlaceholderText('Old Reg Number')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="oldchessisnumber" label="Old Chessis Number" initialValue={formData?.oldchessisnumber} rules={[validateRequiredInputField('Old Chessis Number')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Old Chessis Number')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="relationship" label="Relationship" initialValue={formData?.relationship} rules={[validateRequiredSelectField('Relationship')]}>
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                options={[{}]}
                                placeholder={preparePlaceholderSelect('relationship')}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="monthofregistration" label="Month of Registration" initialValue={formData?.monthofregistration} rules={[validateRequiredSelectField('Month of Registration')]}>
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                options={[{}]}
                                placeholder={preparePlaceholderSelect('Month of Registration')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="yearofreg" label="Year of Registration" initialValue={formData?.yearofreg} rules={[validateRequiredInputField('year of reg')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Year of Registration')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="Usage" label="Usage" initialValue={formData?.Email} rules={[validateRequiredSelectField('Usage')]}>
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                options={[{}]}
                                placeholder={preparePlaceholderSelect('Usage')}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="schemeName" label="Scheme Name" initialValue={formData?.schemeName} rules={[validateRequiredSelectField('Scheme Name')]}>
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                options={[{}]}
                                placeholder={preparePlaceholderSelect('Scheme Name')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="schemeName" label="Scheme Name" initialValue={formData?.aadhar} rules={[validateRequiredInputField('Scheme Name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Scheme Name')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="km" label="KM" initialValue={formData?.km} rules={[validateRequiredInputField('km')]}>
                            <Input placeholder={preparePlaceholderText('km')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="customerExpectedPrice" label="Customer Expected Price" initialValue={formData?.drivingLicense} rules={[validateRequiredInputField('Customer Expected Price')]}>
                            <Input placeholder={preparePlaceholderText('Customer Expected Price')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="procurementPrice" label="Procurement Price" initialValue={formData?.procurementPrice} rules={[validateRequiredInputField('Procurement Price')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Procurement Price')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="financeCompany" label="Finance Company" initialValue={formData?.financeCompany} rules={[validateRequiredSelectField('Scheme Name')]}>
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                options={[{}]}
                                placeholder={preparePlaceholderSelect('Finance Company')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    ) : (
        <ViewDetail {...viewProps} />
    );
};

export const AddEditForm = AddEditFormMain;
