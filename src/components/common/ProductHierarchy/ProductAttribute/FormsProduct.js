import React from 'react';
import { Input, Form, Col, Row, Switch, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, duplicateValidator, validateRequiredSelectField } from 'utils/validation';

import { preparePlaceholderSelect, preparePlaceholderText, } from 'utils/preparePlaceholder';

const FormsProduct = ({productHierarchyAttributeData, finalFormdata, form, onFinish, status, name, id, isEditing, isBtnDisabled, actions, disableStatus, setIsBtnDisabled }) => {
    const onFinishFailed = (err) => {
        console.error(err);
    };

    const fieldNames = { label: 'attributeCode', value: 'id' };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form form={form} autoComplete="off" id="attributeForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item get label="Attribute Name" name="attributeName" rules={[ validateRequiredSelectField('Attribute Name')]}>
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
                                        // onChange={handleFieldChange}
                                        disabled={isBtnDisabled}
                                    ></Select>
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item labelAlign="left" name="attributeValue" label="Attribute Value"  rules={[!isBtnDisabled && validateRequiredInputField('Attribute Value')]}>
                                    <Input placeholder={preparePlaceholderText('Attribute Value')}  disabled={isBtnDisabled} />
                                </Form.Item>
                            </Col>
                            {!isEditing && (
                                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                    <Button form="attributeForm" disabled={isBtnDisabled} icon={<PlusOutlined />} onClick={onFinish} type="primary" danger>
                                        Add
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default FormsProduct;
