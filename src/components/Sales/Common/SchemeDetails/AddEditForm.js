/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, DatePicker, Collapse, Card, Divider } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';

import { expandIcon } from 'utils/accordianExpandIcon';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';

const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { typeData, schemeData, styles, viewOnly = true, form } = props;
    const [activeKey, setactiveKey] = useState([1]);

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);
        if (isPresent) {
            const newActivekeys = [];
            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };
    const disabledProps = { disabled: viewOnly };
    const handleSchemeChange = (id, formKey) => {
        const updatedScheme = schemeData?.sales?.find((i) => id === i.id);
        form.setFieldsValue({
            [formKey]: { ...updatedScheme, validFrom: formattedCalendarDate(updatedScheme?.validFrom), validTo: formattedCalendarDate(updatedScheme?.validTo), salesSchemeId: id, salesSchemeDiscountType: updatedScheme?.discountType },
        });
    };

    const schemeFormField = ({ schemeForm, showTitle, formKey, disableTitle = true, discountTypeOption }) => (
        <>
            {showTitle && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={schemeForm?.find((i) => i?.active)?.schemeId} label={translateContent('commonModules.label.schemeAndOfferDetails.schemeName')} name={[formKey, 'schemeName']}>
                            {customSelectBox({
                                data: schemeForm,
                                placeholder: preparePlaceholderSelect(translateContent('commonModules.label.schemeAndOfferDetails.schemeName')),
                                onChange: (value) => {
                                    handleSchemeChange(value, formKey);
                                },
                                fieldNames: { key: 'id', value: 'schemeName' },
                            })}
                        </Form.Item>
                    </Col>
                </Row>
            )}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={schemeForm?.schemeType} label={translateContent('commonModules.label.schemeAndOfferDetails.schemeType')} name={[formKey, 'schemeType']}>
                        {customSelectBox({ data: showTitle ? typeData['SCHEME_TYPE'] : typeData['SALS_SCHEM_TYPE'], placeholder: preparePlaceholderSelect(translateContent('commonModules.label.schemeAndOfferDetails.schemeType')), disabled: disableTitle })}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={schemeForm?.schemeCategory} label={translateContent('commonModules.label.schemeAndOfferDetails.schemeCategory')} name={[formKey, 'schemeCategory']}>
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.schemeCategory'))} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={schemeForm?.amount} label={translateContent('commonModules.label.schemeAndOfferDetails.Amount')} name={[formKey, 'amount']}>
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.Amount'))} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formattedCalendarDate(schemeForm?.validFrom)} label={translateContent('commonModules.label.schemeAndOfferDetails.validFrom')} name={[formKey, 'validFrom']}>
                        <DatePicker format={dateFormat} placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.validFrom'))} onChange={onChange} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formattedCalendarDate(schemeForm?.validTo)} label={translateContent('commonModules.label.schemeAndOfferDetails.validTo')} name={[formKey, 'validTo']}>
                        <DatePicker format={dateFormat} placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.validTo'))} onChange={onChange} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={schemeForm?.discountType} label={translateContent('commonModules.label.schemeAndOfferDetails.discountType')} name={[formKey, 'discountType']}>
                        {customSelectBox({
                            data: typeData?.[discountTypeOption],
                            placeholder: preparePlaceholderSelect(translateContent('commonModules.label.schemeAndOfferDetails.discountType')),
                            disabled: !showTitle,
                            onChange: (salesSchemeDiscountType) => {
                                if (salesSchemeDiscountType) {
                                    form.setFieldsValue({ [formKey]: { salesSchemeDiscountType: salesSchemeDiscountType || form.getFieldsValue()?.[formKey]?.discountType } });
                                }
                            },
                        })}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={schemeForm?.description} label={translateContent('commonModules.label.schemeAndOfferDetails.description')} name={[formKey, 'description']}>
                        <TextArea maxLength={300} placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.description'))} {...disabledProps} showCount />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item initialValue={''} name={[formKey, 'salesSchemeId']} hidden />
            <Form.Item initialValue={''} name={[formKey, 'salesSchemeDiscountType']} hidden />
        </>
    );

    const corporateFormField = ({ schemeForm, discountTypeOption }) => (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={schemeForm?.corporateCode} label={translateContent('commonModules.label.schemeAndOfferDetails.corporateCode')} name="corporateCode">
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.corporateCode'))} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={schemeForm?.corporateDescription} label={translateContent('commonModules.label.schemeAndOfferDetails.corporateDescription')} name="corporateDescription">
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.corporateCode'))} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={schemeForm?.corporateName} label={translateContent('commonModules.label.schemeAndOfferDetails.corporateName')} name="corporateName">
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.corporateName'))} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={schemeForm?.corporateCategory} label={translateContent('commonModules.label.schemeAndOfferDetails.corporateCategory')} name="corporateCategory">
                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect(translateContent('commonModules.label.schemeAndOfferDetails.corporateCategory')) })}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={schemeForm?.stdDealerAmount} label={translateContent('commonModules.label.schemeAndOfferDetails.stdDealerAmount')} name="stdDealerAmount">
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.stdDealerAmount'))} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={schemeForm?.stdOEMDiscount} label={translateContent('commonModules.label.schemeAndOfferDetails.stdOEMDiscount')} name="stdOEMDiscount">
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.stdOEMDiscount'))} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={schemeForm?.corporateAdditionalApplicableDiscount} label={translateContent('commonModules.label.schemeAndOfferDetails.corporateAdditionalApplicableDiscount')} name="corporateAdditionalApplicableDiscount">
                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect(translateContent('commonModules.label.schemeAndOfferDetails.corporateAdditionalApplicableDiscount')) })}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={schemeForm?.corporateAdditionalDiscount} label={translateContent('commonModules.label.schemeAndOfferDetails.corporateAdditionalDiscount')} name="corporateAdditionalDiscount">
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.corporateAdditionalDiscount'))} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={schemeForm?.totalCorporateDiscount} label={translateContent('commonModules.label.schemeAndOfferDetails.totalCorporateDiscount')} name="totalCorporateDiscount">
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.totalCorporateDiscount'))} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={schemeForm?.corporateDiscountType} label={translateContent('commonModules.label.schemeAndOfferDetails.corporateDiscountType')} name="corporateDiscountType">
                        {customSelectBox({ data: typeData?.[discountTypeOption], placeholder: preparePlaceholderSelect(translateContent('commonModules.label.schemeAndOfferDetails.corporateDiscountType')) })}
                    </Form.Item>
                </Col>
            </Row>
        </>
    );

    const isDataExist = schemeData?.exchange || schemeData?.loyalty || schemeData?.corporate || schemeData?.sales?.length > 0;
    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                {isDataExist ? (
                    <>
                        {schemeData?.exhange && (
                            <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                                <Panel header={translateContent('commonModules.heading.schemeAndOfferDetails.exchange')} key={1}>
                                    <Divider />
                                    {schemeFormField({ schemeForm: schemeData?.exchange, showTitle: schemeData?.exchange?.title, formKey: 'exchange', discountTypeOption: 'EXCH_MODE_OF_DIS' })}
                                </Panel>
                            </Collapse>
                        )}

                        {schemeData?.loyalty && (
                            <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                                <Panel header={translateContent('commonModules.heading.schemeAndOfferDetails.loyalty')} key={2}>
                                    <Divider />
                                    {schemeFormField({ schemeForm: schemeData?.loyalty, formKey: 'loyalty', discountTypeOption: 'LOYAL_MODE_OF_DIS' })}
                                </Panel>
                            </Collapse>
                        )}

                        {schemeData?.corporate && (
                            <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end">
                                <Panel header={translateContent('commonModules.heading.schemeAndOfferDetails.corporate')} key={3}>
                                    <Divider />
                                    {corporateFormField({ schemeForm: schemeData?.corporate, formKey: 'corporate', discountTypeOption: 'CORP_MODE_OF_DIS' })}
                                </Panel>
                            </Collapse>
                        )}

                        {schemeData && schemeData?.sales?.length > 0 && (
                            <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(4)} expandIconPosition="end">
                                <Panel header={translateContent('commonModules.heading.schemeAndOfferDetails.salesScheme')} key={4}>
                                    <Divider />
                                    {schemeFormField({ schemeForm: schemeData?.sales, showTitle: true, formKey: 'sales', discountTypeOption: 'SALES_MODE_OF_DIS' })}
                                </Panel>
                            </Collapse>
                        )}
                    </>
                ) : (
                    <Card>
                        <div className={styles?.marB20}>{translateContent('commonModules.label.schemeAndOfferDetails.noScheme')}</div>
                    </Card>
                )}
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
