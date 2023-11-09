/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Switch, Button, InputNumber } from 'antd';
import TreeSelectField from 'components/common/TreeSelectField';
import { validateRequiredInputField, validateRequiredSelectField, valueOfPer, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';

import styles from 'assets/sass/app.module.scss';

import { TAX_CHARGES_TYPE } from 'constants/modules/taxChargesType';
import { TAX_CHARGES_CALCULATION_TYPE } from 'constants/modules/taxChargesCalculationType';

import { customSelectBox } from 'utils/customSelectBox';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';

const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { typeData, onCloseAction, unFilteredAttributeData, documentDescription, setSelectedTreeSelectKey, financialAccount, flatternData, fieldNames, formActionType, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, handleSelectTreeClick, taxChargeData, attributeType, setAttributeType, setCalType, calculationType, setCalculationType } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish } = props;

    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    const disabledProps = { disabled: isReadOnly };
    const [form] = Form.useForm();

    let attributeHierarchyFieldValidation = {
        rules: [validateRequiredSelectField(translateContent('taxCharges.validation.attributeLevel'))],
    };
    if (attributeData && formData?.attributeTypeCode) {
        if (attributeData.find((attribute) => attribute.id === formData?.attributeTypeCode)) {
            attributeHierarchyFieldValidation.initialValue = formData?.attributeTypeCode;
        } else {
            const Attribute = unFilteredAttributeData?.find((attribute) => attribute.id === formData?.attributeTypeCode);
            if (Attribute) {
                attributeHierarchyFieldValidation.initialValue = Attribute?.hierarchyAttribueName;
                attributeHierarchyFieldValidation.rules.push({ type: 'number', message: Attribute?.hierarchyAttribueName + translateContent('taxCharges.validation.message') });
            }
        }
    }

    let treeCodeId = '';
    let treeCodeReadOnly = false;
    let attributeCode = '';

    const taxChargeTypeList = Object.values(TAX_CHARGES_TYPE);

    if (formActionType === FROM_ACTION_TYPE.EDIT || formActionType === FROM_ACTION_TYPE.VIEW) {
        treeCodeId = formData?.parentCode;
        attributeCode = formData?.attributeTypeCode;
        setAttributeType(attributeCode);
    } else if (formActionType === FROM_ACTION_TYPE.CHILD) {
        treeCodeId = selectedTreeKey && selectedTreeKey[0];
        treeCodeReadOnly = true;
        attributeCode = formData?.attributeTypeCode;
        const treeCodeData = flatternData.find((i) => i.key === treeCodeId);
        const currentAttributeOrder = taxChargeTypeList?.find((i) => i.KEY === treeCodeData?.data?.attributeTypeCode)?.ORDER;
        const childAttribute = taxChargeTypeList?.find((i) => i?.ORDER > currentAttributeOrder);
        attributeCode = childAttribute?.KEY;
        setAttributeType(attributeCode);
    } else if (formActionType === FROM_ACTION_TYPE.SIBLING) {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => i.key === selectedTreeKey[0]);
        treeCodeId = treeCodeData && treeCodeData?.data?.parentCode;
        const currentAttribute = taxChargeTypeList?.find((i) => i.KEY === treeCodeData?.data?.attributeTypeCode);
        attributeCode = currentAttribute?.KEY;
        setAttributeType(attributeCode);
    } else {
        const currentAttribute = taxChargeTypeList?.find((i) => i.ORDER);
        attributeCode = currentAttribute?.KEY;
        setAttributeType(attributeCode);
    }

    useEffect(() => {
        setSelectedTreeSelectKey(treeCodeId);
        setAttributeType(formData?.attributeTypeCode);
        setCalculationType(formData?.calculationType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeCodeId]);

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: taxChargeData,
        treeDisabled: treeCodeReadOnly || isReadOnly,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect(translateContent('taxCharges.validation.parent')),
    };

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const handleAttributeChange = (props) => {
        setAttributeType(props);
    };

    const calTypeFun = (val) => {
        setCalType(val);
        setCalculationType(val);
    };

    return (
        <>
            <Form autoComplete="off" form={form} layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={attributeCode} name="attributeTypeCode" label={translateContent('taxCharges.label.attributeLevel')} rules={[validateRequiredSelectField(translateContent('taxCharges.validation.attributeTypeCode'))]}>
                                    {customSelectBox({ data: attributeData, fieldNames: { key: 'hierarchyAttribueCode', value: 'hierarchyAttribueName' }, onChange: handleAttributeChange, loading: !isDataAttributeLoaded, placeholder: preparePlaceholderSelect(translateContent('taxCharges.validation.attributeTypeCode')), disabled: true })}
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={treeCodeId} label={translateContent('taxCharges.label.parent')} name="parentCode">
                                    <TreeSelectField {...treeSelectFieldProps} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.taxChargesTypeCode} label={translateContent('taxCharges.label.taxTypeCode')} name="taxChargesTypeCode" rules={[validateRequiredInputField(translateContent('taxCharges.label.taxTypeCode'))]}>
                                    <Input maxLength={6} placeholder={preparePlaceholderText(translateContent('taxCharges.label.taxTypeCode'))} disabled={formData?.attributeTypeCode || isReadOnly} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                                <Form.Item initialValue={formData?.taxChargesTypeDescription} label={translateContent('taxCharges.label.taxTypeDescription')} name="taxChargesTypeDescription" rules={[validateRequiredInputField(translateContent('taxCharges.label.taxTypeDescription'))]}>
                                    <TextArea maxLength={300} placeholder={preparePlaceholderText(translateContent('taxCharges.label.taxTypeDescription'))} showCount />
                                </Form.Item>
                            </Col>
                        </Row>

                        {attributeType === TAX_CHARGES_TYPE?.TAX_CHARGES_TYPE_CALCULATION?.KEY ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item initialValue={formData?.calculationType} label={translateContent('taxCharges.label.calculationType')} name="calculationType" rules={[validateRequiredInputField(translateContent('taxCharges.label.calculationType'))]}>
                                            {customSelectBox({ data: typeData?.CAL_TYPE, placeholder: preparePlaceholderSelect(translateContent('taxCharges.label.calculationType')), onChange: calTypeFun })}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    {calculationType === TAX_CHARGES_CALCULATION_TYPE?.PERCENTAGE?.KEY ? (
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Form.Item initialValue={formData?.percentage} label={translateContent('taxCharges.label.percentage')} name="percentage" rules={[validateRequiredInputField(translateContent('taxCharges.label.percentage')), valueOfPer(translateContent('taxCharges.label.percentage'))]}>
                                                <InputNumber placeholder={preparePlaceholderText(translateContent('taxCharges.label.percentage'))} type="number" />
                                            </Form.Item>
                                        </Col>
                                    ) : calculationType === TAX_CHARGES_CALCULATION_TYPE?.AMOUNT?.KEY ? (
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Form.Item initialValue={formData?.rate} label={translateContent('taxCharges.label.rate')} name="rate" rules={[validateRequiredInputField(translateContent('taxCharges.label.rate')), validateNumberWithTwoDecimalPlaces(translateContent('taxCharges.validation.decimalPlaces'))]}>
                                                <InputNumber placeholder={preparePlaceholderText(translateContent('taxCharges.label.rate'))} type="number" step="any" />
                                            </Form.Item>
                                        </Col>
                                    ) : null}
                                </Row>
                            </>
                        ) : attributeType === TAX_CHARGES_TYPE?.TAX_CHARGES_TYPE_ACCOUNT_AND_DOCUMENT_MAPPING?.KEY ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item initialValue={formData?.documentTypeCode} name="documentTypeCode" label={translateContent('taxCharges.label.documentDescription')} rules={[validateRequiredSelectField(translateContent('taxCharges.label.documentDescription'))]}>
                                            {customSelectBox({ data: documentDescription, fieldNames: { key: 'id', value: 'documentDescription' }, placeholder: preparePlaceholderSelect(translateContent('taxCharges.label.documentDescription')) })}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item initialValue={formData?.financialAccountHeadCode} name="financialAccountHeadCode" label={translateContent('taxCharges.label.financialHead')} rules={[validateRequiredSelectField(translateContent('taxCharges.label.financialHead'))]}>
                                            {customSelectBox({ data: financialAccount, placeholder: preparePlaceholderSelect(translateContent('taxCharges.label.financialHead')) })}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        ) : null}

                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formActionType === FROM_ACTION_TYPE.CHILD || formActionType === FROM_ACTION_TYPE.SIBLING ? true : formData?.status ? true : false} label={translateContent('taxCharges.label.status')} name="status">
                                    <Switch value={formActionType === FROM_ACTION_TYPE.CHILD || formActionType === FROM_ACTION_TYPE.SIBLING ? true : formData?.status ? true : false} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={formActionType === FROM_ACTION_TYPE.CHILD || formActionType === FROM_ACTION_TYPE.SIBLING ? true : formData?.status === true || null || undefined ? true : false} {...disabledProps} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <div className={styles.formFooter}>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                            <Button danger onClick={onCloseAction}>
                                {translateContent('global.buttons.cancel')}
                            </Button>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                            <Button data-testid="isFormBtnActive" htmlType="submit" danger disabled={!isFormBtnActive}>
                                {translateContent('global.buttons.save')}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
