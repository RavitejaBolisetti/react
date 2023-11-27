/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Collapse, Divider } from 'antd';
import { validateRequiredSelectField, validateNumberWithTwoDecimalPlaces, validateRequiredInputField, compareAmountValidator } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { PARAM_MASTER } from 'constants/paramMaster';

import { DataTable } from 'utils/dataTable';
import { taxDetailsColumn } from './tableColumn';
import { expandIcon } from 'utils/accordianExpandIcon';
import { addToolTip } from 'utils/customMenuLink';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { CollapseOnChange } from 'utils/CollapseOnChange';

import { customSelectBox } from 'utils/customSelectBox';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { CardSkeleton } from 'components/common/Skeleton';

const { Panel } = Collapse;

export const AddEditForm = (props) => {
    const { toolTipContent, formData, typeData } = props;
    const { collapseActiveKey, setcollapseActiveKey, CoDealerInvoiceStateMaster, HandleVinList, setDealerDicountValue, isVinLoading } = props;
    const { isDisabled = true, form, changeStatus, setchangeStatus } = props;
    const disabledProps = { disabled: isDisabled };

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({ ...formData });
            if (formData?.modelCode) {
                HandleVinList(formData?.modelCode);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData, form]);

    if (!formData) return <CardSkeleton title={false} />;

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
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.modelDescription')} name="modelDescription" data-testid="model">
                                        <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.modelDescription'))} />
                                    </Form.Item>
                                    {toolTipContent && <div className={styles.modelTooltip}>{addToolTip(toolTipContent, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle size={13} />)}</div>}
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.vin')} rules={[validateRequiredSelectField(translateContent('commonModules.label.vehicleDetails.vin'))]} name="vinNumber">
                                        {customSelectBox({ data: CoDealerInvoiceStateMaster?.VinData, fieldNames: { key: 'vehicleIdentificationNumber', value: 'vehicleIdentificationNumber' }, loading: isVinLoading })}
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.saleType} name="saleType" label={translateContent('commonModules.label.vehicleDetails.saleType')} rules={[validateRequiredSelectField('Sale Type')]}>
                                        {customSelectBox({ data: CoDealerInvoiceStateMaster?.SALE_TYPE, onChange: () => setchangeStatus('saleType') })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.priceType} label={translateContent('commonModules.label.vehicleDetails.priceType')} name="priceType" rules={[validateRequiredSelectField(translateContent('commonModules.label.vehicleDetails.priceType'))]}>
                                        {customSelectBox({ data: CoDealerInvoiceStateMaster?.PRC_TYP, onChange: () => setchangeStatus('priceType') })}
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.taxCalculationType} label={translateContent('commonModules.label.bookingDetails.taxCalculation')} name="taxCalculationType" rules={[validateRequiredSelectField('Tax Calculation')]}>
                                        {customSelectBox({ data: CoDealerInvoiceStateMaster?.TAX_CALCLTN_TYPE, placeholder: preparePlaceholderSelect('Tax Calculation') })}
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
                                        <Input placeholder={preparePlaceholderText('Dealer Discount with TAX')} onChange={(value) => setDealerDicountValue(value)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.totalTaxAmount')} name="totalTaxAmount">
                                        <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.totalTaxAmount'))} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.tcsAmount')} name="tcsAmount">
                                        <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.tcsAmount'))} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.vehicleAmount')} name="vehicleAmount">
                                        <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.vehicleAmount'))} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>

                    <Collapse expandIcon={expandIcon} activeKey={collapseActiveKey} onChange={() => CollapseOnChange(2, collapseActiveKey, setcollapseActiveKey)} expandIconPosition="end" collapsible="icon">
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
