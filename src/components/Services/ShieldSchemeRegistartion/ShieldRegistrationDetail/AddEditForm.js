/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Form, Collapse, Divider, Select, DatePicker } from 'antd';
import { expandActionIcon } from 'utils/accordianExpandIcon';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { customSelectBox } from 'utils/customSelectBox';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { SALE_TYPE } from '../utils/saleTypeConstant';

import { validateRequiredSelectField, validateOnlyPositiveNumber } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;
const { Search } = Input;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, saleTypes, vinNumber, bookingNumber, schemeDetail, employeeData, managerData, shieldDetailForm, handleOtfSearch, handleVinSearch, handleEmployeeSearch, handleOtfChange, saleType, handleSaleTypeChange, formActionType, isSchemeLoading, isEmployeeDataLoading, handleOnSelect, handleOnClear, screenType } = props;
    const { activeKey, setActiveKey } = props;
    // const [activeKey, setActiveKey] = useState([]);
    const [selectedScheme, setSelectedScheme] = useState([]);

    useEffect(() => {
        shieldDetailForm.setFieldsValue({ registrationInformation: { vin: vinNumber, otf: bookingNumber } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vinNumber, bookingNumber]);

    const onChange = (values) => {
        setActiveKey((prev) => (prev === values ? '' : values));
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
                    <Panel header={translateContent('shieldSchemeRegistration.heading.registrationInformation')} key="1">
                        <Divider />
                        {/* <Form layout="vertical" autoComplete="off" form={registrationForm} onFieldsChange={handleFormValueChange}> */}
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.saleType} label={translateContent('shieldSchemeRegistration.label.saleType')} name={['registrationInformation', 'saleType']} rules={[validateRequiredSelectField(translateContent('shieldSchemeRegistration.label.saleType'))]}>
                                    <Select {...selectProps} onChange={handleSaleTypeChange} placeholder={preparePlaceholderSelect(translateContent('shieldSchemeRegistration.label.saleType'))} disabled={!formActionType?.addMode}>
                                        {saleTypes?.map((item) => (
                                            <Option key={'dv' + item.key} value={item.key}>
                                                {item.value}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {saleType === SALE_TYPE?.PAID?.key && (
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.availableFund} label={translateContent('shieldSchemeRegistration.label.availableFunds')} name={['registrationInformation', 'availableFund']}>
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.availableFunds'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                            )}
                            {saleType !== SALE_TYPE?.PAID?.key && (
                                <>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.otf} label={translateContent('shieldSchemeRegistration.label.bookingNo')} name={['registrationInformation', 'otf']}>
                                            <Search allowClear onChange={handleOtfChange} onSearch={handleOtfSearch} loading={isSchemeLoading} placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.bookingNo'))} disabled={!formActionType?.addMode} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.vin} label={translateContent('shieldSchemeRegistration.label.vin')} name={['registrationInformation', 'vin']}>
                                            <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.vin'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </>
                            )}
                            {saleType === SALE_TYPE?.PAID?.key && (
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.vin} label={translateContent('shieldSchemeRegistration.label.vin')} name={['registrationInformation', 'vin']}>
                                        <Search allowClear onSearch={handleVinSearch} loading={isSchemeLoading} placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.vin'))} disabled={!formActionType?.addMode} />
                                    </Form.Item>
                                </Col>
                            )}
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.odometerReading} label={translateContent('shieldSchemeRegistration.label.odometerReading')} name={['registrationInformation', 'odometerReading']} rules={[validateRequiredSelectField(translateContent('shieldSchemeRegistration.label.odometerReading')), validateOnlyPositiveNumber(translateContent('shieldSchemeRegistration.label.odometerReading'))]}>
                                    <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.odometerReading'))} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.employeeName} label={translateContent('shieldSchemeRegistration.label.employeeName')} name={['registrationInformation', 'employeeName']} rules={[validateRequiredSelectField(translateContent('shieldSchemeRegistration.label.employeeName'))]}>
                                    {/* <AutoComplete maxLength={50} options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                        <Search onSearch={handleEmployeeSearch} onChange={handleOnClear} placeholder={preparePlaceholderText('Employee Name')} loading={isEmployeeDataLoading} type="text" allowClear />
                                    </AutoComplete> */}
                                    {customSelectBox({ data: employeeData, placeholder: preparePlaceholderSelect(translateContent('shieldSchemeRegistration.label.employeeName')) })}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.managerName} label={translateContent('shieldSchemeRegistration.label.managerName')} name={['registrationInformation', 'managerName']}>
                                    {/* <Input placeholder={preparePlaceholderText('Manager Name')} disabled={true} /> */}
                                    {customSelectBox({ data: managerData, placeholder: preparePlaceholderSelect(translateContent('shieldSchemeRegistration.label.managerName')) })}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* </Form> */}
                    </Panel>
                </Collapse>
                <Collapse collapsible="icon" expandIcon={({ isActive }) => expandActionIcon(isActive, formActionType)} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                    <Panel header={translateContent('shieldSchemeRegistration.heading.schemeDetails')} key="2">
                        <Divider />
                        {/* <Form layout="vertical" autoComplete="off" form={schemeForm} onFieldsChange={handleFormValueChange}> */}
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeDescription} label={translateContent('shieldSchemeRegistration.label.schemeDescription')} name={['schemeDetails', 'schemeDescription']} rules={[validateRequiredSelectField(translateContent('shieldSchemeRegistration.label.schemeDescription'))]}>
                                    <Select {...selectProps} onChange={handleSchemeDescription} placeholder={preparePlaceholderSelect(translateContent('shieldSchemeRegistration.label.schemeDescription'))} disabled={!formActionType?.addMode}>
                                        {schemeDetail?.map((item) => (
                                            <Option key={'dv' + item.schemeDescription} value={item.schemeDescription}>
                                                {item.schemeDescription}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeCode} label={translateContent('shieldSchemeRegistration.label.schemeCode')} name={['schemeDetails', 'schemeCode']}>
                                    <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.schemeCode'))} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeAmount} label={translateContent('shieldSchemeRegistration.label.schemeBasicAmount')} name={['schemeDetails', 'schemeAmount']}>
                                    <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.schemeBasicAmount'))} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeDiscount} label={translateContent('shieldSchemeRegistration.label.schemeDiscount')} name={['schemeDetails', 'schemeDiscount']} rules={[validateOnlyPositiveNumber(translateContent('shieldSchemeRegistration.label.schemeDiscount'))]}>
                                    <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.schemeDiscount'))} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeTaxAmount} label={translateContent('shieldSchemeRegistration.label.schemeTaxAmount')} name={['schemeDetails', 'schemeTaxAmount']}>
                                    <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.schemeTaxAmount'))} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeStartDate} label={translateContent('shieldSchemeRegistration.label.schemeStartDate')} name={['schemeDetails', 'schemeStartDate']}>
                                    <DatePicker format={dateFormat} placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.schemeStartDate'))} disabled={true} style={{ display: 'auto', width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeEndDate} label={translateContent('shieldSchemeRegistration.label.schemeEndDate')} name={['schemeDetails', 'schemeEndDate']}>
                                    <DatePicker format={dateFormat} placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.schemeEndDate'))} disabled={true} style={{ display: 'auto', width: '100%' }} />
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
