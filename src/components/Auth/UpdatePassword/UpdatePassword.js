import React, { useEffect, useState } from 'react';

import { Form, Row, Col, Button, Input, Checkbox } from 'antd';
import { FaKey, FaInfoCircle, FaTimes } from 'react-icons/fa';
// import { BiUser } from 'react-icons/bi';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { ROUTING_LOGIN } from 'constants/routing';

import { validateFieldsPassword, validateRequiredInputField } from 'utils/validation';
import styles from '../Auth.module.css';

import * as IMAGES from 'assets';
import { Link, Navigate } from 'react-router-dom';
import Footer from '../Footer';

const UpdatePassword = (doLogin,saveData,handleSuccessModal,handleErrorModal,listShowLoading,userId) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [confirmDirty, setConfirmDirty] = useState(false);

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

    const onFinish = (values) => {
        form.validateFields().then((values) => {
            Navigate(ROUTING_LOGIN);
        });
    };
    const handleConfirmBlur = (e) => {
        const value = e.target.value;
        setConfirmDirty(confirmDirty || !!value);
    };

    const onFinishFailed = (values) => {
        if (values.errorFields.length === 0) {
            const data = { ...values.values };
            const onSuccess = (res) => {
                form.resetFields();
                doLogin({
                    successAction: () => {
                        handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
                        window.location.href = ROUTING_LOGIN;
                    },
                });
            };

            const onError = (message) => {
                handleErrorModal(message);
            };

            const requestData = {
                data: data,
                setIsLoading: listShowLoading,
                userId,
                onSuccess,
                onError,
            };

            saveData(requestData);
        }
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
                        <Form form={form} name="login_from" autoComplete="false" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <Row>
                                <Col span={24}>
                                    <div className={styles.loginHtml}>
                                        <div className={styles.centerInner}>
                                            <div className={styles.loginForm}>
                                                <div className={styles.loginHeading}>
                                                    <h1>Update Your Password!</h1>
                                                    <div className={styles.loginSubHeading}>Please create a new password as your password has been expired.</div>
                                                </div>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Form.Item name="oldPassword" rules={[validateRequiredInputField('Old password')]} className={`${styles.inputBox}`}>
                                                            <Input.Password prefix={<FaKey size={18} />} type="text" placeholder="Enter old password" visibilityToggle={true} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Form.Item name="newPassword" rules={[validateRequiredInputField('New password'),validateFieldsPassword('New Password'),{validator: validateToNextPassword}]} className={`${styles.inputBox}`}>
                                                            <Input.Password prefix={<FaKey size={18} />} type="text"  allowClear placeholder="Enter new password" visibilityToggle={true} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Form.Item name="confirmPassword" rules={[validateRequiredInputField('New password again'),validateFieldsPassword('Confirm Password'),{validator: compareToFirstPassword}]} className={styles.inputBox}>
                                                            <Input.Password prefix={<FaKey size={18} />} type="text" placeholder="Re-enter new password"  onBlur={handleConfirmBlur} visibilityToggle={true} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>

                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        {/* <Link to={ROUTING_LOGIN}> */}
                                                        <Button className={styles.button} type="primary" htmlType="submit">
                                                            Submit
                                                        </Button>
                                                        {/* </Link> */}
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

export default UpdatePassword;
