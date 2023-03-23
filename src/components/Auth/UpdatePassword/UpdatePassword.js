import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Form, Row, Col, Button, Input } from 'antd';
import { FiLock } from 'react-icons/fi';

import { ROUTING_DASHBOARD, ROUTING_LOGIN } from 'constants/routing';

import { doLogoutAPI } from 'store/actions/auth';
import { updatePasswordActions } from 'store/actions/data/updatePassword';
import { bindActionCreators } from 'redux';

import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';

import { validateFieldsPassword, validateRequiredInputField } from 'utils/validation';
import styles from '../Auth.module.css';

import * as IMAGES from 'assets';
import { Link } from 'react-router-dom';
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

const UpdatePasswordBase = ({ isOpen = false, onOk = () => {}, onCancel = () => {}, title = '', discreption = '', doLogout, saveData, isDataLoaded, listShowLoading, userId, isTrue = true }) => {
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

    const validateToNextPassword = (rule, value, callback) => {
        if (value && confirmDirty) {
            form.validateFields(['confirmNewPassword'], { force: true });
        }
        callback();
    };

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('Password you entered is not matched!');
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
                        <Form form={form} name="update_password" autoComplete="false" onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                                                        <Form.Item name="confirmPassword" rules={[validateRequiredInputField('Confirm password'), validateFieldsPassword('Confirm Password'), { validator: compareToFirstPassword }]} className={styles.inputBox}>
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
                                                            {isTrue ? <Link to={ROUTING_LOGIN}>Back To Login</Link> : <Link to={ROUTING_DASHBOARD}>Skip For Now</Link>}
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

// export const UpdatePassword = connect(mapStateToProps, mapDispatchToProps)(UpdatePasswordBase);
export const UpdatePassword = connect()(UpdatePasswordBase);
