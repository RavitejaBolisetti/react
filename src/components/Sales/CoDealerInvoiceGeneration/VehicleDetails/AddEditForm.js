/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Button, Collapse, Typography, Divider, Switch } from 'antd';
import { validateRequiredSelectField, validateNumberWithTwoDecimalPlaces, validateRequiredInputField, compareAmountValidator } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined } from '@ant-design/icons';
import { PARAM_MASTER } from 'constants/paramMaster';
import dayjs from 'dayjs';

import { DataTable } from 'utils/dataTable';
import { taxDetailsColumn, optionalServicesColumns } from './tableColumn';
import { expandIcon } from 'utils/accordianExpandIcon';
import { addToolTip } from 'utils/customMenuLink';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { getCodeValue } from 'utils/getCodeValue';
import { CollapseOnChange } from 'utils/CollapseOnChange';

import { customSelectBox } from 'utils/customSelectBox';
import { prepareCaption } from 'utils/prepareCaption';
import styles from 'assets/sass/app.module.scss';
import { ConfirmationModal } from 'utils/ConfirmationModal';
import { translateContent } from 'utils/translateContent';

const { Text } = Typography;
const { Panel } = Collapse;

export const AddEditForm = (props) => {
    const { toolTipContent, formData, typeData } = props;
    const { collapseActiveKey, setcollapseActiveKey, formActionType, filterVehicleData, handleVehicleDetailChange, showPrintDiscount = false, isOTFModule } = props;
    const { isDisabled = true, form } = props;
    const disabledProps = { disabled: isDisabled };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse expandIcon={expandIcon} activeKey={collapseActiveKey} onChange={() => CollapseOnChange(1, collapseActiveKey, setcollapseActiveKey)} expandIconPosition="end" collapsible="icon">
                        <Panel header={translateContent('vehicleInvoiceGeneration.heading.collapse.vehicleInformation')} key="1">
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.modelCode')} name="modelCode" data-testid="vehicleVariant" rules={[validateRequiredInputField('Model Code')]}>
                                        <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.modelCode'))} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.modelDescription')} name="model" data-testid="model">
                                        <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.modelDescription'))} />
                                    </Form.Item>
                                    {toolTipContent && <div className={styles.modelTooltip}>{addToolTip(toolTipContent, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle size={13} />)}</div>}
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.vin')} name="vinNumber">
                                        <Input {...disabledProps} placeholder={preparePlaceholderText('VIN')} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.saleType} name="saleType" label={translateContent('commonModules.label.vehicleDetails.saleType')} rules={[validateRequiredSelectField('Sale Type')]}>
                                        {customSelectBox({ data: typeData?.['SALE_TYPE'], onChange: (value) => handleVehicleDetailChange({ ...filterVehicleData, saleType: value }) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.priceType} label={translateContent('commonModules.label.vehicleDetails.priceType')} name="priceType">
                                        {customSelectBox({ data: typeData?.['PRC_TYP'], onChange: (value) => handleVehicleDetailChange({ ...filterVehicleData, priceType: value }) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.taxCalculationType} label={translateContent('commonModules.label.bookingDetails.taxCalculation')} name="taxCalculationType" rules={[validateRequiredSelectField('Tax Calculation')]}>
                                        {customSelectBox({ data: typeData?.[PARAM_MASTER.TAX_CALCLTN_TYPE.id], placeholder: preparePlaceholderSelect('Tax Calculation') })}
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.taxPayableOnReverseCharges} label={translateContent('commonModules.label.bookingDetails.taxPayableOnReverseCharges')} name="taxPayableOnReverseCharges" rules={[validateRequiredSelectField('Tax Payable On Reverse Charges')]}>
                                        {customSelectBox({ data: typeData?.[PARAM_MASTER.RFRL.id], placeholder: preparePlaceholderSelect('Tax Payable On Reverse Charges') })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.vehicleSellingPrice')} name="vehicleSellingPrice">
                                        <Input {...disabledProps} placeholder={preparePlaceholderText('Vehicle Selling Price')} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item
                                        label={translateContent('commonModules.label.vehicleDetails.dealerDiscountWithTax')}
                                        name="discountAmount"
                                        rules={[
                                            validateNumberWithTwoDecimalPlaces('Dealer Discount with TAX'),
                                            {
                                                validator: () => compareAmountValidator(form.getFieldValue('vehicleSellingPrice'), form.getFieldValue('discountAmount'), 'Discount'),
                                            },
                                        ]}
                                    >
                                        <Input placeholder={preparePlaceholderText('Dealer Discount with TAX')} onChange={() => {}} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.vehicleAmount')} name="vehicleAmount">
                                        <Input {...disabledProps} placeholder={preparePlaceholderText('Vehicle Amount')} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>

                    <Collapse expandIcon={expandIcon} collapseActiveKey={collapseActiveKey} onChange={() => CollapseOnChange(2, collapseActiveKey, setcollapseActiveKey)} expandIconPosition="end" collapsible="icon">
                        <Panel header={translateContent('vehicleInvoiceGeneration.heading.collapse.taxDetails')} key="2">
                            <Divider />
                            <DataTable tableColumn={taxDetailsColumn()} tableData={formData?.['taxDetails']} pagination={false} />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </>
    );
};
