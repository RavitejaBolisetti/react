/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Form, Collapse, Divider, Select, DatePicker, Typography } from 'antd';
import { expandActionIcon } from 'utils/accordianExpandIcon';
import { dateFormat } from 'utils/formatDateTime';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { SALE_TYPE } from '../utils/saleTypeConstant';

import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';

const { Panel } = Collapse;
const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { formData, saleTypes, schemeDetail, registrationForm, schemeForm, handleFormValueChange, buttonData, handleOtfSearch, handleVinSearch, handleEmployeeSearch, formActionType } = props;
    const [saleType, setSaleType] = useState();
    const [vinNumber, setVinNumber] = useState();
    const [activeKey, setActiveKey] = useState([]);

    const handleSaleTypeChange = (value) => {
        setSaleType(value);
        setVinNumber();
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

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    // const handleSave = () => {};

    // const onFinishFailed = () => {};

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Collapse collapsible="icon" expandIcon={({ isActive }) => expandActionIcon(isActive, formActionType)} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                    <Panel header="Registration Information" key="1">
                        <Divider />
                        <Form layout="vertical" autoComplete="off" form={registrationForm} onFieldsChange={handleFormValueChange}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.saleType} label="Sale Type" name="saleType" rules={[validateRequiredSelectField('Sale Type')]}>
                                        <Select {...selectProps} onChange={handleSaleTypeChange} placeholder={preparePlaceholderSelect('Sale Type')} disabled={!formActionType?.addMode}>
                                            {saleTypes?.map((item) => (
                                                <Option key={'dv' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                {(saleType == SALE_TYPE?.MNM_FOC?.key || saleType == SALE_TYPE?.DEALER_FOC?.key) && (
                                    <>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={formData?.otf} label="Booking No" name="bookingNo" rules={[validateRequiredInputField('Booking No')]}>
                                                <Search allowClear onSearch={handleOtfSearch} placeholder={preparePlaceholderText('Booking No')} disabled={!formActionType?.addMode} />
                                            </Form.Item>
                                        </Col>
                                    </>
                                )}

                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.vin} label="VIN" name="vinNumber" rules={[validateRequiredInputField('Vin')]}>
                                        <Input placeholder={preparePlaceholderText('Vin')} disabled={saleType == SALE_TYPE?.PAID?.key ? false : true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.odometerReading} label="Odometer Reading" name="odometerReading" rules={[validateRequiredInputField('Odometer Reading')]}>
                                        <Input placeholder={preparePlaceholderText('Odometer Reading')} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.employeeName} label="Employee Name" name="employeeName" rules={[validateRequiredInputField('Employee Name')]}>
                                        <Search allowClear onSearch={handleEmployeeSearch} placeholder={preparePlaceholderText('Employee Name')} disabled={!formActionType?.addMode} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.managerName} label="Manager Name" name="managerName">
                                        <Input placeholder={preparePlaceholderText('Manager Name')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Panel>
                </Collapse>
                <Collapse collapsible="icon" expandIcon={({ isActive }) => expandActionIcon(isActive, formActionType)} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                    <Panel header="Scheme Details" key="2">
                        <Divider />
                        <Form layout="vertical" autoComplete="off" form={schemeForm} onFieldsChange={handleFormValueChange}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.schemeDescription} label="Scheme Description" name="schemeDescription">
                                        {/* rules={[validateRequiredSelectField('Scheme Description')]} */}
                                        <Select {...selectProps} placeholder={preparePlaceholderSelect('Scheme Description')} disabled={!formActionType?.addMode}>
                                            {schemeDetail?.map((item) => (
                                                <Option key={'dv' + item.schemeCode} value={item.schemeCode}>
                                                    {item.schemeDescription}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.schemeCode} label="Scheme Code" name="schemeCode">
                                        <Input placeholder={preparePlaceholderText('Scheme Code')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.schemeBasicAmount} label="Scheme Basic Amount" name="schemeBasicAmount">
                                        <Input placeholder={preparePlaceholderText('Scheme Basic Amount')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.schemeDiscount} label="Scheme Discount" name="schemeDiscount">
                                        <Input placeholder={preparePlaceholderText('Scheme Discount')} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.schemeTaxAmount} label="Scheme Tax Amount" name="schemeTaxAmount">
                                        <Input placeholder={preparePlaceholderText('Scheme Tax Amount')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.schemeStartDate} label="Scheme Start Date" name="schemeStartDate">
                                        <DatePicker format={dateFormat} placeholder={preparePlaceholderText('Scheme Start Date')} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.schemeEndDate} label="Scheme End Date" name="schemeEndDate">
                                        <DatePicker format={dateFormat} placeholder={preparePlaceholderText('Scheme End Date')} disabled={true} style={{ display: 'auto', width: '100%' }} />
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
