/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Select, DatePicker, Card, Input, Checkbox, Switch } from 'antd';

import { convertCalenderDate } from 'utils/formatDateTime';

import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { disablePastDate } from 'utils/disableDate';

import styles from 'components/common/Common.module.css';

const AddEditFormMain = (props) => {
    const {
        formData,
        typeData,
        mnmCtcVehicleFlag,
        setMnmCtcVehicleFlag,
        isReadOnly = true,
        loginUserData: { userType = 'ADM' },
    } = props;
    const disabledProps = { disabled: isReadOnly };
    const handleOnChange = (e) => {
        if (e.target.checked) {
            setMnmCtcVehicleFlag(true);
        } else {
            setMnmCtcVehicleFlag(false);
        }
    };

    return (
        <Card className={styles.drawerCardView}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.mnfcWarrEndDate, 'YYYY/MM/DD')} label="Manufacturer Warranty End Date" name="mnfcWarrEndDate">
                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD" {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.deliveryDate, 'YYYY/MM/DD')} label="Delivery Date" name="deliveryDate">
                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD" {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.saleDate, 'YYYY/MM/DD')} label="Sale Date" name="saleDate">
                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD" {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="soldBy" label="Sold By" initialValue={formData?.soldBy}>
                        <Input maxLength={50} {...disabledProps} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="lastOdometerReading" label="Last Odometer Reading" initialValue={formData?.lastOdometerReading}>
                        <Input maxLength={50} {...disabledProps} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="averageRun" label="Average Run" initialValue={formData?.averageRun}>
                        <Input maxLength={50} {...disabledProps} {...disabledProps} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="nextDueService" label="Next Due Service" initialValue={formData?.nextDueService}>
                        <Input maxLength={50} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="relationshipManager" label="Relationship Manager" initialValue={formData?.relationshipManager}>
                        <Input maxLength={50} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.nextServiceDueDate, 'YYYY/MM/DD')} label="Next Service Due Date" name="nextServiceDueDate">
                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD" {...disabledProps} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.pucExpiryDate, 'YYYY/MM/DD')} label="PUC Expiry Date" name="pucExpiryDate">
                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD" {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.insuranceExpiryDate, 'YYYY/MM/DD')} label="Insurance Expiry Date" name="insuranceExpiryDate">
                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD" {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerCategorySsi" label="Customer Category-SSI" initialValue={formData?.customerCategorySsi}>
                        <Input maxLength={50} {...disabledProps} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerCategoryCsi" label="Customer Category-CSI" initialValue={formData?.customerCategoryCsi}>
                        <Input maxLength={50} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerCategoryIqs" label="Customer Category-IQS" initialValue={formData?.customerCategoryIqs}>
                        <Input maxLength={50} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.oemPrivilegeCustomer} valuePropName="checked" name="oemPrivilegeCustomer">
                        <Checkbox>OEM Priviledge Customer</Checkbox>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.keyAccountVehicle} valuePropName="checked" name="keyAccountVehicle">
                        <Checkbox {...disabledProps}>Key Account Vehicle</Checkbox>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.refurbished} valuePropName="checked" name="refurbished">
                        <Checkbox {...disabledProps}>Refurbished</Checkbox>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.theftVehicle} valuePropName="checked" name="theftVehicle">
                        <Checkbox {...disabledProps}>Theft Vihicle</Checkbox>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.pdiDone} valuePropName="checked" name="pdiDone">
                        <Checkbox {...disabledProps}>PDI Done</Checkbox>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.govtVehicle} valuePropName="checked" name="govtVehicle">
                        <Checkbox {...disabledProps}>Government Vehicle</Checkbox>
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="taxiOrNonTaxi" label="Taxi/Non Taxi" initialValue={formData?.taxiOrNonTaxi}>
                        <Input maxLength={50} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.mnmCtcVehicle} valuePropName="checked" name="mnmCtcVehicle" label="&nbsp;">
                        <Checkbox onClick={handleOnChange}>M&M CTC Vehicle</Checkbox>
                    </Form.Item>
                </Col>

                {mnmCtcVehicleFlag ||
                    (formData?.mnmCtcVehicle && (
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.manageBy} name="manageBy" label="Managed By">
                                <Select placeholder="Select" showSearch allowClear options={typeData['CTC_TYP']} fieldNames={{ label: 'value', value: 'key' }} />
                            </Form.Item>
                        </Col>
                    ))}
            </Row>
            {userType === 'ADM' && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <h4 className={styles.customHeading}> Below Fields to be shown for Mahindra users only</h4>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.warrantyBlocked} labelAlign="left" wrapperCol={{ span: 24 }} name="warrantyBlocked" label="Warranty Blocked" valuePropName="checked">
                            <Switch checkedChildren="Yes" unCheckedChildren="No" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="carePlus" label="Care Plus" initialValue={formData?.carePlus}>
                            <Input maxLength={50} {...disabledProps} />
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
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
