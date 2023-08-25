/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Input, Form, Button, Divider } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField, } from 'utils/validation';
import { FiLock } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { AiOutlineEyeInvisible, AiOutlineEye, AiOutlineWarning } from 'react-icons/ai';

import styles from 'components/common/Common.module.css';
export function GSTLoginForm(props) {
    const { onFinish, onFinishFailed } = props;
    const { form, formData, typeData, isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };
    const userIdRef = useRef(null);
    const passwordInputRef = useRef(null);
    const clientIdInputRef = useRef(null);

    const [showPassword, setShowPassword] = useState(false);
    const [fieldData, setFieldData] = useState();

    const handleShowPassword = () => {
        setShowPassword(true);
    };
    const handleHidePassword = () => {
        setShowPassword(false);
    };
    const passowrdSuffix = (
        <span onMouseDown={handleShowPassword} onMouseUp={handleHidePassword} onMouseLeave={handleHidePassword}>
            {!showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </span>
    );

    const handleFormChange = (field) => (e) => {
        setFieldData({ ...fieldData, [field]: e?.target?.value?.length > 0 ? true : false });
    };

    const handleFieldFocus = (field) => (e) => {
        field?.current.focus();
    };
    

    return (
        <Form form={form} layout="vertical" autocomplete="off" colon="false" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row>
                <Col span={24}>
                    <div className={styles.loginHtml}>
                        <div className={styles.centerInner}>
                            <div className={styles.loginForm}></div>
                            <div className={styles.loginHeading}>
                                <h1>Login for Authentication</h1>
                                <Divider />
                            </div>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} class="textfieldWithPrefix">
                                    <Form.Item name="userId" class="textfieldWithPrefix__input" data-testid="userIdInput" rules={[validateRequiredInputField('user id')]} className={styles.inputBox}>
                                        {<Input data-testid="userNameInput" ref={userIdRef} prefix={<BiUser size={16} />} type="text" maxLength={25} onChange={handleFormChange('userId')} />}
                                    </Form.Item>
                                    {!fieldData?.userId && (
                                        <label className="textfieldWithPrefix__label" onClick={handleFieldFocus(userIdRef)}>
                                            User Name
                                        </label>
                                    )}
                                </Col>
                            </Row>
                            {/* <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} class="textfieldWithPrefix">
                                    <Form.Item name="userId" class="textfieldWithPrefix__input" data-testid="userIdInput" rules={[validateRequiredInputField('client id')]} className={styles.inputBox}>
                                        {<Input data-testid="userNameInput" ref={userIdRef} prefix={<BiUser size={16} />} type="text" maxLength={50} onChange={handleFormChange('userId')} />}
                                    </Form.Item>
                                    {!fieldData?.userId && (
                                        <label className="textfieldWithPrefix__label" onClick={handleFieldFocus(userIdRef)}>
                                            Client Secret ID
                                        </label>
                                    )}
                                </Col>
                            </Row> */}
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} class="textfieldWithPrefix">
                                    <Form.Item name="clientId" class="textfieldWithPrefix__input" data-testid="clientId" rules={[validateRequiredInputField('clientId')]} className={styles.inputBox}>
                                        <Input data-testid="inputPassword" ref={clientIdInputRef} type={showPassword ? 'text' : 'password'} prefix={<BiUser size={16} />} suffix={passowrdSuffix} onChange={handleFormChange('clientId')} />
                                    </Form.Item>
                                    {!fieldData?.clientId && (
                                        <label className="textfieldWithPrefix__label" onClick={handleFieldFocus(clientIdInputRef)}>
                                            Client Secret ID
                                        </label>
                                    )}
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} class="textfieldWithPrefix">
                                    <Form.Item name="password" class="textfieldWithPrefix__input" data-testid="password" rules={[validateRequiredInputField('password')]} className={styles.inputBox}>
                                        <Input data-testid="inputPassword" ref={passwordInputRef} type={showPassword ? 'text' : 'password'} prefix={<FiLock size={16} />} suffix={passowrdSuffix} onChange={handleFormChange('password')} />
                                    </Form.Item>
                                    {!fieldData?.password && (
                                        <label className="textfieldWithPrefix__label" onClick={handleFieldFocus(passwordInputRef)}>
                                            Password
                                        </label>
                                    )}
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textCenter}>
                                    <Button data-testid="Login" type="primary" htmlType="submit">
                                        Login & Continue
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}
