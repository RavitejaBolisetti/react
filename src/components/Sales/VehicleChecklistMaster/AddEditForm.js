/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Switch, Button } from 'antd';
import TreeSelectField from 'components/common/TreeSelectField';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';

import styles from 'assets/sass/app.module.scss';

import { ATTRIBUTE_LEVEL } from 'constants/modules/VehicleCheckListMaster/attributeType';

import { customSelectBox } from 'utils/customSelectBox';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { typeData, VehicleChecklistMasterList, onCloseAction, unFilteredAttributeData, documentDescription, setSelectedTreeSelectKey, financialAccount, flatternData, fieldNames, formActionType, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, handleSelectTreeClick, attributeType, setAttributeType, VehicleChecklistAttributeLov } = props;
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

    useEffect(() => {
        form.setFieldsValue(formData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    let treeCodeId = '';
    let treeCodeReadOnly = false;
    let attributeCode = '';

    const taxChargeTypeList = Object.values('');

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: VehicleChecklistMasterList,
        treeDisabled: true,
        //formActionType === `child` || formActionType === `sibling`,
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
    console.log(`attributeType`, attributeType);
    return (
        <>
            <Form autoComplete="off" form={form} layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item name="attributeLevel" label="Attribute Type" rules={[validateRequiredSelectField('Attribute Type Code')]}>
                                    {customSelectBox({ data: VehicleChecklistAttributeLov, onChange: handleAttributeChange, placeholder: preparePlaceholderSelect('Attribute Type Code'), disabled: true })}
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item label="Parent" name="parentCode">
                                    <TreeSelectField {...treeSelectFieldProps} />
                                </Form.Item>
                            </Col>
                        </Row>

                        {attributeType === ATTRIBUTE_LEVEL?.[0]?.key ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item label="Group Code" name="code" rules={[validateRequiredInputField('Group Code')]}>
                                            <Input maxLength={6} placeholder={preparePlaceholderText('Group Code')} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                                        <Form.Item label="Group Description" name="descriptionTitle" rules={[validateRequiredInputField('Group Description')]}>
                                            <TextArea maxLength={300} placeholder={preparePlaceholderText('Group Description')} showCount />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        ) : attributeType === ATTRIBUTE_LEVEL?.[1]?.key ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="code" label="Sub Group Code" rules={[validateRequiredSelectField('Document Description')]}>
                                            <Input maxLength={6} placeholder={preparePlaceholderText('Group Code')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="descriptionTitle" label="Sub Group Description" rules={[validateRequiredSelectField('Financial Account Head')]}>
                                            <TextArea maxLength={300} placeholder={preparePlaceholderText('Group Description')} showCount />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        ) : attributeType === ATTRIBUTE_LEVEL?.[2]?.key ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="code" label="Checklist Code" rules={[validateRequiredSelectField('Checklist Code')]}>
                                            <Input maxLength={6} placeholder={preparePlaceholderText('Checklist Code')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="descriptionTitle" label="Checklist Description" rules={[validateRequiredSelectField('Checklist Description')]}>
                                            <TextArea maxLength={300} placeholder={preparePlaceholderText('Checklist Description')} showCount />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        ) : attributeType === ATTRIBUTE_LEVEL?.[3]?.key ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="code" label="Answer Type" rules={[validateRequiredSelectField('Document Description')]}>
                                            {customSelectBox({ data: documentDescription, fieldNames: { key: 'id', value: 'documentDescription' }, placeholder: preparePlaceholderSelect('Document Description') })}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="descriptionTitle" label="Attachment Required" rules={[validateRequiredSelectField('Financial Account Head')]}>
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
                            <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                                <Form.Item name="id" label="" />
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
