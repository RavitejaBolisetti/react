import React, { Fragment, useState } from 'react';
import { Input, Form, Col, Card, Row, Switch, Button, Select, Divider, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const applicationData = [
    {
        id: 'c5dae87b-6118-4228-8711-f08414050521',
        applicationName: 'Tharr',
    },
];
const fieldNames = { label: 'applicationName', value: 'id' };

const ProductAttributeAddEditForm = ({ form, onFinish, status, name, id, canAdd = true, canEdit = false, isAddBtnDisabled, skuData, setSKUAttributes, setAddBtnDisabled }) => {
    const handleFieldChange = () => {
        const attributeName = form.getFieldValue('attributeName');
        const attributeValue = form.getFieldValue('attributeValue');
        setAddBtnDisabled(!(attributeName || attributeValue));
    };
    const handleAddProductBtn = () => {
        const attributeName = form.getFieldValue('attributeName');
        const attributeValue = form.getFieldValue('attributeValue');

        if (!attributeName) {
            form.validateFields(['attributeName'], { force: true });
        }

        if (!attributeValue) {
            form.validateFields(['attributeValue'], { force: true });
        }

        if (attributeName && attributeValue) {
            setSKUAttributes((prev) => [...prev, { code: attributeName?.label, adPhProductAttributeMstId: attributeName?.value, value: attributeValue }]);
            form.setFieldsValue({ attributeName: undefined, attributeValue: '' });
            setAddBtnDisabled(true);
        }
    };
    return (
        <Row gutter={20}>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item get label="Attribute Name" name="attributeName" rules={[validateRequiredSelectField('Attribute Name')]}>
                    <Select
                        getPopupContainer={(triggerNode) => triggerNode.parentElement}
                        placeholder={preparePlaceholderSelect('attribute name')}
                        style={{
                            width: '100%',
                        }}
                        options={applicationData}
                        fieldNames={fieldNames}
                        allowClear
                        labelInValue
                        onChange={handleFieldChange}
                    ></Select>
                </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item labelAlign="left" name="attributeValue" label="Attribute Value" onChange={handleFieldChange} rules={[validateRequiredInputField('Attribute Value')]}>
                    <Input placeholder={preparePlaceholderText('Attribute Value')} className={styles.inputBox} />
                </Form.Item>
            </Col>

            {canAdd && (
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Button onClick={handleAddProductBtn} disabled={isAddBtnDisabled} icon={<PlusOutlined />} type="primary" danger>
                        Add
                    </Button>
                </Col>
            )}
        </Row>
    );
};

export default ProductAttributeAddEditForm;
