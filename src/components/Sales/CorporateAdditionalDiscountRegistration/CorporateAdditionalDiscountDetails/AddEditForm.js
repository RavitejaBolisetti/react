/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, DatePicker, Divider, Card, Space, Switch } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { prepareDatePickerText, preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

const AddEditFormMain = (props) => {
    const { formData } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Card style={{ backgroundColor: '#f2f2f2' }}>
                            <Row gutter={20} className={styles.drawerBody}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.countryCode} label={'AO' || translateContent('city.label.countryCode')} name="countryCode" placeholder={preparePlaceholderSelect('AO' || translateContent('city.placeholder.country'))} rules={[validateRequiredInputField(translateContent('city.validation.country'))]}>
                                        <Input placeholder={preparePlaceholderText('AO' || translateContent('city.placeholder.cityCode'))} maxLength={6} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Parent Name' || translateContent('city.label.districtName')} initialValue={formData?.districtCode} name="districtCode" rules={[validateRequiredSelectField('Parent Name' || translateContent('city.validation.districtName'))]}>
                                        <Input placeholder={preparePlaceholderText('Parent Name' || translateContent('city.placeholder.cityCode'))} maxLength={6} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Parent code' || translateContent('city.label.stateName')} initialValue={formData?.stateCode} name="stateCode" rules={[validateRequiredSelectField('Parent code' || translateContent('city.validation.stateName'))]} >
                                        <Input placeholder={preparePlaceholderText('Parent code' || translateContent('city.placeholder.cityCode'))} disabled={true}/>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Segment' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('Segment' || translateContent('city.validation.cityName'))]} name="name">
                                        <Input placeholder={preparePlaceholderText('Segment' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Model Group' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('Model Group' || 'city.validation.cityName'))]} name="name">
                                        <Input placeholder={preparePlaceholderText('Model Group' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Variant' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('Variant' || 'city.validation.cityName'))]} name="name">
                                        <Input placeholder={preparePlaceholderText('Variant' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Model Code' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('Model Code' || 'city.validation.cityName'))]} name="name">
                                        <Input placeholder={preparePlaceholderText('Model Code' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Corporate Code' || translateContent('configurableParameter.label.fromDate')} name="fromDate" rules={[validateRequiredInputField('Corporate Code' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <Input placeholder={preparePlaceholderText('Corporate Code' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Quantity' || translateContent('configurableParameter.label.fromDate')} name="fromDate" rules={[validateRequiredInputField('Quantity' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <Input placeholder={preparePlaceholderText('Quantity' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Consumed Quantity' || translateContent('configurableParameter.label.fromDate')} name="fromDate" rules={[validateRequiredInputField('Quantity' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <Input placeholder={preparePlaceholderText('Consumed Quantity' || translateContent('city.placeholder.cityName'))} maxLength={50} disabled={true}/>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Valid To' || translateContent('configurableParameter.label.fromDate')} name="fromDate" rules={[validateRequiredInputField('Valid To' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <DatePicker format={dateFormat} placeholder={'Valid To' || prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item label={'REG Disc' || translateContent('configurableParameter.label.fromDate')} name="fromDate" rules={[validateRequiredInputField('REG Disc' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <Input placeholder={preparePlaceholderText('REG Disc' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Add Disc' || translateContent('configurableParameter.label.fromDate')} name="fromDate" rules={[validateRequiredInputField('Add Disc' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <Input placeholder={preparePlaceholderText('Add Disc' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Cost Center' || translateContent('configurableParameter.label.fromDate')} name="fromDate" rules={[validateRequiredInputField('Cost Center' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <Input placeholder={preparePlaceholderText('Cost Center' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                    </Form.Item>
                                </Col>

                            </Row>



                            {/* <DrawerFormButton {...buttonProps} /> */}
                        </Card>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
