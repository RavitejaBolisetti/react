/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Form, Collapse, Divider, Select, DatePicker } from 'antd';
import { expandActionIcon } from 'utils/accordianExpandIcon';
import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
const { Search } = Input;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, formActionType, vehicleDetailForm, customerDetailForm, handleFormValueChange } = props;

    const [activeKey, setActiveKey] = useState([]);
    // useEffect(() => {
    //     partyDetailForm.setFieldsValue({
    //         ...formData,
    //     });
    //     partyDetailForm.setFieldsValue({
    //         partyName: formData?.partyName ?? formData?.customerName,
    //         address: formData?.address,
    //         city: formData?.city,
    //         state: formData?.state,
    //         mobileNumber: formData?.mobileNumber,
    //         mitraType: formData?.mitraType,
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [formData]);

    const onChange = (values) => {
        const isPresent = activeKey?.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setActiveKey(newActivekeys);
        } else {
            setActiveKey([...activeKey, values]);
        }
    };

    const fromDateInitialValue = { initialValue: formattedCalendarDate(formData?.shieldVehicleDetails?.orgWarrantyStartDate) };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Collapse collapsible="icon" expandIcon={({ isActive }) => expandActionIcon(isActive, formActionType)} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                    <Panel header="Vehicle Details" key="1">
                        <Divider />
                        <Form layout="vertical" autoComplete="off" form={vehicleDetailForm} onFieldsChange={handleFormValueChange}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldVehicleDetails?.vin} label="VIN" name="vin">
                                        <Input placeholder={preparePlaceholderText('VIN')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldVehicleDetails?.vehicleRegistrationNumber} label="Vehicle Registration No." name="vehicleRegistrationNumber">
                                        <Input placeholder={preparePlaceholderText('Vehicle Registration No.')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item {...fromDateInitialValue} label="Org. Warranty Start Date" name="orgWarrantyStartDate">
                                        <DatePicker format={dateFormat} placeholder={preparePlaceholderText('Org. Warranty Start Date')} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldVehicleDetails?.modelGroup} label="Model Group" name="modelGroup">
                                        <Input placeholder={preparePlaceholderText('Model Group')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldVehicleDetails?.modelFamily} label="Model Family" name="modelFamily">
                                        <Input placeholder={preparePlaceholderText('Model Family')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldVehicleDetails?.modelDescription} label="Model Description" name="modelDescription">
                                        <Input placeholder={preparePlaceholderText('Model Description')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Panel>
                </Collapse>
                <Collapse collapsible="icon" expandIcon={({ isActive }) => expandActionIcon(isActive, formActionType)} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                    <Panel header="Customer Details" key="2">
                        <Divider />
                        <Form layout="vertical" autoComplete="off" form={customerDetailForm} onFieldsChange={handleFormValueChange}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldCustomerDetails?.customerId} label="Customer ID" name="customerId">
                                        <Input placeholder={preparePlaceholderText('Customer ID')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldCustomerDetails?.customerName} label="Customer Name" name="customerName">
                                        <Input placeholder={preparePlaceholderText('Customer Name')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldCustomerDetails?.address} label="Address" name="address">
                                        <Input placeholder={preparePlaceholderText('Address')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldCustomerDetails?.state} label="State" name="state">
                                        <Input placeholder={preparePlaceholderText('State')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldCustomerDetails?.district} label="District" name="district">
                                        <Input placeholder={preparePlaceholderText('District')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldCustomerDetails?.tehsil} label="Tehsil" name="tehsil">
                                        <Input placeholder={preparePlaceholderText('Tehsil')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldCustomerDetails?.city} label="City" name="city">
                                        <Input placeholder={preparePlaceholderText('City')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldCustomerDetails?.locality} label="Locality" name="locality">
                                        <Input placeholder={preparePlaceholderText('Locality')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldCustomerDetails?.pinCode} label="Pincode" name="pinCode">
                                        <Input placeholder={preparePlaceholderText('Pincode')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldCustomerDetails?.mobileNumber} label="Mobile Number" name="mobileNumber">
                                        <Input placeholder={preparePlaceholderText('Mobile Number')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.shieldCustomerDetails?.gstIn} label="GSTIN" name="gstIn">
                                        <Input placeholder={preparePlaceholderText('gistin')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
