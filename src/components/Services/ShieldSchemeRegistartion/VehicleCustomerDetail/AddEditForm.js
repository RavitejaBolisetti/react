/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, Collapse, Divider, DatePicker, Select } from 'antd';
import { expandActionIcon } from 'utils/accordianExpandIcon';
import { dateFormat, formatDateToCalenderDate } from 'utils/formatDateTime';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, formActionType, vehicleDetailForm, customerDetailForm, handleFormValueChange, modelFamilyData, ProductHierarchyData } = props;

    const [activeKey, setActiveKey] = useState([]);

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

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

    const fromDateInitialValue = { initialValue: formatDateToCalenderDate(formData?.vehicleDetails?.orgWarrantyStartDate) };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Collapse collapsible="icon" expandIcon={({ isActive }) => expandActionIcon(isActive, formActionType)} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                    <Panel header={translateContent('shieldSchemeRegistration.heading.vehicleDetails')} key="1">
                        <Divider />
                        <Form layout="vertical" autoComplete="off" form={vehicleDetailForm} onFieldsChange={handleFormValueChange}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.vehicleDetails?.vin} label={translateContent('shieldSchemeRegistration.label.vin')} name="vin">
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.vin'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.vehicleDetails?.vehicleRegistrationNumber} label={translateContent('shieldSchemeRegistration.label.vehicleRegistrationNo')} name="vehicleRegistrationNumber">
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.vehicleRegistrationNo'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item {...fromDateInitialValue} label={translateContent('shieldSchemeRegistration.label.orgWarrantyStartDate')} name="orgWarrantyStartDate">
                                        <DatePicker format={dateFormat} placeholder={preparePlaceholderText('Org. Warranty Start Date')} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.vehicleDetails?.modelGroup} label={translateContent('shieldSchemeRegistration.label.modelGroup')} name="modelGroup">
                                        <Select {...selectProps} placeholder={preparePlaceholderSelect(translateContent('shieldSchemeRegistration.label.modelGroup'))} disabled={true}>
                                            {ProductHierarchyData?.map((item) => (
                                                <Option key={'dv' + item.modelGroupCode} value={item.modelGroupCode}>
                                                    {item.modelGroupDescription}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="chasisNumber" hidden />
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.vehicleDetails?.modelFamily} label={translateContent('shieldSchemeRegistration.label.modelFamily')} name="modelFamily">
                                        <Select {...selectProps} placeholder={preparePlaceholderSelect(translateContent('shieldSchemeRegistration.label.modelFamily'))} disabled={true}>
                                            {modelFamilyData?.map((item) => (
                                                <Option key={'dv' + item.familyCode} value={item.familyCode}>
                                                    {item.familyDescription}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.vehicleDetails?.modelDescription} label={translateContent('shieldSchemeRegistration.label.modelDescription')} name="modelDescription">
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.modelDescription'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Panel>
                </Collapse>
                <Collapse collapsible="icon" expandIcon={({ isActive }) => expandActionIcon(isActive, formActionType)} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                    <Panel header={translateContent('shieldSchemeRegistration.heading.customerDetails')} key="2">
                        <Divider />
                        <Form layout="vertical" autoComplete="off" form={customerDetailForm} onFieldsChange={handleFormValueChange}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.customerId} label={translateContent('shieldSchemeRegistration.label.customerId')} name="customerId">
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.customerId'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.customerName} label={translateContent('shieldSchemeRegistration.label.customerName')} name="customerName">
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.customerName'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.address} label={translateContent('shieldSchemeRegistration.label.address')} name="address">
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.address'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.state} label={translateContent('shieldSchemeRegistration.label.state')} name="state">
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.state'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.district} label={translateContent('shieldSchemeRegistration.label.district')} name="district">
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.district'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.tehsil} label={translateContent('shieldSchemeRegistration.label.tehsil')} name="tehsil">
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.tehsil'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.city} label={translateContent('shieldSchemeRegistration.label.city')} name="city">
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.city'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.locality} label={translateContent('shieldSchemeRegistration.label.locality')} name="locality">
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.locality'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.pinCode} label={translateContent('shieldSchemeRegistration.label.pincode')} name="pinCode">
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.pincode'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.mobileNumber} label={translateContent('shieldSchemeRegistration.label.mobileNumber')} name="mobileNumber">
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.mobileNumber'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                                {/* <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.customerDetails?.gstIn} label={translateContent('shieldSchemeRegistration.label.gstIn')} name="gstIn">
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.gstIn'))} disabled={true} />
                                    </Form.Item>
                                </Col> */}
                            </Row>
                        </Form>
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
