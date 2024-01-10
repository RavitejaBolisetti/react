/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, DatePicker, Card, Space, Collapse, Divider, Switch } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import { expandIcon } from 'utils/accordianExpandIcon';
import { validateRequiredInputField } from 'utils/validation';

const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { formData, onHandleSelect } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: true };
    const [openAccordian, setOpenAccordian] = useState(1);

    const financialYrData = [
        {
            key: '2',
            value: '2023 - 2024',
        },
        {
            key: '3',
            value: '2022 - 2023',
        },
    ];
    const requesterData = [
        {
            key: '2',
            value: 'Token 1',
        },
        {
            key: '3',
            value: 'Token 2',
        },
    ];
    const month = [
        { key: 'Jan', value: 'Jan' },
        { key: 'Feb', value: 'Feb' },
        { key: 'Mar', Mar: 'Mar' },
        { key: 'Apr', value: 'Apr' },
        { key: 'May', value: 'Apr' },
        { key: 'Jun', value: 'Jun' },
        { key: 'Jul', value: 'Jul' },
        { key: 'Aug', value: 'Aug' },
        { key: 'Sep', value: 'Sep' },
        { key: 'Oct', value: 'Oct' },
        { key: 'Nov', value: 'Nov' },
        { key: 'Dec', value: 'Dec' },
    ];

    const handleCollapse = (key) => {
        setOpenAccordian(key);
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Card>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="docNumber" label={'Doc Number'} initialValue={formData?.DocNumber}>
                                        <Input placeholder={preparePlaceholderText('Doc Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item label={'Doc Date'} name="DocDate" className={styles?.datePicker}>
                                        <DatePicker placeholder={preparePlaceholderSelect('Doc Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item  name="docStatus" label={'Doc Status'} initialValue={formData?.financierStatus}>
                                        <Switch value={formData?.active} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="evaluationNumber" label={'Evaluation Number'} initialValue={formData?.EvaluationNumber}>
                                        <Input placeholder={preparePlaceholderText('Evaluation Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="evaluationDate" label={'Evaluation Date'} initialValue={formData?.financierDate}>
                                    <DatePicker placeholder={preparePlaceholderSelect('Evaluation Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />

                                        {/* <Input placeholder={preparePlaceholderText('Evaluation Date')} maxLength={50} {...disabledProps} /> */}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="customerName" label={'Customer Name'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Customer Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="procuremantPrice" label={'Procuremant Price'} initialValue={formData?.financierPrice}>
                                        <Input placeholder={preparePlaceholderText('Procuremant Price')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="procurementDate" label={'Procurement Date'} initialValue={formData?.financierDate}>
                                    <DatePicker placeholder={preparePlaceholderSelect('Procurement Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                                        {/* <Input placeholder={preparePlaceholderText('Procurement Date')} maxLength={50} {...disabledProps} /> */}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="customerMobNumber" label={'Customer Mob. Number'} initialValue={formData?.RequestNumber}>
                                        <Input placeholder={preparePlaceholderText('Customer Mob. Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="productType" label={'Product Type'} initialValue={formData?.financierType}>
                                        <Input placeholder={preparePlaceholderText('Product Type')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="regNumber" label={'Reg. Number'} initialValue={formData?.RequestNumber}>
                                        <Input placeholder={preparePlaceholderText('Reg. Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="fuelType" label={'Fuel Type'} initialValue={formData?.financierType}>
                                        <Input placeholder={preparePlaceholderText('Fuel Type')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="make" label={'Make'} initialValue={formData?.make}>
                                        <Input placeholder={preparePlaceholderText('Make')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="mileage" label={'Mileage(KMS)'} initialValue={formData?.financier}>
                                        <Input placeholder={preparePlaceholderText('Mileage in KMs')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="varient" label={'Varient'} initialValue={formData?.varient}>
                                        <Input placeholder={preparePlaceholderText('Varient')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="model" label={'Model'} initialValue={formData?.model}>
                                        <Input placeholder={preparePlaceholderText('Model')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="yearofManufacturing" label={'Year of Manufacturing'} initialValue={formData?.YearofManufacturing}>
                                        <Input placeholder={preparePlaceholderText('Year of Manufacturing')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="monthofManufacturing" label={'Month of Manufacturing'} initialValue={formData?.monthofManufacturing}>
                                        <Input placeholder={preparePlaceholderText('Month of Manufacturing')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="color" label={'Color'} initialValue={formData?.color}>
                                        <Input placeholder={preparePlaceholderText('Color')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="euroVersion" label={'Euro Version'} initialValue={formData?.euroVersion}>
                                        <Input placeholder={preparePlaceholderText('Euro Version')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="yearofRegistration" label={'Year of Registration'} initialValue={formData?.YearofRegistration}>
                                        <Input placeholder={preparePlaceholderText('Year of Registration')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="monthofRegistration" label={'Month of Registration'} initialValue={formData?.monthofRegistration}>
                                        <Input placeholder={preparePlaceholderText('Month of Registration')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="chassisNumber" label={'Chassis Number'} initialValue={formData?.ChassisNumber}>
                                        <Input placeholder={preparePlaceholderText('Chassis Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="engineNumber" label={'Engine Number'} initialValue={formData?.EngineNumber}>
                                        <Input placeholder={preparePlaceholderText('Engine Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="sellingOffloadPrice" label={'Selling/Offload Price'} initialValue={formData?.sellingOffloadPrice}>
                                        <Input placeholder={preparePlaceholderText('Selling/Offload Price')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="sellingDate" label={'Selling Date'} initialValue={formData?.sellingDate}>
                                    <DatePicker placeholder={preparePlaceholderSelect('Selling Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                                        {/* <Input placeholder={preparePlaceholderText('Selling Date')} maxLength={50} {...disabledProps} /> */}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="sellingType" label={'Selling Type'} initialValue={formData?.sellingType}>
                                        <Input placeholder={preparePlaceholderText('Selling Type')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="bussinessAssosiateId" label={'Bussiness Assosiate Id'} initialValue={formData?.bussinessAssosiateId}>
                                        <Input placeholder={preparePlaceholderText('Bussiness Assosiate Id')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="bussinessAssosiateName" label={'Bussiness Assosiate Name'} initialValue={formData?.bussinessAssosiateName}>
                                        <Input placeholder={preparePlaceholderText('Bussiness Assosiate Name')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="brokerSource" label={'Broker Source'} initialValue={formData?.BrokerSource}>
                                        <Input placeholder={preparePlaceholderText('Broker Source')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="assosiateMobNo" label={'Assosiate Mob No'} initialValue={formData?.AssosiateMobNo}>
                                        <Input placeholder={preparePlaceholderText('Assosiate Mob No')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="form29cVahanAckNumber" label={'Form 29C Vahan Ack  Number'} initialValue={formData?.form29cVahanAckNumber}>
                                        <Input placeholder={preparePlaceholderText('Form 29C Vahan Ack  Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="brokerVahanAckNumber" label={'Broker Vahan Ack Number'} initialValue={formData?.BrokerVahanAckNumber}>
                                        <Input placeholder={preparePlaceholderText('Broker Vahan Ack Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                
                                {/* <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item label={'Request Date'} name="requestDate" className={styles?.datePicker}>
                                        <DatePicker placeholder={preparePlaceholderSelect('Request Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item initialValue={formData?.active} label="Status" name="isActive">
                                        <Switch value={formData?.active} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked {...disabledProps} />
                                    </Form.Item>
                                </Col> */}
                            </Row>
                        </Card>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
