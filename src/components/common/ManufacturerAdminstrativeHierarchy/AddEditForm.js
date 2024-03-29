/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Select, Switch, Button } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { AuthorityDetailPanel } from './HierarchyAuthorityDetail';

import TreeSelectField from '../TreeSelectField';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { onCloseAction, handleAttributeChange, formActionType, fieldNames, isReadOnly = false, formData, isDataAttributeLoaded, attributeData, manufacturerAdminHierarchyData } = props;
    const { selectedTreeKey, selectedTreeSelectKey, setSelectedTreeSelectKey, handleSelectTreeClick, flatternData } = props;
    const { isFormBtnActive, setFormBtnActive } = props;
    const { onFinish, EDIT_ACTION } = props;
    const { attributeDataOptions, setattributeDataOptions } = props;
    const disabledProps = { disabled: EDIT_ACTION === formActionType ? true : false };
    const [form] = Form.useForm();
    const treeFieldNames = { ...fieldNames, label: fieldNames?.title, value: fieldNames?.key };

    useEffect(() => {
        const arr = [];
        const newOptions = [];
        if (attributeDataOptions && attributeDataOptions?.length) {
            attributeData?.map((element) => {
                if (!element?.status) {
                    arr.push(element?.hierarchyAttribueName);
                }
                return undefined;
            });

            attributeDataOptions?.map((element) => {
                if (arr?.includes(element?.hierarchyAttribueName)) {
                    newOptions.push({ ...element, disabled: true });
                } else {
                    newOptions.push({ ...element, disabled: false });
                }
                return undefined;
            });
            setattributeDataOptions(newOptions);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attributeData]);

    let treeCodeId = '';
    let treeCodeReadOnly = false;
    if (formActionType === FROM_ACTION_TYPE.EDIT) {
        treeCodeId = formData?.manufactureAdminParntId;
    } else if (formActionType === FROM_ACTION_TYPE.CHILD) {
        treeCodeId = selectedTreeKey && selectedTreeKey[0];
        treeCodeReadOnly = true;
    } else if (formActionType === FROM_ACTION_TYPE.SIBLING) {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => i.key === selectedTreeKey[0]);
        treeCodeId = treeCodeData?.data?.manufactureAdminParntId;
        if (treeCodeId === 'null') treeCodeId = 'DMS';
    }

    useEffect(() => {
        setSelectedTreeSelectKey(treeCodeId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeCodeId]);

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: manufacturerAdminHierarchyData,
        treeDisabled: treeCodeReadOnly || isReadOnly,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect('parent'),
    };

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    return (
        <>
            <div className={styles.drawerBodyNew}>
                <Form autoComplete="off" form={form} id="myForm" layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="attributeKey" label={translateContent('adminHierarchy.label.attributeLevel')} initialValue={formData?.attributeKey} rules={[validateRequiredSelectField(translateContent('adminHierarchy.validation.attributeLevel'))]}>
                                <Select options={attributeDataOptions} fieldNames={{ label: 'hierarchyAttribueName', value: 'id' }} onChange={handleAttributeChange} loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect(translateContent('adminHierarchy.placeholder.attributeLevel'))} {...disabledProps} showSearch allowClear />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padRight18}>
                            <Form.Item initialValue={treeCodeId} label={translateContent('adminHierarchy.label.parent')} name="manufactureAdminParntId">
                                <TreeSelectField {...treeSelectFieldProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="manufactureAdminCode" label={translateContent('adminHierarchy.label.code')} initialValue={formData?.manufactureAdminCode} rules={[validateRequiredInputField(translateContent('adminHierarchy.validation.codeValidation')), validationFieldLetterAndNumber(translateContent('adminHierarchy.validation.codeValidation'))]}>
                                <Input placeholder={preparePlaceholderText(translateContent('adminHierarchy.placeholder.code'))} maxLength={6} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="manufactureAdminShortName" label={translateContent('adminHierarchy.label.shortDescription')} initialValue={formData?.manufactureAdminShortName} rules={[validateRequiredInputField(translateContent('adminHierarchy.validation.shortDescription'))]}>
                                <Input placeholder={preparePlaceholderText(translateContent('adminHierarchy.placeholder.shortDescription'))} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                            <Form.Item name="manufactureAdminLongName" label={translateContent('adminHierarchy.label.longDescription')} initialValue={formData?.manufactureAdminLongName} rules={[validateRequiredInputField(translateContent('adminHierarchy.validation.longDescription'))]}>
                                <TextArea maxLength={300} placeholder={preparePlaceholderText(translateContent('adminHierarchy.placeholder.longDescription'))} showCount {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={typeof formData?.status === 'boolean' ? formData?.status : true} label={translateContent('global.label.status')} name="status">
                                <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} defaultChecked={typeof formData?.status === 'boolean' ? formData?.status : true} onChange={(checked) => (checked ? 1 : 0)} />
                            </Form.Item>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                            <Form.Item hidden name="isModified" initialValue={formData?.id ? true : false}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20} className={styles.formFooterNew}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                            <Button danger onClick={onCloseAction}>
                                {translateContent('global.buttons.cancel')}
                            </Button>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                            <Button htmlType="submit" type="primary" disabled={!isFormBtnActive}>
                                {translateContent('global.buttons.save')}
                            </Button>
                        </Col>
                    </Row>
                </Form>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <AuthorityDetailPanel {...props} formActionType={formActionType} handleFormValueChange={handleFormValueChange} />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
