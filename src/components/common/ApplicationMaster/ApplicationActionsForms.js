import React, { Fragment, useState } from 'react';
import { Input, Form, Col, Card, Row, Switch, Button, Select, Divider, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import CardApplicationAction from './CardApplicationAction';
import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'pages/common/Common.module.css';

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

const ApplicationActionsForm = ({ form, onFinish, status, name, id, isEditing }) => {

    const onFinishFailed = (err) => {
        console.error(err);
    };

    const handleForm = (value) => {
        // setFormBtnDisable(true);
    };

    const fieldNames = { label: 'applicationName', value: 'id' };

    return (
        <>
            <Row style={{ marginTop: '20px' }} gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form form={form} onFieldsChange={handleForm} id="applicationAction" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item label="Action" name="applicationAction" rules={[validateRequiredSelectField('Application Action')]}>
                                    <Select
                                        labelInValue
                                        // defaultValue={name || ''}
                                        showSearch
                                        placeholder="Select Application Action"
                                        optionFilterProp="children"
                                        fieldNames={fieldNames}
                                        style={{
                                            width: '100%',
                                        }}
                                        filterOption={(input, option) => (option?.applicationName ?? '').toLowerCase().includes(input.toLowerCase())}
                                        options={applicationData}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label="Status" valuePropName="checked">
                                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" />
                                </Form.Item>
                            </Col>
                            { !isEditing && (
                                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                    <Button disabled={isEditing} icon={<PlusOutlined />} htmlType="submit" type="primary" danger>
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

export default ApplicationActionsForm;
