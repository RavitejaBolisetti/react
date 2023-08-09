/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Input, Form, Collapse, Col, Row, Switch, Select, Button } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import TreeSelectField from '../TreeSelectField';
import ProductAttributeMaster from './ProductAttribute/ProductAttributeMaster';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';

import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onCloseAction, handleAttributeChange, unFilteredAttributeData, formActionType, isReadOnly = false, formData, fieldNames, isDataAttributeLoaded, attributeData, productHierarchyAttributeData, showProductAttribute, selectedTreeData, setShowProductAttribute } = props;
    const { isFormBtnActive, setFormBtnActive, showGlobalNotification, disabledEdit, setDisabledEdit } = props;
    const { form, skuAttributes, setSKUAttributes, fetchListHierarchyAttributeName, listShowLoading, userId, isVisible } = props;
    const { selectedTreeKey, flatternData, setSelectedTreeSelectKey, selectedTreeSelectKey, handleSelectTreeClick, productHierarchyData } = props;

    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    const [openAccordian, setOpenAccordian] = useState(1);
    const [isAddBtnDisabled, setAddBtnDisabled] = useState(false);

    const { onFinish, onFinishFailed } = props;

    const disabledProps = { disabled: isReadOnly };

    const productSKUKey = '63ec10a2-520d-44a4-85f6-f55a1d6911f3';

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

    useEffect(() => {
        if (userId) {
            fetchListHierarchyAttributeName({ userId, setIsLoading: listShowLoading });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (formActionType === FROM_ACTION_TYPE.CHILD || formActionType === FROM_ACTION_TYPE.SIBLING) {
            setShowProductAttribute(false);
        }
        if (formActionType === FROM_ACTION_TYPE.EDIT) {
            setShowProductAttribute(selectedTreeData?.attributeKey === productSKUKey);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType, selectedTreeData]);

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };
    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    let treeCodeId = '';
    let treeCodeReadOnly = false;

    if (formActionType === FROM_ACTION_TYPE.EDIT || formActionType === FROM_ACTION_TYPE.VIEW) {
        treeCodeId = formData?.parntProdctId;
    } else if (formActionType === FROM_ACTION_TYPE.CHILD) {
        treeCodeId = selectedTreeKey && selectedTreeKey[0];
        treeCodeReadOnly = true;
    } else if (formActionType === FROM_ACTION_TYPE.SIBLING) {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => i.key === selectedTreeKey[0]);
        treeCodeId = treeCodeData && treeCodeData?.data?.parntProdctId;
    }

    useEffect(() => {
        setSelectedTreeSelectKey(!!treeCodeId ? treeCodeId : '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeCodeId]);

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: productHierarchyData,
        treeDisabled: treeCodeReadOnly || isReadOnly,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect('Parent'),
    };

    const attributeFormProps = {
        form,
        skuAttributes,
        // formData?.skuAttributes,
        setSKUAttributes,
        isAddBtnDisabled,
        setAddBtnDisabled,
        // onFinish: onActionFormFinish,
        setFormBtnActive,
        productHierarchyAttributeData,
        isVisible,
        selectedTreeData,
        formActionType,
        showGlobalNotification,
        disabledEdit,
        setDisabledEdit,
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };

    return (
        <>
            <div className={styles.drawerBodyNew}>
                <Form form={form} id="myForm" autoComplete="off" layout="vertical" onFinish={onFinish} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinishFailed={onFinishFailed}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.attributeKey} name="attributeKey" label="Attribute Level" rules={[validateRequiredSelectField('attribute level')]}>
                                <Select {...selectProps} onChange={handleAttributeChange} loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect('attribute level')} disabled={formData?.id || isReadOnly}>
                                    {attributeData?.map((item) => (
                                        <Option key={item?.id} value={item?.id}>
                                            {item?.hierarchyAttribueName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={treeCodeId} label="Parent" name="parntProdctId">
                                <TreeSelectField {...treeSelectFieldProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Code" name="prodctCode" initialValue={formData?.prodctCode} rules={[validateRequiredInputField('code')]}>
                                <Input placeholder={preparePlaceholderText('code')} maxLength={6} disabled={formData?.id || isReadOnly} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="prodctShrtName" label="Short Description" initialValue={formData?.prodctShrtName} rules={[validateRequiredInputField('short description')]}>
                                <Input placeholder={preparePlaceholderText('short description')} maxLength={50} disabled={formData?.id || isReadOnly} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="prodctLongName" label="Long Description" initialValue={formData?.prodctLongName} rules={[validateRequiredInputField('long description')]}>
                                <TextArea placeholder={preparePlaceholderText('long description')} maxLength={300} showCount disabled={formData?.id || isReadOnly} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formActionType === 'child' || formActionType === 'sibling' ? true : formData?.active ? true : false} label="Status" name="active">
                                <Switch value={formActionType === 'child' || formActionType === 'sibling' ? true : formData?.active ? true : false} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={formActionType === 'child' || formActionType === 'sibling' ? true : formData?.active === true || null || undefined ? true : false} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {showProductAttribute && (
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item hidden name={'adAmHirchyAttrbtMstSk'} initialValue={formData?.attributeKey}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    )}

                    <Row gutter={20} className={styles.formFooterNew}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                            <Button danger onClick={onCloseAction}>
                                Cancel
                            </Button>
                        </Col>

                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                            <Button htmlType="submit" form="myForm" disabled={!isFormBtnActive} type="primary">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Form>
                {showProductAttribute && (
                    <Collapse className={openAccordian === 1 ? styles.accordianHeader : ''} onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon}>
                        <Panel header="Product Atrribute Details" key="1">
                            <ProductAttributeMaster {...attributeFormProps} />
                        </Panel>
                    </Collapse>
                )}
            </div>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
