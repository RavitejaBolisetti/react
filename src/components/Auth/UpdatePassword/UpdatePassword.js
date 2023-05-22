import React, { useEffect, useState } from 'react';
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
import { preparePlaceholderText } from 'utils/preparePlaceholder';

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
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Form.Item name="oldPassword" rules={[validateRequiredInputField('old password')]} className={`${styles.inputBox}`}>
                                                            <Input prefix={<FiLock size={18} />} type={showPassword?.oldPassword ? 'text' : 'password'} placeholder={preparePlaceholderText('Old password*', false)} visibilityToggle={true} suffix={passwordSuffix('oldPassword')} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Form.Item name="newPassword" rules={[validateRequiredInputField('new password')]} className={`${styles.changer} ${styles.inputBox}`}>
                                                            <Input onChange={(e) => setPassword(e.target.value)} prefix={<FiLock size={18} />} type={showPassword?.newPassword ? 'text' : 'password'} placeholder={preparePlaceholderText('New password*', false)} suffix={passwordSuffix('newPassword')} onFocus={() => setTooltipVisible(true)} onBlur={() => setTooltipVisible(false)} />
                                                        </Form.Item>
                                                        <PasswordStrengthMeter password={password} beforeLogin={true} tooltipVisible={tooltipVisible} />
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Form.Item
                                                            name="confirmNewPassword"
                                                            dependencies={['newPassword']}
                                                            rules={[
                                                                validateRequiredInputField('confirm password'),
                                                                ({ getFieldValue }) => ({
                                                                    validator(_, value) {
                                                                        if (!value || getFieldValue('newPassword') === value) {
                                                                            return Promise.resolve();
                                                                        }
                                                                        return Promise.reject(new Error("New Password and Confirm Password don't match!"));
                                                                    },
                                                                }),
                                                            ]}
                                                            className={styles.inputBox}
                                                        >
                                                            <Input prefix={<FiLock size={18} />} type={showPassword?.confirmNewPassword ? 'text' : 'password'} placeholder="Confirm password*" suffix={passwordSuffix('confirmNewPassword')} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>

                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Button className={styles.button} type="primary" htmlType="submit">
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
