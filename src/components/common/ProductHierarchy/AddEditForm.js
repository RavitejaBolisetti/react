import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Collapse, Select, Switch, Button } from 'antd';
import { withDrawer } from 'components/withDrawer';
import style from '../../common/DrawerAndTable.module.css';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';
import ProductAttributeAddEditForm from './ProductAttributeDetail/ProductAttributeAddEditForm';
import ListProductAttribute from './ProductAttributeDetail/ListProductAttribute';

import styles from 'components/common/Common.module.css';
import TreeSelectField from '../TreeSelectField';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber,validateAlphanumericWithSpaceHyphenPeriod } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onCloseAction, handleAttributeChange, formActionType, fieldNames, isReadOnly = false, formData, isDataAttributeLoaded, attributeData, productHierarchyData } = props;
    const { selectedTreeKey, setSelectedTreeKey, selectedTreeSelectKey, setSelectedTreeSelectKey, handleSelectTreeClick, flatternData } = props;
    const { isFormBtnActive, setFormBtnActive } = props;
    const { form, skuAttributes, setSKUAttributes } = props;

    console.log('formData', formData);
    const [actionForm] = Form.useForm();
    const [openAccordian, setOpenAccordian] = useState(1);
    const [isAddBtnDisabled, setAddBtnDisabled] = useState(false);
    const [showProductAttribute, setShowProductAttribute] = useState(true);

    const { onFinish, onFinishFailed } = props;

    const treeFieldNames = { ...fieldNames, label: fieldNames?.title, value: fieldNames?.key };

    const disabledProps = { disabled: isReadOnly };

    let treeCodeId = '';
    let treeCodeReadOnly = false;

    if (formActionType === FROM_ACTION_TYPE.EDIT) {
        treeCodeId = formData?.parntProdctId;
    } else if (formActionType === FROM_ACTION_TYPE.CHILD) {
        treeCodeId = selectedTreeKey && selectedTreeKey[0];
        treeCodeReadOnly = true;
    } else if (formActionType === FROM_ACTION_TYPE.SIBLING) {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        treeCodeId = treeCodeData && treeCodeData?.data?.parntProdctId;
    }

    useEffect(() => {
        setSelectedTreeSelectKey(treeCodeId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeCodeId]);

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: productHierarchyData,
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
    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleProductchange = (e) => {
        const value = e.target.textContent;
        setShowProductAttribute(value);
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
    };

    return (
        <>
            <Form autoComplete="off" form={form} layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item initialValue={formData?.attributeKey} name="attributeKey" label="Attribute Level" rules={[validateRequiredSelectField('attribute level')]}>
                            <Select onChange={handleAttributeChange} onClick={handleProductchange} loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect('attribute level')} {...disabledProps} showSearch allowClear>
                                {attributeData?.map((item) => (
                                    <Option value={item?.id}>{item?.hierarchyAttribueName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padRight18}>
                        <Form.Item initialValue={treeCodeId} label="Parent" name="parntProdctId">
                            <TreeSelectField {...treeSelectFieldProps} />
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
                        <Form.Item name="prodctShrtName" label="Short Description" initialValue={formData?.prodctShrtName} rules={[validateRequiredInputField('short description'),validateAlphanumericWithSpaceHyphenPeriod('short description')]}>
                            <Input className={styles.inputBox} placeholder={preparePlaceholderText('short description')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item name="prodctLongName" label="Long Description" initialValue={formData?.prodctLongName} rules={[validateRequiredInputField('long description'),validateAlphanumericWithSpaceHyphenPeriod('long description')]}>
                            <TextArea rows={2} placeholder={preparePlaceholderText('long description')} showCount maxLength={100} {...disabledProps} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padLeft10}>
                        <Form.Item initialValue={formActionType === 'child' || formActionType === 'sibling' ? true : formData?.active ? true : false} label="Status" name="active">
                            <Switch value={formActionType === 'child' || formActionType === 'sibling' ? true : formData?.active ? true : false} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={formActionType === 'child' || formActionType === 'sibling' ? true : formData?.active === true || null || undefined ? true : false} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20} className={styles.formFooter}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                        <Button danger onClick={onCloseAction}>
                            Cancel
                        </Button>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                        <Button htmlType="submit" danger type="primary" disabled={!isFormBtnActive}>
                            Save
                        </Button>
                    </Col>
                </Row>

                {showProductAttribute ? (
                    <Collapse className={openAccordian === 1 ? style.accordianHeader : ''} onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)}>
                        <Panel header={<span className={openAccordian === 1 ? style.accordianHeader : ''}>Product Atrribute Details</span>} key="1">
                            <ProductAttributeAddEditForm {...attributeFormProps} />
                            <ListProductAttribute {...attributeFormProps} />
                        </Panel>
                    </Collapse>
                ) : null}
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
