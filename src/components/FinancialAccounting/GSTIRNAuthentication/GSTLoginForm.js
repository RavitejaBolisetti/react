/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useRef } from 'react';
import { Row, Col, Input, Form, Button, Divider } from 'antd';

import { validateRequiredInputField } from 'utils/validation';
import { FiLock } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'; // AiOutlineWarning

import styles from 'assets/sass/app.module.scss';

export function GSTLoginForm(props) {
    const { onFinish, onFinishFailed } = props;
    const { form, isReadOnly = true } = props;
    // const { formData, typeData,} = props;
    // const disabledProps = { disabled: isReadOnly };
    const userIddRef = useRef(null);
    const passwordInputRef = useRef(null);
    const clientIdInputRef = useRef(null);

    const [showPassword, setShowPassword] = useState(false);

    const [showClientId, setShowClientId] = useState(false);

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
    const handleShowClientId = () => {
        setShowClientId(true);
    };
    const handleHideClientId = () => {
        setShowClientId(false);
    };
    const clientIdSuffix = (
        <span onMouseDown={handleShowClientId} onMouseUp={handleHideClientId} onMouseLeave={handleHideClientId}>
            {!showClientId ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </span>
    );

    const handleFormChange = (field) => (e) => {
        setFieldData({ ...fieldData, [field]: e?.target?.value?.length > 0 ? true : false });
    };

    // const handleFieldFocus = (field) => (e) => {
    //     field?.current.focus();
    // };

    return (
        // <Form form={form} name="login_from" layout="vertical" autocomplete="off" onFinish={onFinish} onFinishFailed={onFinishFailed}>

        <>
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
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.inputLabelPlaceholder}>
                                    <Form.Item name="userId" data-testid="userIdInput" rules={[validateRequiredInputField('user id')]} className={styles.inputBox}>
                                        {<Input data-testid="userNameInput" ref={userIddRef} prefix={<BiUser size={16} />} type="text" maxLength={25} onChange={handleFormChange('userId')} placeholder="UserName" />}
                                    </Form.Item>
                                    {/* {!fieldData?.userId && <label onClick={handleFieldFocus(userIddRef)}>User ID </label>} */}
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.inputLabelPlaceholder}>
                                    <Form.Item name="clientId" data-testid="userIdInput" rules={[validateRequiredInputField('client id')]} className={styles.inputBox}>
                                        <Input data-testid="inputPassword" ref={clientIdInputRef} type={showClientId ? 'text' : 'password'} prefix={<FiLock size={16} />} suffix={clientIdSuffix} onChange={handleFormChange('clientId')} placeholder="Client Secret Id" />
                                    </Form.Item>
                                    {/* {!fieldData?.clientId && <label onClick={handleFieldFocus(clientIdInputRef)}>Client Secret Id</label>} */}
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.inputLabelPlaceholder}>
                                    <Form.Item name="password" data-testid="password" rules={[validateRequiredInputField('password')]} className={styles.inputBox}>
                                        <Input data-testid="inputPassword" ref={passwordInputRef} type={showPassword ? 'text' : 'password'} prefix={<FiLock size={16} />} suffix={passowrdSuffix} onChange={handleFormChange('password')} placeholder="Password" />
                                    </Form.Item>
                                    {/* {!fieldData?.password && <label onClick={handleFieldFocus(passwordInputRef)}>Password</label>} */}
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
        </>
    );
}
