import React, { useEffect, useState } from 'react';
import { Input, Form, Collapse, Col, Row, Switch, Select, Button } from 'antd';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';
import { withDrawer } from 'components/withDrawer';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import TreeSelectField from '../TreeSelectField';

import ProductAttributeMaster from './ProductAttribute/ProductAttributeMaster';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber, validateAlphanumericWithSpaceHyphenPeriod } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onCloseAction, handleAttributeChange, formActionType, isReadOnly = false, formData, isDataAttributeLoaded, attributeData, productHierarchyAttributeData, showProductAttribute, selectedTreeData, setShowProductAttribute, skuAttributes, treeSelectProps, treeCodeId } = props;
    const { isFormBtnActive, setFormBtnActive } = props;
    const { form, setSKUAttributes, fetchListHierarchyAttributeName, listShowLoading, userId, isVisible } = props;

    const [actionForm] = Form.useForm();
    const [openAccordian, setOpenAccordian] = useState(1);
    const [isAddBtnDisabled, setAddBtnDisabled] = useState(false);

    const { onFinish, onFinishFailed } = props;

    const disabledProps = { disabled: isReadOnly };

    const productSKUKey = '63ec10a2-520d-44a4-85f6-f55a1d6911f3';

    console.log('selectedTreeData', selectedTreeData);
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

    const handleProductchange = (e) => {
        const value = e.target.textContent;
    };

    const onActionFormFinish = (val) => {
        const { value, label } = val?.attributeName;
        setSKUAttributes((prev) => [...prev, { attributeName: label, id: value, attributeValue: val.attributeValue }]);
        actionForm.resetFields();
    };

    const attributeFormProps = {
        form,
        skuAttributes: formData?.skuAttributes,
        setSKUAttributes,
        isAddBtnDisabled,
        setAddBtnDisabled,
        onFinish: onActionFormFinish,
        setFormBtnActive,
        productHierarchyAttributeData,
        isVisible,
        selectedTreeData,
        formActionType,
    };

    const productDetailsProps = {
        mainForm: form,
        handleFormValueChange,
        handleFormFieldChange,
        onMainFormFinish: onFinish,
        onFinishFailed,
        formData,
        treeCodeId,
        handleAttributeChange,
        handleProductchange,
        isDataAttributeLoaded,
        disabledProps,
        attributeData,
        treeSelectProps,
        formActionType,
        onCloseAction,
        isFormBtnActive,
        isReadOnly,
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };
    return (
        <>
            <Form form={form} id="myForm" autoComplete="off" layout="vertical" onFinish={onFinish} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item initialValue={formData?.attributeKey} name="attributeKey" label="Attribute Level" rules={[validateRequiredSelectField('attribute level')]}>
                            <Select {...selectProps} onChange={handleAttributeChange} onClick={handleProductchange} loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect('attribute level')} disabled={formData?.id || isReadOnly}>
                                {attributeData?.map((item) => (
                                    <Option key={item?.id} value={item?.id}>
                                        {item?.hierarchyAttribueName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padRight18}>
                        <Form.Item initialValue={treeCodeId} label="Parent" name="parentCode">
                            <TreeSelectField {...treeSelectProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label="Code" name="prodctCode" initialValue={formData?.prodctCode} rules={[validateRequiredInputField('code'), validationFieldLetterAndNumber('code')]}>
                            <Input placeholder={preparePlaceholderText('code')} maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item name="prodctShrtName" label="Short Description" initialValue={formData?.prodctShrtName} rules={[validateRequiredInputField('short description'), validateAlphanumericWithSpaceHyphenPeriod('short description')]}>
                            <Input className={styles.inputBox} placeholder={preparePlaceholderText('short description')} maxLength={50} disabled={formData?.id || isReadOnly} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item name="prodctLongName" label="Long Description" initialValue={formData?.prodctLongName} rules={[validateRequiredInputField('long description'), validateAlphanumericWithSpaceHyphenPeriod('long description')]}>
                            <TextArea rows={1} placeholder={preparePlaceholderText('long description')} showCount maxLength={100} disabled={formData?.id || isReadOnly} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padLeft10}>
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

                <Row gutter={20} className={styles.formFooter}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                        <Button danger onClick={onCloseAction}>
                            Cancel
                        </Button>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                        <Button htmlType="submit" danger form="myForm" disabled={!isFormBtnActive} type="primary">
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
            {/* <ProductDetail {...productDetailsProps} /> */}
            {showProductAttribute && (
                <Collapse className={openAccordian === 1 ? styles.accordianHeader : ''} onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)}>
                    <Panel header={<span className={openAccordian === 1 ? styles.accordianHeader : ''}>Product Atrribute Details</span>} key="1">
                        <ProductAttributeMaster {...attributeFormProps} />
                    </Panel>
                </Collapse>
            )}
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
