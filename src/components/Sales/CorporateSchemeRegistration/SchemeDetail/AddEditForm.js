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
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.countryCode} label={'Zone' || translateContent('city.label.countryCode')} name="countryCode" placeholder={preparePlaceholderSelect('Zone' || translateContent('city.placeholder.country'))} rules={[validateRequiredInputField(translateContent('city.validation.country'))]}>
                                            <Input placeholder={preparePlaceholderText('Zone' || translateContent('city.placeholder.cityCode'))} maxLength={6}  />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={'Area Office' || translateContent('city.label.stateName')} initialValue={formData?.stateCode} name="stateCode" rules={[validateRequiredSelectField('Area Office' || translateContent('city.validation.stateName'))]}>
                                            <Input placeholder={preparePlaceholderText('Area Office' || translateContent('city.placeholder.cityCode'))}  />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={'Dealer Code' || translateContent('city.label.districtName')} initialValue={formData?.districtCode} name="districtCode" rules={[validateRequiredSelectField('Dealer Code' || translateContent('city.validation.districtName'))]}>
                                            <Input placeholder={preparePlaceholderText('Dealer Code' || translateContent('city.placeholder.cityCode'))} maxLength={6}  />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={'Corporate Category' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('Corporate Category' || translateContent('city.validation.cityName'))]} name="name">
                                            <Input placeholder={preparePlaceholderText('Corporate Category' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={'Dealer Amount' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('Dealer Amount' || 'city.validation.cityName'))]} name="name">
                                            <Input placeholder={preparePlaceholderText('Dealer Amount' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={'OEM Amount' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('OEM Amount' || 'city.validation.cityName'))]} name="name">
                                            <Input placeholder={preparePlaceholderText('OEM Amount' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={'Total Amount' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('Total Amount' || 'city.validation.cityName'))]} name="name">
                                            <Input placeholder={preparePlaceholderText('Total Amount' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={'Valid From' || translateContent('configurableParameter.label.fromDate')} name="fromDate" rules={[validateRequiredInputField('Valid From' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                            <DatePicker format={dateFormat} placeholder={'Valid From' || prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={'Valid To' || translateContent('configurableParameter.label.fromDate')} name="fromDate" rules={[validateRequiredInputField('Valid To' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                            <DatePicker format={dateFormat} placeholder={'Valid To' || prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item initialValue={formData?.active} label="Status" name="isActive">
                                            <Switch value={formData?.active} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={true} />
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
