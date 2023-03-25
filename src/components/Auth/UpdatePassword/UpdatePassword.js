import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Form, Row, Col, Button, Input, notification } from 'antd';
import { FiLock } from 'react-icons/fi';

import { doLogoutAPI, authPostLogin } from 'store/actions/auth';
import { updatePasswordActions } from 'store/actions/data/updatePassword';
import { bindActionCreators } from 'redux';

import { validateFieldsPassword, validateRequiredInputField } from 'utils/validation';
import styles from '../Auth.module.css';

import * as IMAGES from 'assets';
import { ROUTING_LOGIN } from 'constants/routing';
import Footer from '../Footer';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

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
        },
        dispatch
    ),
});

const UpdatePasswordBase = ({ preLoginData, authPostLogin, isOpen = false, onOk = () => {}, onCancel = () => {}, title = '', discreption = '', doLogout, saveData, isDataLoaded, listShowLoading, userId, isTrue = true }) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [confirmDirty, setConfirmDirty] = useState(false);
    const [alertNotification, contextAlertNotification] = notification.useNotification();

    const canSkip = preLoginData?.passwordStatus?.status === 'A';

    useEffect(() => {
        if (!preLoginData) {
            navigate(ROUTING_LOGIN);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preLoginData]);

    const onFinish = (errorInfo) => {
        // form.validateFields().then((values) => {});
    };

    const onFinishFailed = (values) => {
        if (values.errorFields.length === 0) {
            const data = { ...values.values };
            const onSuccess = (res) => {
                form.resetFields();
                doLogout({
                    successAction: () => {
                        informationModalBox({ icon: 'success', message: 'SUCCESS', description: res?.responseMessage, className: styles.success });
                        navigate(ROUTING_LOGIN);
                    },
                });
            };

            const onError = (message) => {
                informationModalBox({ description: message });
            };

            const requestData = {
                data: data,
                setIsLoading: listShowLoading,
                userId,
                token: preLoginData?.idToken,
                accessToken: preLoginData?.accessToken,
                onSuccess,
                onError,
            };

            saveData(requestData);
        }
    };

    const validateToNextPassword = (rule, value, callback) => {
        if (value && confirmDirty) {
            form.validateFields(['confirmNewPassword'], { force: true });
        }
        callback();
    };

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('newPassword')) {
            callback("New Password and Confirm Password doesn't match!");
        } else {
            callback();
        }
    };

    const handleConfirmBlur = (e) => {
        const value = e.target.value;
        setConfirmDirty(confirmDirty || !!value);
    };

    const handleSkipNow = () => {
        authPostLogin(preLoginData);
    };

    const informationModalBox = ({ icon = 'error', message = 'Information', description, className = styles.error }) => {
        alertNotification.open({
            icon: icon === 'error' ? <AiOutlineCloseCircle /> : <AiOutlineCheckCircle />,
            message,
            description,
            className,
            duration: 5,
        });
    };

    return (
        <>
            {contextAlertNotification}
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
                        <Form form={form} name="update_password" layout="vertical" autoComplete="false" onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                                                        <Form.Item name="oldPassword" rules={[validateRequiredInputField('Old password')]} className={`${styles.inputBox}`}>
                                                            <Input.Password prefix={<FiLock size={18} />} type="text" placeholder="Old password" visibilityToggle={true} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Form.Item name="newPassword" rules={[validateRequiredInputField('New password'), validateFieldsPassword('New Password'), { validator: validateToNextPassword }]} className={`${styles.inputBox}`}>
                                                            <Input.Password prefix={<FiLock size={18} />} type="text" allowClear placeholder="New password" visibilityToggle={true} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Form.Item name="confirmNewPassword" rules={[validateRequiredInputField('Confirm password'), validateFieldsPassword('Confirm Password'), { validator: compareToFirstPassword }]} className={styles.inputBox}>
                                                            <Input.Password prefix={<FiLock size={18} />} type="text" allowClear placeholder="Confirm password" onBlur={handleConfirmBlur} visibilityToggle={true} />
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
                                                            {canSkip ? <span onClick={handleSkipNow}>Skip For Now</span> : <Link to={ROUTING_LOGIN}>Back To Login</Link>}
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
