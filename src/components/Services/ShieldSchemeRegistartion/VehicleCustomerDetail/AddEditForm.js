/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, Collapse, Divider, DatePicker } from 'antd';
import { expandActionIcon } from 'utils/accordianExpandIcon';
import { convertDateToCalender, dateFormat } from 'utils/formatDateTime';

import { preparePlaceholderText } from 'utils/preparePlaceholder';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, formActionType, vehicleDetailForm, customerDetailForm, handleFormValueChange } = props;

    const [activeKey, setActiveKey] = useState([]);

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

    const fromDateInitialValue = { initialValue: convertDateToCalender(formData?.vehicleDetails?.orgWarrantyStartDate) };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Collapse collapsible="icon" expandIcon={({ isActive }) => expandActionIcon(isActive, formActionType)} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                    <Panel header="Vehicle Details" key="1">
                        <Divider />
                        <Form layout="vertical" autoComplete="off" form={vehicleDetailForm} onFieldsChange={handleFormValueChange}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.vehicleDetails?.vin} label="VIN" name="vin">
                                        <Input placeholder={preparePlaceholderText('VIN')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.vehicleDetails?.vehicleRegistrationNumber} label="Vehicle Registration No." name="vehicleRegistrationNumber">
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
                                    <Form.Item initialValue={formData?.vehicleDetails?.modelGroup} label="Model Group" name="modelGroup">
                                        <Input placeholder={preparePlaceholderText('Model Group')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.vehicleDetails?.modelFamily} label="Model Family" name="modelFamily">
                                        <Input placeholder={preparePlaceholderText('Model Family')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.vehicleDetails?.modelDescription} label="Model Description" name="modelDescription">
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
                                    <Form.Item initialValue={formData?.customerDetails?.customerId} label="Customer ID" name="customerId">
                                        <Input placeholder={preparePlaceholderText('Customer ID')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.customerName} label="Customer Name" name="customerName">
                                        <Input placeholder={preparePlaceholderText('Customer Name')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.address} label="Address" name="address">
                                        <Input placeholder={preparePlaceholderText('Address')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.state} label="State" name="state">
                                        <Input placeholder={preparePlaceholderText('State')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.district} label="District" name="district">
                                        <Input placeholder={preparePlaceholderText('District')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.tehsil} label="Tehsil" name="tehsil">
                                        <Input placeholder={preparePlaceholderText('Tehsil')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.city} label="City" name="city">
                                        <Input placeholder={preparePlaceholderText('City')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.locality} label="Locality" name="locality">
                                        <Input placeholder={preparePlaceholderText('Locality')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.pinCode} label="Pincode" name="pinCode">
                                        <Input placeholder={preparePlaceholderText('Pincode')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.mobileNumber} label="Mobile Number" name="mobileNumber">
                                        <Input placeholder={preparePlaceholderText('Mobile Number')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.gstIn} label="GSTIN" name="gstIn">
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
