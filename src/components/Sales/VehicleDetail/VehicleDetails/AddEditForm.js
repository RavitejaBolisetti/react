/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Select, DatePicker, Input, Checkbox, Switch, Collapse, Divider } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { validateRequiredSelectField } from 'utils/validation';
import { disablePastDate } from 'utils/disableDate';
import { USER_TYPE } from 'constants/userType';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { form, formData, typeData, mnmCtcVehicleFlag, setMnmCtcVehicleFlag, isReadOnly = true, userType } = props;
    const disabledProps = { disabled: isReadOnly };

    const [activeKey, setactiveKey] = useState([1]);

    useEffect(() => {
        if (formData) {
            setMnmCtcVehicleFlag(formData?.mnmCtcVehicle);
            form.setFieldsValue({ ...formData, mnfcWarrEndDate: formattedCalendarDate(formData?.mnfcWarrEndDate), deliveryDate: formattedCalendarDate(formData?.deliveryDate), saleDate: formattedCalendarDate(formData?.saleDate), nextServiceDueDate: formattedCalendarDate(formData?.nextServiceDueDate), pucExpiryDate: formattedCalendarDate(formData?.pucExpiryDate), insuranceExpiryDate: formattedCalendarDate(formData?.insuranceExpiryDate) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleOnChange = (e) => {
        setMnmCtcVehicleFlag(e.target.checked);
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    return (
        <>
            <Collapse defaultActiveKey={['1']} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" collapsible="icon">
                <Panel header={translateContent('vehicleDetail.heading.mainTitle')} key="1">
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formattedCalendarDate(formData?.mnfcWarrEndDate)} label={translateContent('vehicleDetail.vehicledetails.label.mnfcWarrEndDate')} name="mnfcWarrEndDate">
                                <DatePicker disabledDate={disablePastDate} format={dateFormat} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.manufactureKM} label={translateContent('vehicleDetail.vehicledetails.label.manufactureKM')} name="manufactureKM">
                                <Input placeholder={preparePlaceholderText(translateContent('vehicleDetail.vehicledetails.label.manufactureKM'))} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formattedCalendarDate(formData?.deliveryDate)} label={translateContent('vehicleDetail.vehicledetails.label.deliveryDate')} name="deliveryDate">
                                <DatePicker disabledDate={disablePastDate} format={dateFormat} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formattedCalendarDate(formData?.saleDate)} label={translateContent('vehicleDetail.vehicledetails.label.saleDate')} name="saleDate">
                                <DatePicker disabledDate={disablePastDate} format={dateFormat} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="soldBy" label={translateContent('vehicleDetail.vehicledetails.label.soldBy')} initialValue={formData?.soldBy}>
                                <Input placeholder={preparePlaceholderText(translateContent('vehicleDetail.vehicledetails.label.soldBy'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="lastOdometerReading" label={translateContent('vehicleDetail.vehicledetails.label.lastOdometerReading')} initialValue={formData?.lastOdometerReading}>
                                <Input placeholder={preparePlaceholderText(translateContent('vehicleDetail.vehicledetails.label.lastOdometerReading'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="averageRun" label={translateContent('vehicleDetail.vehicledetails.label.averageRun')} initialValue={formData?.averageRun}>
                                <Input placeholder={preparePlaceholderText(translateContent('vehicleDetail.vehicledetails.label.averageRun'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="nextDueService" label={translateContent('vehicleDetail.vehicledetails.label.nextDueService')} initialValue={formData?.nextDueService}>
                                <Input placeholder={preparePlaceholderText(translateContent('vehicleDetail.vehicledetails.label.nextDueService'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="relationshipManager" label={translateContent('vehicleDetail.vehicledetails.label.relationshipManager')} initialValue={formData?.relationshipManager}>
                                <Input placeholder={preparePlaceholderText(translateContent('vehicleDetail.vehicledetails.label.relationshipManager'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formattedCalendarDate(formData?.nextServiceDueDate)} label={translateContent('vehicleDetail.vehicledetails.label.nextServiceDueDate')} name="nextServiceDueDate">
                                <DatePicker disabledDate={disablePastDate} format={dateFormat} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formattedCalendarDate(formData?.insuranceExpiryDate)} label={translateContent('vehicleDetail.vehicledetails.label.insuranceExpiryDate')} name="insuranceExpiryDate">
                                <DatePicker disabledDate={disablePastDate} format={dateFormat} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="customerCategorySsi" label={translateContent('vehicleDetail.vehicledetails.label.customerCategorySsi')} initialValue={formData?.customerCategorySsi}>
                                <Input placeholder={preparePlaceholderText(translateContent('vehicleDetail.vehicledetails.label.customerCategorySsi'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="customerCategoryCsi" label={translateContent('vehicleDetail.vehicledetails.label.customerCategoryCsi')} initialValue={formData?.customerCategoryCsi}>
                                <Input placeholder={preparePlaceholderText(translateContent('vehicleDetail.vehicledetails.label.customerCategoryCsi'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="customerCategoryIqs" label={translateContent('vehicleDetail.vehicledetails.label.customerCategoryIqs')} initialValue={formData?.customerCategoryIqs}>
                                <Input placeholder={preparePlaceholderText(translateContent('vehicleDetail.vehicledetails.label.customerCategoryIqs'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.taxiOrNonTaxiKey} name="taxiOrNonTaxiKey" label={translateContent('vehicleDetail.vehicledetails.label.taxiOrNonTaxiKey')}>
                                <Select placeholder={preparePlaceholderSelect(translateContent('vehicleDetail.vehicledetails.label.taxiOrNonTaxiKey'))} showSearch allowClear options={typeData?.['VEHCL_TYPE']} fieldNames={{ label: 'value', value: 'key' }} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={formData?.oemPrivilegeCustomer} valuePropName="checked" name="oemPrivilegeCustomer">
                                <Checkbox>{translateContent('vehicleDetail.vehicledetails.label.oemPrivilegeCustomer')}</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={formData?.keyAccountVehicle} valuePropName="checked" name="keyAccountVehicle">
                                <Checkbox disabled>{translateContent('vehicleDetail.vehicledetails.label.keyAccountVehicle')}</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={formData?.refurbished} valuePropName="checked" name="refurbished">
                                <Checkbox {...disabledProps}>{translateContent('vehicleDetail.vehicledetails.label.refurbished')}</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={formData?.theftVehicle} valuePropName="checked" name="theftVehicle">
                                <Checkbox {...disabledProps}>{translateContent('vehicleDetail.vehicledetails.label.theftVehicle')}</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={formData?.pdiDone} valuePropName="checked" name="pdiDone">
                                <Checkbox value={true} {...disabledProps}>
                                    {translateContent('vehicleDetail.vehicledetails.label.pdiDone')}
                                </Checkbox>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={formData?.govtVehicle} valuePropName="checked" name="govtVehicle">
                                <Checkbox {...disabledProps}>{translateContent('vehicleDetail.vehicledetails.label.govtVehicle')}</Checkbox>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={formData?.mnmCtcVehicle} valuePropName="checked" name="mnmCtcVehicle">
                                <Checkbox onClick={handleOnChange}>{translateContent('vehicleDetail.vehicledetails.label.mnmCtcVehicle')}</Checkbox>
                            </Form.Item>
                        </Col>

                        {mnmCtcVehicleFlag && (
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formData?.manageBy} rules={[validateRequiredSelectField(translateContent('vehicleDetail.vehicledetails.validation.managedBy'))]} name="manageBy" label={translateContent('vehicleDetail.vehicledetails.label.manageBy')}>
                                    <Select placeholder={translateContent('vehicleDetail.placeholder.select')} showSearch allowClear options={typeData['CTC_TYP']} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} />
                                </Form.Item>
                            </Col>
                        )}
                    </Row>
                    {userType === USER_TYPE?.ADMIN?.key && (
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <h4 className={styles.customHeading}>{translateContent('vehicleDetail.heading.mnmUserOnly')}</h4>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formData?.warrantyBlocked} labelAlign="left" wrapperCol={{ span: 24 }} name="warrantyBlocked" label="Warranty Blocked" valuePropName="checked">
                                    <Switch checkedChildren="Yes" unCheckedChildren="No" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item name="carePlus" label={translateContent('vehicleDetail.vehicledetails.label.carePlus')} initialValue={formData?.carePlus}>
                                    <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('vehicleDetail.vehicledetails.label.carePlus'))} {...disabledProps} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formData?.legal} labelAlign="left" wrapperCol={{ span: 24 }} name="legal" label="Legal" valuePropName="checked">
                                    <Switch checkedChildren="Yes" unCheckedChildren="No" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formData?.dealershipVehicle} labelAlign="left" wrapperCol={{ span: 24 }} name="dealershipVehicle" label="Dealership Vehicle" valuePropName="checked">
                                    <Switch checkedChildren="Yes" unCheckedChildren="No" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                                </Form.Item>
                            </Col>
                        </Row>
                    )}
                </Panel>
            </Collapse>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
