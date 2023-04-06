import React, { Fragment, useState } from 'react';
import { Drawer, Input, Form, Col, Collapse, Card, Row, Switch, Button, Select, Space } from 'antd';
import { DownOutlined, UpOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'pages/common/Common.module.css';

const ApplicationActions = ({ form, footerEdit = false, onFinish = () => {}, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable }) => {
    const disabledProps = { disabled: isReadOnly };

    const handleForm = () => {
        setFormBtnDisable(true);
    };

    const handleAdd = () => {};

    return (
        <Fragment>
            <Form className={styles.contentHeaderBackground} form={form} onFieldsChange={handleForm} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item label="Action" name="ApplicationAction" rules={[validateRequiredInputField('Application Action'), validationFieldLetterAndNumber('Application Action')]}>
                            <Select maxLength={6} placeholder={preparePlaceholderText('Code')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label="Status" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Button icon={<PlusOutlined />} style={{ width: '450px' }} type="primary" danger onClick={handleAdd}>
                        Add Application Action
                    </Button>
                    {/* <Card
                                        style={{
                                            width: 300,
                                        }}
                                    >
                                        <p>Status: Active</p>
                                        <p>Employee Empowerment</p>
                                    </Card> */}
                </Col>
            </Form>
        </Fragment>
    );
};

export default ApplicationActions;
