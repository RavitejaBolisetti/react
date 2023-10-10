/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Form, Col, Row, Button, Switch } from 'antd';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { PlusOutlined } from '@ant-design/icons';
import { customSelectBox } from 'utils/customSelectBox';

const ModelForm = (props) => {
    const { modelForm, onFinishModelForm, modelEdit, modelEditForm, modelSwitch, setModelSwitch, mainFomEdit, modelGroupData } = props;

    return (
        <>
            <Form form={modelEdit ? modelEditForm : modelForm} id="myForm" autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item label="Model Group Code" name="modelGroupCode" rules={[validateRequiredSelectField('Model Group Code')]}>
                            {customSelectBox({ disabled: mainFomEdit, data: modelGroupData, fieldNames: { key: 'modelGroupCode', value: 'modelGroupDescription' }, placeholder: preparePlaceholderSelect('model group code') })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{ marginBottom: '12px' }}>
                        <Row justify="space-between" align="middle">
                            <Form.Item label="Model Group Status" name="checklistModelStatus" initialValue={modelSwitch}>
                                <Switch value={modelSwitch} onChange={() => setModelSwitch(!modelSwitch)} defaultChecked={modelSwitch} disabled={mainFomEdit} checkedChildren="Active" unCheckedChildren="Inactive" />
                            </Form.Item>
                            {!props?.internalId && (
                                <Button
                                    disabled={modelEdit}
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => {
                                        onFinishModelForm();
                                    }}
                                >
                                    Add
                                </Button>
                            )}
                        </Row>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item name="internalId" label="Internal Id" />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item name="id" label="Id" />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default ModelForm;
