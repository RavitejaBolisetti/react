/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Select, Switch, Button } from 'antd';
import TreeSelectField from '../TreeSelectField';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import styles from 'assets/sass/app.module.scss';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

const { Option } = Select;
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { onCloseAction, handleAttributeChange, unFilteredAttributeData, setSelectedTreeSelectKey, flatternData, fieldNames, formActionType, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, handleSelectTreeClick, manufacturerOrgHierarchyData } = props;
    const { isFormBtnActive, setFormBtnActive } = props;
    const { onFinish, onFinishFailed } = props;
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    const disabledProps = { disabled: isReadOnly };
    const [form] = Form.useForm();

    let attributeHierarchyFieldValidation = {
        rules: [validateRequiredSelectField('attribute level')],
    };
    if (attributeData && formData?.attributeKey) {
        if (attributeData.find((attribute) => attribute.id === formData?.attributeKey)) {
            attributeHierarchyFieldValidation.initialValue = formData?.attributeKey;
        } else {
            const Attribute = unFilteredAttributeData?.find((attribute) => attribute.id === formData?.attributeKey);
            if (Attribute) {
                attributeHierarchyFieldValidation.initialValue = Attribute?.hierarchyAttribueName;
                attributeHierarchyFieldValidation.rules.push({ type: 'number', message: Attribute?.hierarchyAttribueName + ' is not active anymore. Please select a different attribute. ' });
            }
        }
    }

    let treeCodeId = '';
    let treeCodeReadOnly = false;

    if (formActionType === FROM_ACTION_TYPE.EDIT || formActionType === FROM_ACTION_TYPE.VIEW) {
        treeCodeId = formData?.manufactureOrgParntId;
    } else if (formActionType === FROM_ACTION_TYPE.CHILD) {
        treeCodeId = selectedTreeKey && selectedTreeKey[0];
        treeCodeReadOnly = true;
    } else if (formActionType === FROM_ACTION_TYPE.SIBLING) {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => i.key === selectedTreeKey[0]);
        treeCodeId = treeCodeData && treeCodeData?.data?.manufactureOrgParntId;
    }

    useEffect(() => {
        setSelectedTreeSelectKey(treeCodeId);
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
    return (
        <>
            <Form autoComplete="off" form={form} layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.attributeKey} name="attributeKey" label="Attribute Type" rules={[validateRequiredSelectField('Attribute Type Code')]}>
                                    <Select onChange={handleAttributeChange} loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect('Attribute Type Code')} disabled={formData?.id || isReadOnly} showSearch allowClear>
                                        {attributeData?.map((item) => (
                                            <Option key={item?.id} value={item?.id}>
                                                {item?.hierarchyAttribueName}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={treeCodeId} label="Parent" name="manufactureOrgParntId">
                                    <TreeSelectField {...treeSelectFieldProps} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.manufactureOrgCode} label="Hierarchy Code" name="manufactureOrgCode" rules={[validateRequiredInputField('Code')]}>
                                    <Input maxLength={6} placeholder={preparePlaceholderText('Attribute Code')} disabled={formData?.id || isReadOnly} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item name="manufactureOrgShrtName" label="Short Description" initialValue={formData?.manufactureOrgShrtName} rules={[validateRequiredInputField('Short Description')]}>
                                    <Input placeholder={preparePlaceholderText('Short Description')} disabled={formData?.id || isReadOnly} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                                <Form.Item name="manufactureOrgLongName" label="Long Description" placeholder={preparePlaceholderSelect('Long Description')} initialValue={formData?.manufactureOrgLongName} rules={[validateRequiredInputField('Long Description')]}>
                                    <TextArea placeholder={preparePlaceholderText('Long Description')} maxLength={300} disabled={formData?.id || isReadOnly} showCount />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.active === null || false ? false : true} label="Status" name="active">
                                    <Switch value={formData?.active === null || false ? false : true} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={formActionType === 'child' || formActionType === 'sibling' ? true : formData?.active === true || null || undefined ? true : false} {...disabledProps} />
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
                            <Button data-testid="isFormBtnActive" htmlType="submit" type="primary" disabled={!isFormBtnActive}>
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
