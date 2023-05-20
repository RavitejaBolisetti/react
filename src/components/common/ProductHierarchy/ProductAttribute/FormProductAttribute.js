import React from 'react';
import { Input, Form, Col, Row, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, duplicateValidator } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';

function FormProductAttribute(props) {
    const {  attributeForm, isVisible, productHierarchyAttributeData, onAttributeFormFinish, formDecider, editForm } = props;

    const onFinishFailed = (err) => {
        console.error(err);
    };

    const fieldNames = { label: 'attributeCode', value: 'id' };
    
    return (
        <Form form={formDecider ? editForm : attributeForm} id="myForm" autoComplete="off" layout="vertical" onFinish={onAttributeFormFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Attribute Name" name="attributeName" rules={[validateRequiredSelectField('Attribute Name'),{ validator: (rule, value) =>
                     duplicateValidator(value, 'attributeName', props?.label, 'attributeName',) }]} initialValue={props?.attributeName}>
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
                        ></Select>
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        labelAlign="left"
                        name="attributeValue"
                        label="Attribute Value"
                        rules={[validateRequiredInputField('Attribute Value')]}
                        initialValue={props?.attributeValue}
                    >
                        <Input placeholder={preparePlaceholderText('Attribute Value')} className={styles.inputBox} />
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
