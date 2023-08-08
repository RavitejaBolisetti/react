/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Input, Form, Col, Row, Button, Select, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, duplicateProductValidator } from 'utils/validation';

function FormProductAttributeComp(props) {
    const { attributeForm, isVisible, productHierarchyAttributeData, onAttributeFormFinish, formEdit, editForm, skuAttributes } = props;
    const [changeValue, setChangeValue] = useState(null);

    const onFinishFailed = (err) => {
        console.error(err);
    };

    const fieldNames = { label: 'attributeCode', value: 'id' };

    const onChange = (val) => {
        let newFormData = formEdit ? editForm?.getFieldsValue() : attributeForm?.getFieldsValue();
        setChangeValue(newFormData);
    };

    return (
        <>
            <Divider />
            <Form form={formEdit ? editForm : attributeForm} id="myForm" autoComplete="off" layout="vertical" onFinish={onAttributeFormFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Attribute Name" name="attributeName" initialValue={props?.code} rules={[validateRequiredSelectField('Attribute Name'), { validator: () => duplicateProductValidator(changeValue, skuAttributes) }]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('attribute name')} options={productHierarchyAttributeData} fieldNames={fieldNames} allowClear labelInValue onChange={onChange} key={productHierarchyAttributeData?.id} value={productHierarchyAttributeData?.attributeCode} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item labelAlign="left" name="value" label="Attribute Value" rules={[validateRequiredInputField('Attribute Value')]} initialValue={props?.value}>
                            <Input placeholder={preparePlaceholderText('Attribute Value')} />
                        </Form.Item>
                    </Col>

                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item name="id" initialValue={props?.id} />
                    </Col>

                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item name="attributeId" initialValue={props?.attributeId} />
                    </Col>

                    {isVisible && (
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Button icon={<PlusOutlined />} type="primary" htmlType="submit">
                                Add
                            </Button>
                        </Col>
                    )}
                </Row>
            </Form>
        </>
    );
}

export const FormProductAttribute = FormProductAttributeComp;
