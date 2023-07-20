/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, Button, InputNumber } from 'antd';
import TreeSelectField from 'components/common/TreeSelectField';
import { validateRequiredInputField, validateRequiredSelectField, valueOfPer, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import styles from 'components/common/Common.module.css';
import { CALCULTION_TYPE } from './AttributeTypeConstant';
import { TAX_CHARGES_TYPE } from 'constants/modules/taxChargesType';
import { customSelectBox } from 'utils/customSelectBox';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

const { Option } = Select;
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { typeData, onCloseAction, unFilteredAttributeData, documentDescription, setSelectedTreeSelectKey, financialAccount, flatternData, fieldNames, formActionType, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, handleSelectTreeClick, manufacturerOrgHierarchyData, attributeType, setAttributeType } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed } = props;

    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    const disabledProps = { disabled: isReadOnly };
    const [form] = Form.useForm();
    const [calType, setCalType] = useState(null);

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

    if (formActionType === FROM_ACTION_TYPE.EDIT || formActionType === FROM_ACTION_TYPE.VIEW) {
        treeCodeId = formData?.parentCode;
    } else if (formActionType === FROM_ACTION_TYPE.CHILD) {
        treeCodeId = selectedTreeKey && selectedTreeKey[0];
        treeCodeReadOnly = true;
    } else if (formActionType === FROM_ACTION_TYPE.SIBLING) {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => i.key === selectedTreeKey[0]);
        treeCodeId = treeCodeData && treeCodeData?.data?.parentCode;
    }

    useEffect(() => {
        setSelectedTreeSelectKey(treeCodeId);
        setAttributeType(formData?.attributeTypeCode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeCodeId]);

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: manufacturerOrgHierarchyData,
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
    };

    return (
        <>
            <Form autoComplete="off" form={form} layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item initialValue={formData?.attributeTypeCode} name="attributeTypeCode" label="Attribute Type" rules={[validateRequiredSelectField('Attribute Type Code')]}>
                            {customSelectBox({ data: attributeData, fieldNames: { key: 'hierarchyAttribueCode', value: 'hierarchyAttribueName' }, onChange: handleAttributeChange, loading: !isDataAttributeLoaded, placeholder: preparePlaceholderSelect('Attribute Type Code'), disabled: formData?.taxChargesTypeCode || isReadOnly })}
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padRight18}>
                        <Form.Item initialValue={treeCodeId} label="Parent" name="parentCode">
                            <TreeSelectField {...treeSelectFieldProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item initialValue={formData?.taxChargesTypeCode} label="Tax/Charge Type Code" name="taxChargesTypeCode" rules={[validateRequiredInputField('Tax/Charge Type Code')]}>
                            <Input maxLength={6} placeholder={preparePlaceholderText('Tax/Charge Type Code')} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item initialValue={formData?.taxChargesTypeDescription} label="Tax/Charge Type Descrption" name="taxChargesTypeDescription" rules={[validateRequiredInputField('Tax/Charge Type Descrption')]}>
                            <TextArea className={styles.inputBox} placeholder={preparePlaceholderText('Tax/Charge Type Descrption')} disabled={formData?.id || isReadOnly} />
                        </Form.Item>
                    </Col>
                </Row>

                {attributeType === TAX_CHARGES_TYPE?.TAX_CHARGES_TYPE_CALCULATION?.KEY ? (
                    <>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item label="Calculation Type" name="calculationType" rules={[validateRequiredInputField('Calculation_Type')]}>
                                    {customSelectBox({ data: typeData?.CAL_TYPE, placeholder: preparePlaceholderSelect('Calculation Type'), onChange: calTypeFun })}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            {calType === CALCULTION_TYPE[1]?.key ? (
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item initialValue={null} label="Percentage" name="percentage" rules={[validateRequiredInputField('Percentage'), valueOfPer('Percentage')]}>
                                        <InputNumber placeholder={preparePlaceholderText('Percentage')} className={styles.inputBox} type="number" />
                                    </Form.Item>
                                </Col>
                            ) : calType === CALCULTION_TYPE[0]?.key ? (
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item initialValue={null} label="Rate" name="rate" rules={[validateRequiredInputField('Rate'), validateNumberWithTwoDecimalPlaces('Rate')]}>
                                        <InputNumber placeholder={preparePlaceholderText('Rate')} className={styles.inputBox} type="number" />
                                    </Form.Item>
                                </Col>
                            ) : null}
                        </Row>
                    </>
                ) : attributeType === TAX_CHARGES_TYPE?.TAX_CHARGES_TYPE_ACCOUNT_AND_DOCUMENT_MAPPING?.KEY ? (
                    <>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item name="documentTypeCode" label="Document Description" rules={[validateRequiredSelectField('Document Description')]}>
                                    <Select loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect('Document Description')} disabled={formData?.id || isReadOnly} showSearch allowClear>
                                        {documentDescription?.map((item) => (
                                            <Option key={'005cc66b-6bb8-4861-83fc-724697eedaa4'} value={'005cc66b-6bb8-4861-83fc-724697eedaa4'}>
                                                {item?.documentDescription}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item name="financialAccountHeadCode" label="Financial Account Head" rules={[validateRequiredSelectField('Financial Account Head')]}>
                                    <Select loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect('Financial Account Head')} disabled={formData?.id || isReadOnly}>
                                        {financialAccount?.map((item) => (
                                            <Option key={item?.id} value={item?.key}>
                                                {item?.value}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                ) : null}

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padLeft10}>
                        <Form.Item initialValue={formData?.status === null || false ? false : true} label="Status" name="status">
                            <Switch value={formData?.status === null || false ? false : true} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={formActionType === 'child' || formActionType === 'sibling' ? true : formData?.active === true || null || undefined ? true : false} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20} className={styles.formFooter}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                        <Button danger onClick={onCloseAction}>
                            Cancel
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                        <Button data-testid="isFormBtnActive" htmlType="submit" danger disabled={!isFormBtnActive}>
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
