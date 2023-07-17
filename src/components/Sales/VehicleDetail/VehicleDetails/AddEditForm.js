/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, Select, DatePicker, Card, Input, Checkbox, Switch } from 'antd';

import { convertCalenderDate } from 'utils/formatDateTime';

import { validateRequiredSelectField } from 'utils/validation';
import { disablePastDate } from 'utils/disableDate';
import { USER_TYPE } from 'constants/userType';
import { convertDateToCalender } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';

const AddEditFormMain = (props) => {
    const {
        form,
        formData,
        typeData,
        mnmCtcVehicleFlag,
        setMnmCtcVehicleFlag,
        isReadOnly = true,
        userType,
    } = props;
    const disabledProps = { disabled: isReadOnly };

    useEffect(() => {
        if (formData) {
            setMnmCtcVehicleFlag(formData?.mnmCtcVehicle);
            form.setFieldsValue({ ...formData, mnfcWarrEndDate: convertDateToCalender(formData?.mnfcWarrEndDate), deliveryDate: convertDateToCalender(formData?.deliveryDate), saleDate: convertDateToCalender(formData?.saleDate), nextServiceDueDate: convertDateToCalender(formData?.nextServiceDueDate), pucExpiryDate: convertDateToCalender(formData?.pucExpiryDate), insuranceExpiryDate: convertDateToCalender(formData?.insuranceExpiryDate) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleOnChange = (e) => {
        setMnmCtcVehicleFlag(e.target.checked);
    };

    return (
        <Card className={styles.drawerCardView}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.mnfcWarrEndDate, 'YYYY/MM/DD')} label="Manufacturer Warranty End Date" name="mnfcWarrEndDate">
                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD" {...disabledProps} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.deliveryDate, 'YYYY/MM/DD')} label="Delivery Date" name="deliveryDate">
                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD" {...disabledProps} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.saleDate, 'YYYY/MM/DD')} label="Sale Date" name="saleDate">
                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD" {...disabledProps} style={{ display: 'auto', width: '100%' }} />
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
                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD" {...disabledProps} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.pucExpiryDate, 'YYYY/MM/DD')} label="PUC Expiry Date" name="pucExpiryDate">
                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD" {...disabledProps} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.insuranceExpiryDate, 'YYYY/MM/DD')} label="Insurance Expiry Date" name="insuranceExpiryDate">
                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD" {...disabledProps} style={{ display: 'auto', width: '100%' }} />
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
                {/* <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="taxiOrNonTaxi" label="Taxi/Non Taxi" initialValue={formData?.taxiOrNonTaxi}>
                        <Input maxLength={50} {...disabledProps} />
                    </Form.Item>
                </Col> */}

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.taxiOrNonTaxiKey} name="taxiOrNonTaxiKey" label="Taxi/Non Taxi">
                        <Select placeholder="Select" showSearch allowClear options={typeData['VEHCL_TYPE']} fieldNames={{ label: 'value', value: 'key' }} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.oemPrivilegeCustomer} valuePropName="checked" name="oemPrivilegeCustomer">
                        <Checkbox>OEM Privileged Customer</Checkbox>
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
                        <Checkbox {...disabledProps}>Theft Vehicle</Checkbox>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.pdiDone} valuePropName="checked" name="pdiDone">
                        <Checkbox value={true} {...disabledProps}>
                            PDI Done
                        </Checkbox>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.govtVehicle} valuePropName="checked" name="govtVehicle">
                        <Checkbox {...disabledProps}>Government Vehicle</Checkbox>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.mnmCtcVehicle} valuePropName="checked" name="mnmCtcVehicle">
                        <Checkbox onClick={handleOnChange}>M&M CTC Vehicle</Checkbox>
                    </Form.Item>
                </Col>

                {mnmCtcVehicleFlag && (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.manageBy} rules={[validateRequiredSelectField('managed by')]} name="manageBy" label="Managed By">
                            <Select placeholder="Select" showSearch allowClear options={typeData['CTC_TYP']} fieldNames={{ label: 'value', value: 'key' }} />
                        </Form.Item>
                    </Col>
                )}
            </Row>
            {userType === USER_TYPE?.ADMIN?.key && (
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
