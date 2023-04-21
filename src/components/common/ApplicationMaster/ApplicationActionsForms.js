import React, { useState } from 'react';
import { Input, Form, Col, Row, Switch, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { duplicateValidator, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

const ApplicationActionsForm = ({ finalFormdata, form, onFinish, status, name, id, isEditing, isBtnDisabled, actions,disableStatus, setIsBtnDisabled }) => {
    const onFinishFailed = (err) => {
        console.error(err);
    };

    const handleForm = (value) => {
        // setFormBtnDisable(true);
    };

    const fieldNames = { label: 'actionName', value: 'id' };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form form={form} onFieldsChange={handleForm} id="applicationActionsForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item label="Action" name="applicationName" rules={[validateRequiredSelectField('Application Action'), { validator: (rule, value) => duplicateValidator(value?.label, 'actionName', finalFormdata?.applicationAction)   }]}>  
                                    <Select
                                        getPopupContainer={(triggerNode) => triggerNode.parentElement}
                                        labelInValue
                                        placeholder={preparePlaceholderSelect('Application Action')}
                                        fieldNames={fieldNames}
                                        style={{
                                            width: '100%',
                                        }}
                                        options={actions?.filter((el) => el?.actionName)}
                                        disabled={isBtnDisabled || disableStatus}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label="Status" valuePropName="checked">
                                    <Switch disabled={isBtnDisabled} checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" />
                                </Form.Item>
                            </Col>
                            {!isEditing && (
                                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                    <Button form="applicationActionsForm" disabled={isBtnDisabled} icon={<PlusOutlined />} htmlType="submit" type="primary" danger>
                                        Add
                                    </Button>
                                </Col>
                            )}
                            <Form.Item name='id' hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item name='actionMasterId' hidden>
                                <Input />
                            </Form.Item>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ApplicationActionsForm;
