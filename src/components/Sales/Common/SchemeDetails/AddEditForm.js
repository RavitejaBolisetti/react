/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, DatePicker, Collapse, Card, Divider } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';

import { expandIcon } from 'utils/accordianExpandIcon';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import { YES_NO_FLAG } from 'constants/yesNoFlag';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { CardSkeleton } from 'components/common/Skeleton';

const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { isOTFModule = false, typeData, schemeData, styles, viewOnly = true, form, isLoading = false } = props;
    const [activeKey, setactiveKey] = useState([1]);
    const [selectedSalesScheme, setSelectedSalesScheme] = useState();
    const [additionalDiscount, setAdditionalDiscount] = useState(schemeData?.corporate?.corporateAdditionalApplicableDiscount);
    const [discountRules, setDiscountRules] = useState([]);

    useEffect(() => {
        if (schemeData?.corporate?.corporateAdditionalApplicableDiscount === YES_NO_FLAG.YES?.key) {
            setDiscountRules([validateRequiredInputField(translateContent('commonModules.label.schemeAndOfferDetails.corporateAdditionalDiscount'))]);
        }
        setAdditionalDiscount(schemeData?.corporate?.corporateAdditionalApplicableDiscount);
        setSelectedSalesScheme(schemeData?.sales?.find((i) => i.active));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schemeData]);

    const handleAdditionalDisount = (value) => {
        if (value) {
            setDiscountRules([validateRequiredInputField(translateContent('commonModules.label.schemeAndOfferDetails.corporateAdditionalDiscount'))]);
            setAdditionalDiscount(value);
        } else {
            setDiscountRules([]);
        }
    };

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
        if (updatedScheme) {
            setSelectedSalesScheme({ ...updatedScheme, active: true });
            form.setFieldsValue({
                [formKey]: { ...updatedScheme, active: true, validFrom: formattedCalendarDate(updatedScheme?.validFrom), validTo: formattedCalendarDate(updatedScheme?.validTo), salesSchemeId: id || updatedScheme?.id, salesSchemeDiscountType: updatedScheme?.discountType, discountType: undefined },
            });
        } else {
            setSelectedSalesScheme();
            form.setFieldsValue({
                [formKey]: undefined,
            });
        }
    };

    const schemeFormField = ({ schemeForm, showTitle, formKey, disableTitle = true, discountTypeOption, isOTFModule }) => {
        const viewOnly = isOTFModule;
        return (
            <>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={schemeForm?.schemeType} label={translateContent('commonModules.label.schemeAndOfferDetails.schemeType')} name={[formKey, 'schemeType']}>
                            {customSelectBox({ data: showTitle ? typeData['SCHEME_TYPE'] : typeData['SALS_SCHEM_TYPE'], placeholder: preparePlaceholderSelect(translateContent('commonModules.label.schemeAndOfferDetails.schemeType')), disabled: disableTitle })}
                        </Form.Item>
                    </Col>
                    {(formKey !== 'sales' || (formKey === 'sales' && schemeForm?.schemeType === 'CD')) && (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={schemeForm?.schemeCategory} label={translateContent('commonModules.label.schemeAndOfferDetails.schemeCategory')} name={[formKey, 'schemeCategory']}>
                                <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.schemeCategory'))} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    )}
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
                        <Form.Item initialValue={schemeForm?.discountType} label={translateContent('commonModules.label.schemeAndOfferDetails.discountType')} name={[formKey, 'discountType']} rules={[validateRequiredSelectField(translateContent('commonModules.label.schemeAndOfferDetails.discountType'))]}>
                            {customSelectBox({
                                data: typeData?.[discountTypeOption],
                                placeholder: preparePlaceholderSelect(translateContent('commonModules.label.schemeAndOfferDetails.discountType')),
                                disabled: !showTitle || viewOnly,
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
                <Form.Item initialValue={schemeForm?.active} name={[formKey, 'active']} hidden />
                <Form.Item initialValue={schemeForm?.id} name={[formKey, 'id']} hidden />
                <Form.Item initialValue={schemeForm?.salesSchemeId} name={[formKey, 'salesSchemeId']} hidden />
                <Form.Item initialValue={schemeForm?.salesSchemeDiscountType} name={[formKey, 'salesSchemeDiscountType']} hidden />
            </>
        );
    };

    const corporateFormField = ({ schemeForm, discountTypeOption, formKey, isOTFModule }) => {
        const viewOnly = isOTFModule;
        return (
            <>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={schemeForm?.corporateCode} label={translateContent('commonModules.label.schemeAndOfferDetails.corporateCode')} name={[formKey, 'corporateCode']}>
                            <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.corporateCode'))} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={schemeForm?.corporateDescription} label={translateContent('commonModules.label.schemeAndOfferDetails.corporateDescription')} name={[formKey, 'corporateDescription']}>
                            <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.corporateCode'))} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={schemeForm?.corporateName} label={translateContent('commonModules.label.schemeAndOfferDetails.corporateName')} name={[formKey, 'corporateName']}>
                            <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.corporateName'))} {...disabledProps} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={schemeForm?.corporateCategory} label={translateContent('commonModules.label.schemeAndOfferDetails.corporateCategory')} name={[formKey, 'corporateCategory']} rules={[validateRequiredSelectField(translateContent('commonModules.label.schemeAndOfferDetails.corporateCategory'))]}>
                            {customSelectBox({ data: typeData?.['CORPT_CATGRY_DESC'], disabled: viewOnly, placeholder: preparePlaceholderSelect(translateContent('commonModules.label.schemeAndOfferDetails.corporateCategory')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={schemeForm?.stdDealerAmount} label={translateContent('commonModules.label.schemeAndOfferDetails.stdDealerAmount')} name={[formKey, 'stdDealerAmount']}>
                            <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.stdDealerAmount'))} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={schemeForm?.stdOEMDiscount} label={translateContent('commonModules.label.schemeAndOfferDetails.stdOEMDiscount')} name={[formKey, 'stdOEMDiscount']}>
                            <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.stdOEMDiscount'))} disabled={viewOnly} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={additionalDiscount} label={translateContent('commonModules.label.schemeAndOfferDetails.corporateAdditionalApplicableDiscount')} name={[formKey, 'corporateAdditionalApplicableDiscount']} rules={[validateRequiredSelectField(translateContent('commonModules.label.schemeAndOfferDetails.corporateAdditionalApplicableDiscount'))]}>
                            {customSelectBox({ data: Object.values(YES_NO_FLAG), disabled: viewOnly, onChange: handleAdditionalDisount, fieldNames: { key: 'key', value: 'title' }, placeholder: preparePlaceholderSelect(translateContent('commonModules.label.schemeAndOfferDetails.corporateAdditionalApplicableDiscount')) })}
                        </Form.Item>
                    </Col>

                    {additionalDiscount === YES_NO_FLAG?.YES?.key && (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={schemeForm?.corporateAdditionalDiscount} rules={discountRules} label={translateContent('commonModules.label.schemeAndOfferDetails.corporateAdditionalDiscount')} name={[formKey, 'corporateAdditionalDiscount']}>
                                <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.corporateAdditionalDiscount'))} disabled={viewOnly} />
                            </Form.Item>
                        </Col>
                    )}

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={schemeForm?.totalCorporateDiscount} label={translateContent('commonModules.label.schemeAndOfferDetails.totalCorporateDiscount')} name={[formKey, 'totalCorporateDiscount']} rules={[validateRequiredSelectField(translateContent('commonModules.label.schemeAndOfferDetails.totalCorporateDiscount'))]}>
                            <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.schemeAndOfferDetails.totalCorporateDiscount'))} {...disabledProps} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={schemeForm?.discountType} label={translateContent('commonModules.label.schemeAndOfferDetails.corporateDiscountType')} name={[formKey, 'discountType']} rules={[validateRequiredSelectField(translateContent('commonModules.label.schemeAndOfferDetails.discountType'))]}>
                            {customSelectBox({ data: typeData?.[discountTypeOption], disabled: true, placeholder: preparePlaceholderSelect(translateContent('commonModules.label.schemeAndOfferDetails.corporateDiscountType')) })}
                        </Form.Item>
                    </Col>
                </Row>
            </>
        );
    };

    const isDataExist = schemeData?.exchange || schemeData?.loyalty || schemeData?.corporate || schemeData?.sales?.length > 0;
    return isLoading ? (
        <CardSkeleton content={false} titleHeight={60} count={2} />
    ) : (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                {isDataExist ? (
                    <>
                        {schemeData?.exchange && (
                            <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                                <Panel header={translateContent('commonModules.heading.schemeAndOfferDetails.exchange')} key={1}>
                                    <Divider />
                                    {schemeFormField({ schemeForm: schemeData?.exchange, showTitle: schemeData?.exchange?.title, formKey: 'exchange', discountTypeOption: 'EXCH_MODE_OF_DIS', isOTFModule })}
                                </Panel>
                            </Collapse>
                        )}

                        {schemeData?.loyalty && (
                            <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                                <Panel header={translateContent('commonModules.heading.schemeAndOfferDetails.loyalty')} key={2}>
                                    <Divider />
                                    {schemeFormField({ schemeForm: schemeData?.loyalty, formKey: 'loyalty', discountTypeOption: 'LOYAL_MODE_OF_DIS', isOTFModule })}
                                </Panel>
                            </Collapse>
                        )}

                        {schemeData?.corporate && (
                            <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end">
                                <Panel header={translateContent('commonModules.heading.schemeAndOfferDetails.corporate')} key={3}>
                                    <Divider />
                                    {corporateFormField({ schemeForm: schemeData?.corporate, formKey: 'corporate', discountTypeOption: 'CORP_MODE_OF_DIS', isOTFModule })}
                                </Panel>
                            </Collapse>
                        )}

                        {schemeData && schemeData?.sales?.length > 0 && (
                            <Collapse expandIcon={expandIcon} collapsible="icon" activeKey={activeKey} onChange={() => onChange(4)} expandIconPosition="end">
                                <Panel header={translateContent('commonModules.heading.schemeAndOfferDetails.salesScheme')} key={4}>
                                    <Divider />
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={selectedSalesScheme?.schemeName} label={translateContent('commonModules.label.schemeAndOfferDetails.schemeName')} name={['sales', 'schemeName']}>
                                                {customSelectBox({
                                                    data: schemeData?.sales,
                                                    disabled: isOTFModule,
                                                    placeholder: preparePlaceholderSelect(translateContent('commonModules.label.schemeAndOfferDetails.schemeName')),
                                                    onChange: (value) => handleSchemeChange(value, 'sales'),
                                                    fieldNames: { key: 'id', value: 'schemeName' },
                                                })}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    {schemeFormField({ schemeForm: selectedSalesScheme, schemeList: schemeData?.sales, showTitle: true, formKey: 'sales', discountTypeOption: 'SALES_MODE_OF_DIS', isOTFModule })}
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
