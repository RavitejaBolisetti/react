/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, Button, Divider } from 'antd';

import { validateRequiredInputField } from 'utils/validation';
import { FiLock } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'; // AiOutlineWarning

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export function GSTLoginForm(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showClientId, setShowClientId] = useState(false);
    const [showSecretId, setShowSecretId] = useState(false);
    const [fieldData, setFieldData] = useState();

    const handleShowPassword = () => {
        setShowPassword(true);
    };
    const handleHidePassword = () => {
        setShowPassword(false);
    };
    const passowrdSuffix = (
        <span onMouseDown={handleShowPassword} onMouseUp={handleHidePassword} onMouseLeave={handleHidePassword} data-testid="password-id-icon">
            {!showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </span>
    );
    const handleShowClientId = () => {
        setShowClientId(true);
    };
    const handleHideClientId = () => {
        setShowClientId(false);
    };
    const handleShowSecretId = () => {
        setShowSecretId(true);
    };
    const handleHideSecretId = () => {
        setShowSecretId(false);
    };
    const clientIdSuffix = (
        <span onMouseDown={handleShowClientId} onMouseUp={handleHideClientId} onMouseLeave={handleHideClientId} data-testid="clint-id-icon">
            {!showClientId ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </span>
    );
    const secretIdSuffix = (
        <span onMouseDown={handleShowSecretId} onMouseUp={handleHideSecretId} onMouseLeave={handleHideSecretId} data-testid="secret-id-icon">
            {!showSecretId ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </span>
    );

    const handleFormChange = (field) => (e) => {
        setFieldData({ ...fieldData, [field]: e?.target?.value?.length > 0 ? true : false });
    };

    return (
        <>
            <Row>
                <Col span={24}>
                    <div className={styles.loginHtml}>
                        <div className={styles.centerInner}>
                            <div className={styles.loginForm}></div>
                            <div className={styles.loginHeading}>
                                <h1>{translateContent('gstIRNAuthentication.text.Login')}</h1>
                                <Divider />
                            </div>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.inputLabelPlaceholder}>
                                    <Form.Item name="userName" data-testid="userName" rules={[validateRequiredInputField(translateContent('gstIRNAuthentication.validation.userName'))]} className={styles.inputBox}>
                                        {<Input data-testid="userNameInput" prefix={<BiUser size={16} />} type="text" maxLength={25} onChange={handleFormChange('userName')} placeholder={translateContent('gstIRNAuthentication.placeholder.userName')} />}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.inputLabelPlaceholder}>
                                    <Form.Item name="clientId" data-testid="clientId" rules={[validateRequiredInputField(translateContent('gstIRNAuthentication.validation.clientId'))]} className={styles.inputBox}>
                                        <Input data-testid="clientIdInput" type={showClientId ? translateContent('gstIRNAuthentication.label.text') : translateContent('gstIRNAuthentication.label.password')} prefix={<BiUser size={16} />} suffix={clientIdSuffix} onChange={handleFormChange('clientId')} placeholder={translateContent('gstIRNAuthentication.placeholder.clientId')} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.inputLabelPlaceholder}>
                                    <Form.Item name="secretId" data-testid="secretId" rules={[validateRequiredInputField(translateContent('gstIRNAuthentication.validation.secretId'))]} className={styles.inputBox}>
                                        <Input data-testid="secretIdInput" type={showSecretId ? translateContent('gstIRNAuthentication.label.text') : translateContent('gstIRNAuthentication.label.password')} prefix={<BiUser size={16} />} suffix={secretIdSuffix} onChange={handleFormChange('secretId')} placeholder={translateContent('gstIRNAuthentication.placeholder.secretId')} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.inputLabelPlaceholder}>
                                    <Form.Item name="password" data-testid="password" rules={[validateRequiredInputField(translateContent('gstIRNAuthentication.validation.password'))]} className={styles.inputBox}>
                                        <Input data-testid="passwordInput" type={showPassword ? translateContent('gstIRNAuthentication.label.text') : translateContent('gstIRNAuthentication.label.password')} prefix={<FiLock size={16} />} suffix={passowrdSuffix} onChange={handleFormChange('password')} placeholder={translateContent('gstIRNAuthentication.placeholder.password')} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textCenter}>
                                    <Button data-testid="Login" type="primary" htmlType="submit">
                                        {translateContent('gstIRNAuthentication.label.Login&Continue')}
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}
