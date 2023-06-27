/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Input, Form, Col, Row, Button, Select, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, duplicateProductValidator } from 'utils/validation';
import styles from 'components/common/Common.module.css';

function FormProductAttribute(props) {
    const { attributeForm, isVisible, productHierarchyAttributeData, onAttributeFormFinish, formDecider, editForm, finalFormdata } = props;
    const [ changeValue, setChangeValue ] = useState(null);

    const onFinishFailed = (err) => {
        console.error(err);
    };

    const fieldNames = { label: 'attributeCode', value: 'id' };

    const getValues = () => {
        let newFormData = formDecider ? editForm?.getFieldsValue() : attributeForm?.getFieldsValue();
        setChangeValue(newFormData);
    };

    return (
        <Form form={formDecider ? editForm : attributeForm} id="myForm" autoComplete="off" layout="vertical" onFinish={onAttributeFormFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Attribute Name" name="attributeName" initialValue={props?.attributeName} rules={[validateRequiredSelectField('Attribute Name'), { validator: () => duplicateProductValidator(changeValue, finalFormdata, props) }]}>
                        <Select
                            getPopupContainer={(triggerNode) => triggerNode.parentElement}
                            placeholder={preparePlaceholderSelect('attribute name')}
                            style={{
                                width: '100%',
                            }}
                            options={productHierarchyAttributeData}
                            fieldNames={fieldNames}
                            allowClear
                            labelInValue
                            onChange={getValues}
                            key={productHierarchyAttributeData.id}
                        />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item labelAlign="left" name="attributeValue" label="Attribute Value" rules={[validateRequiredInputField('Attribute Value')]} initialValue={props?.attributeValue}>
                        <Input placeholder={preparePlaceholderText('Attribute Value')} className={styles.inputBox} />
                    </Form.Item>
                </Col>

                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item labelAlign="left" name="fromApi" initialValue={props?.fromApi}>
                        <Checkbox value={props?.fromApi} />
                    </Form.Item>
                </Col>

                {isVisible && (
                    <Button icon={<PlusOutlined />} type="primary" danger htmlType="submit" style={{ margin: '0 0 0 12px' }}>
                        Add
                    </Button>
                )}
            </Row>
        </Form>
    );
}

export default FormProductAttribute;
