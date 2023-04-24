import React, { Fragment, useState } from 'react';
import { Input, Form, Col, Card, Row, Switch, Button, Select, Divider, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';
const { Option } = Select;

const applicationData = [
    {
        id: '1',
        applicationName: 'APP nm 1',
    },
    {
        id: '2',
        applicationName: 'APP nm 2',
    },
    {
        id: '3',
        applicationName: 'APP nm 3',
    },
];

const fieldNames = { label: 'applicationName', value: 'id' };

const ProductHierarchyActions = ({ form, onFinish, status, name, id, value, isEditing, isBtnDisabled, skuData }) => {
    const onFinishFailed = (err) => {
        console.error(err);
    };

    const handleForm = (value) => {
        // setFormBtnDisable(true);
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form form={form} onFieldsChange={handleForm} id="productHierarchy" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item get label="Attribute Name" name="attributeName" rules={[validateRequiredSelectField('Attribute Name')]}>
                                    <Select
                                        getPopupContainer={(triggerNode) => triggerNode.parentElement}
                                        placeholder="Select Application Action"
                                        style={{
                                            width: '100%',
                                        }}
                                        allowClear
                                        options={applicationData}
                                        fieldNames={fieldNames}
                                        initialValue={id}
                                    >
                                        {skuData?.map((item) => (
                                            <Option value={item?.code}>{item?.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={value} labelAlign="left" name="attributeValue" label="Attribute Value" rules={[validateRequiredSelectField('Attribute Value')]}>
                                    <Input placeholder={preparePlaceholderText('Attribute Value')} className={styles.inputBox} />
                                </Form.Item>
                            </Col>
                            {!isEditing && (
                                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                    <Button disabled={isBtnDisabled} icon={<PlusOutlined />} htmlType="submit" type="primary" danger>
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

export default ProductHierarchyActions;