/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Form, Collapse, Divider, Select, DatePicker, AutoComplete } from 'antd';
import { expandActionIcon } from 'utils/accordianExpandIcon';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { SALE_TYPE } from '../utils/saleTypeConstant';

import { validateRequiredSelectField, validateOnlyPositiveNumber } from 'utils/validation';

const { Panel } = Collapse;
const { Search } = Input;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, saleTypes, vinNumber, bookingNumber, schemeDetail, options, shieldDetailForm, handleOtfSearch, handleVinSearch, handleEmployeeSearch, handleOtfChange, saleType, handleSaleTypeChange, formActionType, isEmployeeDataLoading, handleOnSelect, handleOnClear, screenType } = props;
    const { activeKey, setActiveKey } = props;
    // const [activeKey, setActiveKey] = useState([]);
    const [selectedScheme, setSelectedScheme] = useState([]);

    useEffect(() => {
        shieldDetailForm.setFieldsValue({ registrationInformation: { vin: vinNumber, otf: bookingNumber } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vinNumber, bookingNumber]);

    const onChange = (values) => {
        setActiveKey(values);
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    const handleSchemeDescription = (key) => {
        const selectedScheme = schemeDetail?.find((i) => i.schemeDescription === key);
        setSelectedScheme(selectedScheme);
        if (selectedScheme) {
            shieldDetailForm.setFieldsValue({
                schemeDetails: {
                    schemeCode: selectedScheme?.schemeCode,
                    schemeAmount: selectedScheme?.schemeAmount,
                    schemeDiscount: selectedScheme?.schemeDiscount,
                    schemeTaxAmount: selectedScheme?.schemeTaxAmount,
                    schemeStartDate: formattedCalendarDate(selectedScheme?.schemeStartDate),
                    schemeEndDate: formattedCalendarDate(selectedScheme?.schemeEndDate),
                    id: selectedScheme?.id,
                },
            });
        }
    };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Collapse collapsible="icon" expandIcon={({ isActive }) => expandActionIcon(isActive, formActionType)} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                    <Panel header="Registration Information" key="1">
                        <Divider />
                        {/* <Form layout="vertical" autoComplete="off" form={registrationForm} onFieldsChange={handleFormValueChange}> */}
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.saleType} label="Sale Type" name={['registrationInformation', 'saleType']} rules={[validateRequiredSelectField('Sale Type')]}>
                                    <Select {...selectProps} onChange={handleSaleTypeChange} placeholder={preparePlaceholderSelect('Sale Type')} disabled={!formActionType?.addMode}>
                                        {saleTypes?.map((item) => (
                                            <Option key={'dv' + item.key} value={item.key}>
                                                {item.value}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {saleType === SALE_TYPE?.PAID?.key && screenType !== 'RSA' && (
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.availableFund} label="Available Funds" name={['registrationInformation', 'availableFund']}>
                                        <Input placeholder={preparePlaceholderText('Available Funds')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            )}
                            {saleType !== SALE_TYPE?.PAID?.key && (
                                <>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.otf} label="Booking No." name={['registrationInformation', 'otf']}>
                                            <Search allowClear onChange={handleOtfChange} onSearch={handleOtfSearch} placeholder={preparePlaceholderText('OTF')} disabled={!formActionType?.addMode} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.vin} label="VIN" name={['registrationInformation', 'vin']}>
                                            <Input placeholder={preparePlaceholderText('Vin')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </>
                            )}
                            {saleType === SALE_TYPE?.PAID?.key && (
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.vin} label="VIN" name={['registrationInformation', 'vin']}>
                                        <Search allowClear onSearch={handleVinSearch} placeholder={preparePlaceholderText('VIN')} disabled={!formActionType?.addMode} />
                                    </Form.Item>
                                </Col>
                            )}
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.odometerReading} label="Odometer Reading" name={['registrationInformation', 'odometerReading']} rules={[validateRequiredSelectField('Odometer Reading'), validateOnlyPositiveNumber('Odometer Reading')]}>
                                    <Input placeholder={preparePlaceholderText('Odometer Reading')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.employeeName} label="Employee Name" name={['registrationInformation', 'employeeName']}>
                                    <AutoComplete maxLength={50} options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                        <Search onSearch={handleEmployeeSearch} onChange={handleOnClear} placeholder={preparePlaceholderText('Employee Name')} loading={isEmployeeDataLoading} type="text" allowClear />
                                    </AutoComplete>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.managerName} label="Manager Name" name={['registrationInformation', 'managerName']}>
                                    <Input placeholder={preparePlaceholderText('Manager Name')} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* </Form> */}
                    </Panel>
                </Collapse>
                <Collapse collapsible="icon" expandIcon={({ isActive }) => expandActionIcon(isActive, formActionType)} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                    <Panel header="Scheme Details" key="2">
                        <Divider />
                        {/* <Form layout="vertical" autoComplete="off" form={schemeForm} onFieldsChange={handleFormValueChange}> */}
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeDescription} label="Scheme Description" name={['schemeDetails', 'schemeDescription']} rules={[validateRequiredSelectField('Scheme Description')]}>
                                    <Select {...selectProps} onChange={handleSchemeDescription} placeholder={preparePlaceholderSelect('Scheme Description')} disabled={!formActionType?.addMode}>
                                        {schemeDetail?.map((item) => (
                                            <Option key={'dv' + item.schemeDescription} value={item.schemeDescription}>
                                                {item.schemeDescription}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeCode} label="Scheme Code" name={['schemeDetails', 'schemeCode']}>
                                    <Input placeholder={preparePlaceholderText('Scheme Code')} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeAmount} label="Scheme Basic Amount" name={['schemeDetails', 'schemeAmount']}>
                                    <Input placeholder={preparePlaceholderText('Scheme Basic Amount')} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeDiscount} label="Scheme Discount" name={['schemeDetails', 'schemeDiscount']}>
                                    <Input placeholder={preparePlaceholderText('Scheme Discount')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeTaxAmount} label="Scheme Tax Amount" name={['schemeDetails', 'schemeTaxAmount']}>
                                    <Input placeholder={preparePlaceholderText('Scheme Tax Amount')} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeStartDate} label="Scheme Start Date" name={['schemeDetails', 'schemeStartDate']}>
                                    <DatePicker format={dateFormat} placeholder={preparePlaceholderText('Scheme Start Date')} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeEndDate} label="Scheme End Date" name={['schemeDetails', 'schemeEndDate']}>
                                    <DatePicker format={dateFormat} placeholder={preparePlaceholderText('Scheme End Date')} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item hidden initialValue={formData?.id} label="id" name={['schemeDetails', 'id']}>
                                    <Input placeholder={preparePlaceholderText('id')} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* </Form> */}
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
