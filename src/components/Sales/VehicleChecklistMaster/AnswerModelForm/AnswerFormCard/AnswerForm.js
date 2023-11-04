/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Form, Col, Row, Button, Switch } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, noWhiteSpaceinBeginning } from 'utils/validation';
import { translateContent } from 'utils/translateContent';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const AnswerForm = (props) => {
    const { answerForm, onFinishAnswerForm, formEdit, editForm, answerSwitch, setAnswerSwitch, mainFomEdit } = props;

    return (
        <>
            <Form form={formEdit ? editForm : answerForm} id="myForm" autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="answerCode" label={translateContent('vehicleCheckListMaster.label.answerCode')} rules={[validateRequiredInputField(translateContent('vehicleCheckListMaster.label.answerCode')), noWhiteSpaceinBeginning()]}>
                            <Input maxLength={6} placeholder={preparePlaceholderText(translateContent('vehicleCheckListMaster.label.answerCode'))} disabled={mainFomEdit} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="answerTitle" label={translateContent('vehicleCheckListMaster.label.answerDescription')} rules={[validateRequiredInputField(translateContent('vehicleCheckListMaster.label.answerDescription')), noWhiteSpaceinBeginning()]}>
                            <TextArea maxLength={300} placeholder={preparePlaceholderText(translateContent('vehicleCheckListMaster.label.answerDescription'))} disabled={mainFomEdit} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{ marginBottom: '12px' }}>
                        <Row justify="space-between" align="middle">
                            <Form.Item label={translateContent('vehicleCheckListMaster.label.answerStatus')} name="answerStatus" initialValue={answerSwitch}>
                                <Switch value={answerSwitch} onChange={() => setAnswerSwitch(!answerSwitch)} defaultChecked={answerSwitch} disabled={mainFomEdit} checkedChildren={translateContent('vehicleCheckListMaster.label.active')} unCheckedChildren={translateContent('vehicleCheckListMaster.label.inactive')} />
                            </Form.Item>
                            {!props?.internalId && (
                                <Button
                                    disabled={formEdit}
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => {
                                        onFinishAnswerForm();
                                    }}
                                >
                                    {translateContent('global.buttons.add')}
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

export default AnswerForm;
