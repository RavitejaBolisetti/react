/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Input, Form, Col, Row, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, duplicateProductValidator } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
function FormProductAttribute(props) {
    const { attributeForm, isVisible, productHierarchyAttributeData, onAttributeFormFinish, formEdit, editForm, skuAttributes } = props;
    const [changeValue, setChangeValue] = useState(null);

    const fieldNames = { label: 'attributeCode', value: 'id' };

    const onChange = () => {
        let newFormData = formEdit ? editForm?.getFieldsValue() : attributeForm?.getFieldsValue();
        setChangeValue(newFormData);
    };

    return (
        <>
            <Form form={formEdit ? editForm : attributeForm} id="myForm" autoComplete="off" layout="vertical" onFinish={onAttributeFormFinish}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label={translateContent('productHierarchy.label.attributeName')} name="attributeName" initialValue={props?.code} rules={[validateRequiredSelectField(translateContent('productHierarchy.label.attributeName')), { validator: () => duplicateProductValidator(changeValue, skuAttributes) }]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect(translateContent('productHierarchy.placeholder.attributeName'))} options={productHierarchyAttributeData} fieldNames={fieldNames} allowClear labelInValue onChange={onChange} key={productHierarchyAttributeData?.id} value={productHierarchyAttributeData?.attributeCode} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item labelAlign="left" name="value" label={translateContent('productHierarchy.label.attributeValue')} rules={[validateRequiredInputField(translateContent('productHierarchy.label.attributeValue'))]} initialValue={props?.value}>
                            <Input placeholder={preparePlaceholderText(translateContent('productHierarchy.label.attributeValue'))} />
                        </Form.Item>
                    </Col>

                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item name="id" initialValue={props?.id} />
                    </Col>

                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item name="attributeId" initialValue={props?.attributeId} />
                    </Col>

                    {isVisible && (
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB20}>
                            <Button icon={<PlusOutlined />} type="primary" htmlType="submit">
                                {translateContent('global.buttons.add')}
                            </Button>
                        </Col>
                    )}
                </Row>
            </Form>
        </>
    );
}

export default FormProductAttribute;
