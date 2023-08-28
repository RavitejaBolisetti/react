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
//import styles from 'components/common/Common.module.css';

import { TAX_CHARGES_TYPE } from 'constants/modules/taxChargesType';
import { TAX_CHARGES_CALCULATION_TYPE } from 'constants/modules/taxChargesCalculationType';

import { customSelectBox } from 'utils/customSelectBox';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { typeData, onCloseAction, unFilteredAttributeData, documentDescription, setSelectedTreeSelectKey, financialAccount, flatternData, fieldNames, formActionType, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, handleSelectTreeClick, taxChargeData, attributeType, setAttributeType, setCalType, calculationType, setCalculationType } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed } = props;

    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    const disabledProps = { disabled: isReadOnly };
    const [form] = Form.useForm();

    let attributeHierarchyFieldValidation = {
        rules: [validateRequiredSelectField('attribute level')],
    };
    if (attributeData && formData?.attributeTypeCode) {
        if (attributeData.find((attribute) => attribute.id === formData?.attributeTypeCode)) {
            attributeHierarchyFieldValidation.initialValue = formData?.attributeTypeCode;
        } else {
            const Attribute = unFilteredAttributeData?.find((attribute) => attribute.id === formData?.attributeTypeCode);
            if (Attribute) {
                attributeHierarchyFieldValidation.initialValue = Attribute?.hierarchyAttribueName;
                attributeHierarchyFieldValidation.rules.push({ type: 'number', message: Attribute?.hierarchyAttribueName + ' is not active anymore. Please select a different attribute. ' });
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
        placeholder: preparePlaceholderSelect('Parent'),
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
            <Form autoComplete="off" form={form} layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={attributeCode} name="attributeTypeCode" label="Attribute Type" rules={[validateRequiredSelectField('Attribute Type Code')]}>
                                    {customSelectBox({ data: attributeData, fieldNames: { key: 'hierarchyAttribueCode', value: 'hierarchyAttribueName' }, onChange: handleAttributeChange, loading: !isDataAttributeLoaded, placeholder: preparePlaceholderSelect('Attribute Type Code'), disabled: true })}
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={treeCodeId} label="Parent" name="parentCode">
                                    <TreeSelectField {...treeSelectFieldProps} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.taxChargesTypeCode} label="Tax/Charge Type Code" name="taxChargesTypeCode" rules={[validateRequiredInputField('Tax/Charge Type Code')]}>
                                    <Input maxLength={6} placeholder={preparePlaceholderText('Tax/Charge Type Code')} disabled={formData?.attributeTypeCode || isReadOnly} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                                <Form.Item initialValue={formData?.taxChargesTypeDescription} label="Tax/Charge Type Descrption" name="taxChargesTypeDescription" rules={[validateRequiredInputField('Tax/Charge Type Descrption')]}>
                                    <TextArea maxLength={300} placeholder={preparePlaceholderText('Tax/Charge Type Descrption')} showCount />
                                </Form.Item>
                            </Col>
                        </Row>

                        {attributeType === TAX_CHARGES_TYPE?.TAX_CHARGES_TYPE_CALCULATION?.KEY ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item initialValue={formData?.calculationType} label="Calculation Type" name="calculationType" rules={[validateRequiredInputField('Calculation_Type')]}>
                                            {customSelectBox({ data: typeData?.CAL_TYPE, placeholder: preparePlaceholderSelect('Calculation Type'), onChange: calTypeFun })}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    {calculationType === TAX_CHARGES_CALCULATION_TYPE?.PERCENTAGE?.KEY ? (
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Form.Item initialValue={formData?.percentage} label="Percentage" name="percentage" rules={[validateRequiredInputField('Percentage'), valueOfPer('Percentage')]}>
                                                <InputNumber placeholder={preparePlaceholderText('Percentage')} type="number" />
                                            </Form.Item>
                                        </Col>
                                    ) : calculationType === TAX_CHARGES_CALCULATION_TYPE?.AMOUNT?.KEY ? (
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Form.Item initialValue={formData?.rate} label="Rate" name="rate" rules={[validateRequiredInputField('Rate'), validateNumberWithTwoDecimalPlaces('rate with two decimal places')]}>
                                                <InputNumber placeholder={preparePlaceholderText('Rate')} type="number" step="any" />
                                            </Form.Item>
                                        </Col>
                                    ) : null}
                                </Row>
                            </>
                        ) : attributeType === TAX_CHARGES_TYPE?.TAX_CHARGES_TYPE_ACCOUNT_AND_DOCUMENT_MAPPING?.KEY ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item initialValue={formData?.documentTypeCode} name="documentTypeCode" label="Document Description" rules={[validateRequiredSelectField('Document Description')]}>
                                            {customSelectBox({ data: documentDescription, fieldNames: { key: 'id', value: 'documentDescription' }, placeholder: preparePlaceholderSelect('Document Description') })}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item initialValue={formData?.financialAccountHeadCode} name="financialAccountHeadCode" label="Financial Account Head" rules={[validateRequiredSelectField('Financial Account Head')]}>
                                            {customSelectBox({ data: financialAccount, placeholder: preparePlaceholderSelect('Financial Account Head') })}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        ) : null}

                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formActionType === FROM_ACTION_TYPE.CHILD || formActionType === FROM_ACTION_TYPE.SIBLING ? true : formData?.status ? true : false} label="Status" name="status">
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
                                Cancel
                            </Button>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                            <Button data-testid="isFormBtnActive" htmlType="submit" danger disabled={!isFormBtnActive}>
                                Save
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
