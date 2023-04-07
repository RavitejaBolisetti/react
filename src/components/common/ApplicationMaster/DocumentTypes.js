import React, { Fragment, useState } from 'react';
import { Input, Form, Col, Card, Row, Switch, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import style from 'components/common/DrawerAndTable.module.css';
import CardDocumentType from './CardDocumentType';

const DocumentTypes = ({ footerEdit = false, onFinish = () => {}, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable }) => {
    const [docData, setDocData] = useState([]);
    const disabledProps = { disabled: isReadOnly };

    const [form] = Form.useForm();

    const handleAdd = (value) => {
        setDocData(prev => [...prev, value]);
        form.resetFields();
    };

    return (
        <Fragment>
            <Form form={form} id="myForm" layout="vertical" onFinish={handleAdd} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Code" name="docCode" rules={[validateRequiredInputField('Application Code'), validationFieldLetterAndNumber('Application Code')]}>
                            {!footerEdit ? <Input maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} /> : <p className={style.viewModeText}>{form.getFieldValue('ApplicationName')}</p>}
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Document Name" name="documentName" rules={[validateRequiredInputField('Document Name'), validationFieldLetterAndNumber('Document Name')]}>
                            {!footerEdit ? <Input maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} /> : <p className={style.viewModeText}>{form.getFieldValue('ApplicationName')}</p>}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="tncReq" label="T&C Required" valuePropName="checked">
                            <Switch checkedChildren="Yes" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="signatureReq" label="Digital Signature Required" valuePropName="checked">
                            <Switch style={{}} checkedChildren="Yes" unCheckedChildren="Inactive" valuePropName="checked" {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
                <Button icon={<PlusOutlined />} style={{ width: '450px' }} type="primary" danger htmlType='submit'>
                    Add Application Action
                </Button>
            </Form>

            {/* document type added cards */}
            {
                docData.length ? 
                docData.map(doc => {
                    return (
                        <CardDocumentType {...doc} form={form}/>
                    )
                })
                :''
            }
        </Fragment>
    );
};

export default DocumentTypes;
