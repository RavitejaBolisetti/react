/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Input } from 'antd';
import { FiLock } from 'react-icons/fi';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { doLogoutAPI, authPostLogin } from 'store/actions/auth';
import { updatePasswordActions } from 'store/actions/data/updatePassword';
import { showGlobalNotification } from 'store/actions/notification';
import { bindActionCreators } from 'redux';
import { validateRequiredInputField } from 'utils/validation';
import styles from '../Auth.module.css';
import * as IMAGES from 'assets';
import { ROUTING_LOGIN } from 'constants/routing';
import Footer from '../Footer';
import { PasswordStrengthMeter } from 'utils/PasswordStrengthMeter';

const mapStateToProps = (state) => {
    const {
        auth: { token, isLoggedIn, userId, preLoginData },
    } = state;

    return {
        token,
        isLoggedIn,
        userId,
        preLoginData,
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            saveData: updatePasswordActions.saveData,
            doLogout: doLogoutAPI,
            listShowLoading: updatePasswordActions.listShowLoading,
            authPostLogin,
            showGlobalNotification,
        },
        dispatch
    ),
});

const UpdatePasswordBase = ({ showGlobalNotification, preLoginData, authPostLogin, isOpen = false, onOk = () => {}, onCancel = () => {}, title = '', discreption = '', doLogout, saveData, isDataLoaded, listShowLoading, userId, isTrue = true }) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const canSkip = preLoginData?.passwordStatus?.status === 'A';
    const [showPassword, setShowPassword] = useState({ oldPassword: false, newPassword: false, confirmNewPassword: false });
    const [password, setPassword] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const [fieldData, setFieldData] = useState();

    const oldPasswordInput = useRef(null);
    const newPasswordInput = useRef(null);
    const confirmPasswordInput = useRef(null);

    useEffect(() => {
        if (!preLoginData) {
            navigate(ROUTING_LOGIN);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preLoginData]);

    const onFinish = (values) => {
        const onError = (message) => {
            showGlobalNotification({ message: message[0] });
        };

        const onSuccess = (res) => {
            if (res) {
                form.resetFields();
                showGlobalNotification({ notificationType: 'successBeforeLogin', title: 'Password Updated', message: res?.responseMessage });
                navigate(ROUTING_LOGIN);
            }
        };

        const requestData = {
            data: values,
            setIsLoading: listShowLoading,
            userId,
            token: preLoginData?.idToken,
            accessToken: preLoginData?.accessToken,
            onSuccess,
            onError,
        };

        saveData(requestData);
    };

    const handleSkipNow = () => {
        authPostLogin(preLoginData);
    };

    const passwordSuffix = (type) => (
        <span onMouseDown={() => setShowPassword({ [type]: true })} onMouseUp={() => setShowPassword({ [type]: false })} onMouseLeave={() => setShowPassword({ [type]: false })}>
            {!showPassword?.[type] ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
        </span>
    );

    const handleFormChange = (field) => (e) => {
        setFieldData({ ...fieldData, [field]: e?.target?.value?.length > 0 ? true : false });
    };

    const handleFieldFocus = (field) => (e) => {
        field?.current.focus();
    };

    const handleNewPasswordChange = (e) => {
        setPassword(e.target.value);
        setFieldData({ ...fieldData, newPassword: e?.target?.value?.length > 0 ? true : false });
    };
    return (
        <>
            <div className={styles.loginSection}>
                <div className={styles.loginMnMlogo}>
                    <img src={IMAGES.MAH_WHITE_LOGO} alt="" />
                </div>
                <div className={styles.center}>
                    <div className={styles.loginLogoSection}>
                        <img src={IMAGES.RL_LOGO} className={styles.mainLogo} alt="" />
                        <br></br>
                        <img src={IMAGES.LINE} className={styles.mainLogoLine} alt="" />
                        <div className={styles.logoText}>Dealer Management System</div>
                    </div>
                    <div className={styles.loginWrap}>
                        <Form form={form} name="update_password" layout="vertical" autoComplete="false" onFinish={onFinish}>
                            <Row>
                                <Col span={24}>
                                    <div className={styles.loginHtml}>
                                        <div className={styles.centerInner}>
                                            <div className={styles.loginForm}>
                                                <div className={styles.loginHeading}>
                                                    <h1>Update Your Password</h1>
                                                    <div className={styles.loginSubHeading}></div>
                                                </div>
                                                {/* className={`${styles.inputBox}`} */}
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className="textfieldWithPrefix">
                                                        <Form.Item name="oldPassword" className="textfieldWithPrefix__input" rules={[validateRequiredInputField('old password', false)]}>
                                                            <Input data-testid="oldPasswordInput" type={showPassword?.oldPassword ? 'text' : 'password'} ref={oldPasswordInput} prefix={<FiLock size={18} />} onChange={handleFormChange('oldPassword')} suffix={passwordSuffix('oldPassword')} />
                                                        </Form.Item>
                                                        {!fieldData?.oldPassword && (
                                                            <label className="textfieldWithPrefix__label" onClick={handleFieldFocus(oldPasswordInput)}>
                                                                Old password
                                                            </label>
                                                        )}
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className="textfieldWithPrefix">
                                                        <Form.Item name="newPassword" className="textfieldWithPrefix__input" rules={[validateRequiredInputField('new password')]}>
                                                            <Input data-testid="newPasswordInput" onChange={handleNewPasswordChange} type={showPassword?.newPassword ? 'text' : 'password'} ref={newPasswordInput} prefix={<FiLock size={18} />} suffix={passwordSuffix('newPassword')} onFocus={() => setTooltipVisible(true)} onBlur={() => setTooltipVisible(false)} />
                                                        </Form.Item>
                                                        {!fieldData?.newPassword && (
                                                            <label className="textfieldWithPrefix__label" onClick={handleFieldFocus(newPasswordInput)}>
                                                                New password
                                                            </label>
                                                        )}
                                                        {password && <PasswordStrengthMeter password={password} beforeLogin={true} tooltipVisible={tooltipVisible} />}
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className="textfieldWithPrefix">
                                                        <Form.Item
                                                            name="confirmNewPassword"
                                                            dependencies={['newPassword']}
                                                            className="textfieldWithPrefix__input"
                                                            rules={[
                                                                validateRequiredInputField('confirm password', false),
                                                                ({ getFieldValue }) => ({
                                                                    validator(_, value) {
                                                                        if (!value || getFieldValue('newPassword') === value) {
                                                                            return Promise.resolve();
                                                                        }
                                                                        return Promise.reject(new Error("New Password and confirm Password doesn't match!"));
                                                                    },
                                                                }),
                                                            ]}
                                                        >
                                                            <Input data-testid="confirmNewPasswordInput" type={showPassword?.confirmNewPassword ? 'text' : 'password'} ref={confirmPasswordInput} prefix={<FiLock size={18} />} onChange={handleFormChange('confirmNewPassword')} suffix={passwordSuffix('confirmNewPassword')} />
                                                        </Form.Item>
                                                        {!fieldData?.confirmNewPassword && (
                                                            <label className="textfieldWithPrefix__label" onClick={handleFieldFocus(confirmPasswordInput)}>
                                                                Confirm password
                                                            </label>
                                                        )}
                                                    </Col>
                                                </Row>

                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Button data-testid="updatePassword" className={styles.button} type="primary" htmlType="submit">
                                                            Update Password
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <div className={styles.loginFooter} type="radio">
                                                            {canSkip ? (
                                                                <span className={styles.cursorPointer} onClick={handleSkipNow}>
                                                                    Skip For Now
                                                                </span>
                                                            ) : (
                                                                <Link to={ROUTING_LOGIN}>Back To Login</Link>
                                                            )}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export const UpdatePassword = connect(mapStateToProps, mapDispatchToProps)(UpdatePasswordBase);
