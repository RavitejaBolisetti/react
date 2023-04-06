import React, { Fragment, useState } from 'react';
import { Drawer, Input, Form, Col, Collapse, Card, Row, Switch, Button, Select, Space } from 'antd';
import { DownOutlined, UpOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import style from 'components/common/DrawerAndTable.module.css';

const DocumentTypes = ({ form, footerEdit = false, onFinish = () => {}, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable }) => {
    const disabledProps = { disabled: isReadOnly };

    const handleAdd = () => {};

    return (
        <Fragment>
            <Form form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Code" name="ApplicationCode" rules={[validateRequiredInputField('Application Code'), validationFieldLetterAndNumber('Application Code')]}>
                            {!footerEdit ? <Input maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} /> : <p className={style.viewModeText}>{form.getFieldValue('ApplicationName')}</p>}
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Document Name" name="DocumentName" rules={[validateRequiredInputField('Document Name'), validationFieldLetterAndNumber('Document Name')]}>
                            {!footerEdit ? <Input maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} /> : <p className={style.viewModeText}>{form.getFieldValue('ApplicationName')}</p>}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="doc" label="T&C Required" valuePropName="checked">
                            <Switch checkedChildren="Yes" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label="Digital Signature Required" valuePropName="checked">
                            <Switch style={{}} checkedChildren="Yes" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
                <Button icon={<PlusOutlined />} style={{ width: '450px' }} type="primary" danger onClick={handleAdd}>
                    Add Application Action
                </Button>
            </Form>
        </Fragment>
    );
};

export default DocumentTypes;
