/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Form, Col, Row, Switch, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { duplicateValidator, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from './../ApplicationMaster.module.scss';
import { translateContent } from 'utils/translateContent';

const ApplicationActionsForm = ({ finalFormdata, form, onFinish, isEditing, isBtnDisabled, actions, disableStatus, onFieldsChange }) => {
    const onFinishFailed = (err) => {
        console.error(err);
    };

    const fieldNames = { label: 'actionName', value: 'id' };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="applicationActionsForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item label={translateContent('applicationMaster.label.action')} name="applicationName" rules={[validateRequiredSelectField(translateContent('applicationMaster.validation.applicationAction')), { validator: (rule, value) => duplicateValidator(value?.label, 'actionName', finalFormdata?.applicationAction) }]}>
                                    <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} labelInValue placeholder={preparePlaceholderSelect(translateContent('applicationMaster.placeholder.applicationAction'))} fieldNames={fieldNames} options={actions?.filter((el) => el?.actionName)} disabled={isBtnDisabled || disableStatus} allowClear />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item onClick={(e) => e.stopPropagation()} initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label={translateContent('global.label.status')} valuePropName="checked">
                                    <Switch disabled={isBtnDisabled} checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" />
                                </Form.Item>
                            </Col>
                        </Row>
                        {!isEditing && (
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB20}>
                                    <Button form="applicationActionsForm" disabled={isBtnDisabled} icon={<PlusOutlined />} htmlType="submit" type="primary">
                                        {translateContent('global.buttons.add')}
                                    </Button>
                                </Col>
                            </Row>
                        )}
                        <Form.Item name="id" hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item name="actionMasterId" hidden>
                            <Input />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ApplicationActionsForm;
