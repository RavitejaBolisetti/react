/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Input, Form, Collapse, Divider, Select, DatePicker } from 'antd';
import { expandActionIcon } from 'utils/accordianExpandIcon';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { customSelectBox } from 'utils/customSelectBox';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { SALE_TYPE } from '../utils/saleTypeConstant';

import { validateRequiredSelectField, validateOnlyPositiveNumber, validateRequiredInputField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { translateContent } from 'utils/translateContent';
import { PARAM_MASTER } from 'constants/paramMaster';

const { Panel } = Collapse;
const { Search } = Input;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { handleVINChange, formData, vinNumber, bookingNumber, schemeDetail, employeeData, managerData, shieldDetailForm, handleOtfSearch, handleVinSearch, handleOtfChange, saleType, handleSaleTypeChange, formActionType, isSchemeLoading, typeData, handleTaxChange } = props;
    const { activeKey, setActiveKey } = props;

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

    const handleEmployeeChange = ({ values, key }) => {
        shieldDetailForm.setFieldsValue({ registrationInformation: { [key]: values?.option?.value } });
    };

    const handleSchemeDescription = (key) => {
        const selectedScheme = schemeDetail?.find((i) => i.schemeDescription === key);
        if (selectedScheme) {
            shieldDetailForm.setFieldsValue({
                schemeDetails: {
                    schemeCode: selectedScheme?.schemeCode,
                    schemeBasicAmount: selectedScheme?.schemeAmount,
                    schemeDiscount: selectedScheme?.schemeDiscount,
                    schemeTaxAmount: selectedScheme?.schemeTaxAmount,
                    schemeStartDate: formattedCalendarDate(selectedScheme?.schemeStartDate),
                    schemeEndDate: formattedCalendarDate(selectedScheme?.schemeEndDate),
                    familyCode: selectedScheme?.familyCode,
                    id: selectedScheme?.id,
                },
            });
        }
    };

    const isDiscountLessThanAmount = (value) => {
        if (Number(shieldDetailForm.getFieldValue()?.schemeDetails?.schemeBasicAmount) < Number(value)) {
            return Promise.reject(translateContent('amcRegistration.validation.discoutGreaterThanScheme'));
        } else {
            return Promise.resolve();
        }
    };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Collapse collapsible="icon" expandIcon={({ isActive }) => expandActionIcon(isActive, formActionType)} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                    <Panel header={translateContent('shieldSchemeRegistration.heading.registrationInformation')} key="1">
                        <Divider />
                        <Row gutter={20}>
                            <>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.priceType} label={translateContent('amcRegistration.label.priceType')} name={['registrationInformation', 'priceType']} rules={[validateRequiredSelectField(translateContent('amcRegistration.label.priceType'))]}>
                                        {customSelectBox({ data: typeData?.[PARAM_MASTER.DLVR_SALE_TYP.id], placeholder: preparePlaceholderSelect(translateContent('amcRegistration.label.priceType')), onChange: handleSaleTypeChange })}
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.saleType} label={translateContent('amcRegistration.label.saleType')} name={['registrationInformation', 'saleType']} rules={[validateRequiredSelectField(translateContent('amcRegistration.label.saleType'))]}>
                                        {customSelectBox({ data: typeData['SALE_TYPE'], placeholder: preparePlaceholderSelect(translateContent('amcRegistration.label.saleType')), onChange: handleTaxChange })}
                                    </Form.Item>
                                </Col>
                            </>

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
                                        <Search allowClear onChange={handleVINChange} onSearch={handleVinSearch} loading={isSchemeLoading} placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.vin'))} disabled={!formActionType?.addMode} />
                                    </Form.Item>
                                </Col>
                            )}
                            {saleType === SALE_TYPE?.PAID?.key && (
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.availableFund} label={translateContent('shieldSchemeRegistration.label.availableFunds')} name={['registrationInformation', 'availableFund']}>
                                        <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.availableFunds'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                            )}
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.odometerReading} label={translateContent('shieldSchemeRegistration.label.odometerReading')} name={['registrationInformation', 'odometerReading']} rules={[validateRequiredInputField(translateContent('shieldSchemeRegistration.label.odometerReading')), validateOnlyPositiveNumber(translateContent('shieldSchemeRegistration.label.odometerReading'))]}>
                                    <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.odometerReading'))} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.employeeCode} label={translateContent('shieldSchemeRegistration.label.employeeName')} name={['registrationInformation', 'employeeCode']} rules={[validateRequiredSelectField(translateContent('shieldSchemeRegistration.label.employeeName'))]}>
                                    {customSelectBox({ data: employeeData, placeholder: preparePlaceholderSelect(translateContent('shieldSchemeRegistration.label.employeeName')), onChange: (_, values) => handleEmployeeChange({ key: 'employeeName', values }) })}
                                </Form.Item>
                                <Form.Item initialValue={formData?.employeeName} name={['registrationInformation', 'employeeName']} />
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.managerCode} label={translateContent('shieldSchemeRegistration.label.managerName')} name={['registrationInformation', 'managerCode']}>
                                    {customSelectBox({ data: [{ key: 'hello', value: 'wow' }], placeholder: preparePlaceholderSelect(translateContent('shieldSchemeRegistration.label.managerName')), onChange: (_, values) => handleEmployeeChange({ key: 'managerName', values }) })}
                                </Form.Item>
                                <Form.Item initialValue={formData?.managerName} name={['registrationInformation', 'managerName']} />
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
                <Collapse collapsible="icon" expandIcon={({ isActive }) => expandActionIcon(isActive, formActionType)} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                    <Panel header={translateContent('shieldSchemeRegistration.heading.schemeDetails')} key="2">
                        <Divider />
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
                            <Form.Item hidden label="" name={['schemeDetails', 'sgstAmount']} />
                            <Form.Item hidden label="" name={['schemeDetails', 'igstAmount']} />
                            <Form.Item hidden label="" name={['schemeDetails', 'cgstAmount']} />
                            <Form.Item hidden label="" name={['schemeDetails', 'familyCode']} />
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeCode} label={translateContent('shieldSchemeRegistration.label.schemeCode')} name={['schemeDetails', 'schemeCode']}>
                                    <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.schemeCode'))} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeAmount} label={translateContent('shieldSchemeRegistration.label.schemeBasicAmount')} name={['schemeDetails', 'schemeBasicAmount']}>
                                    <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.schemeBasicAmount'))} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.schemeDiscount} label={translateContent('shieldSchemeRegistration.label.schemeDiscount')} name={['schemeDetails', 'schemeDiscount']} rules={[validateNumberWithTwoDecimalPlaces(translateContent('shieldSchemeRegistration.label.schemeDiscount')), { validator: (__, value) => isDiscountLessThanAmount(value) }]}>
                                    <Input placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.schemeDiscount'))} onChange={handleTaxChange} />
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
