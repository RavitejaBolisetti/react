import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Form, Row, Col, Button, Input } from 'antd';
import { FaKey } from 'react-icons/fa';

import { ROUTING_LOGIN } from 'constants/routing';
import { ROUTING_LOGOUT } from 'constants/routing';

import { doLogoutAPI } from 'store/actions/auth';
import { updatePasswordActions } from 'store/actions/data/updatePassword';
import { bindActionCreators } from 'redux';

import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';

import { validateFieldsPassword, validateRequiredInputField } from 'utils/validation';
import styles from '../Auth.module.css';

import * as IMAGES from 'assets';
import { Link, Navigate } from 'react-router-dom';
import Footer from '../Footer';

const mapStateToProps = (state) => {
    const {
        auth: { token, isLoggedIn, userId },

        data: {
            UpdatePassword: { isLoading, isLoaded: isDataLoaded = false },
        },
    } = state;

    return {
        isDataLoaded,
        token,
        isLoggedIn,
        userId,
        isLoading,
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            saveData: updatePasswordActions.saveData,
            doLogout: doLogoutAPI,
            listShowLoading: updatePasswordActions.listShowLoading,
        },
        dispatch
    ),
});

const UpdatePasswordBase = ({ isOpen = false, onOk = () => {}, onCancel = () => {}, title = '', discreption = '', doLogout, saveData, isDataLoaded, listShowLoading, userId }) => {
    const [form] = Form.useForm();

    const [confirmDirty, setConfirmDirty] = useState(false);

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
                        handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
                        window.location.href = ROUTING_LOGOUT;
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
    console.log('Update Password');

    const handleConfirmBlur = (e) => {
        const value = e.target.value;
        setConfirmDirty(confirmDirty || !!value);
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
                        <Form form={form} name="change_password" autoComplete="false" onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                                                        <Form.Item name="newPassword" rules={[validateRequiredInputField('New password'), validateFieldsPassword('New Password'), { validator: validateToNextPassword }]} className={`${styles.inputBox}`}>
                                                            <Input.Password prefix={<FaKey size={18} />} type="text" allowClear placeholder="Enter new password" visibilityToggle={true} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Form.Item name="confirmPassword" rules={[validateRequiredInputField('New password again'), validateFieldsPassword('Confirm Password'), { validator: compareToFirstPassword }]} className={styles.inputBox}>
                                                            <Input.Password prefix={<FaKey size={18} />} type="text" placeholder="Re-enter new password" onBlur={handleConfirmBlur} visibilityToggle={true} />
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
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <div className={styles.loginFooter} type="radio">
                                                            <Link to={ROUTING_LOGIN}>Back To Login Page</Link>
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
