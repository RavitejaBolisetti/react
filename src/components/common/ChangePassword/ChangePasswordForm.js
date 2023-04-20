import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Form, Input, Row } from 'antd';
import { bindActionCreators } from 'redux';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { changePasswordActions } from 'store/actions/data/changePassword';
import { showGlobalNotification } from 'store/actions/notification';
import { validateFieldsPassword, validateRequiredInputField } from 'utils/validation';
import { handleErrorModal } from 'utils/responseModal';
import { doLogoutAPI } from 'store/actions/auth';
import { ROUTING_LOGIN } from 'constants/routing';
import { useNavigate } from 'react-router-dom';
import styles from './ChangePassword.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { token, isLoggedIn, userId },

        data: {
            ChangePassword: { isLoading, isLoaded: isDataLoaded = false },
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
            saveData: changePasswordActions.saveData,
            doLogout: doLogoutAPI,
            listShowLoading: changePasswordActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const ChangePasswordBase = ({ form, showGlobalNotification, isOpen = false, onOk = () => {}, title = '', discreption = '', doLogout, saveData, isDataLoaded, listShowLoading, userId }) => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        // form.validateFields().then((values) => {});
        console.log('hello from finish');
        // if (values.errorFields.length === 0) {
            const data = { ...values };
            const onSuccess = (res) => {
                form.resetFields();
                showGlobalNotification({ notificationType: 'success', title: 'Password Changed', message: res?.responseMessage });

                doLogout({
                    onSuccess: (res) => {
                        if (res?.data) {
                            navigate(ROUTING_LOGIN);
                        }
                    },
                    onError,
                    userId,
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
        // }
    };

    const [showPassword, setShowPassword] = useState({ oldPassword: false, newPassword: false, confirmNewPassword: false });

    const onFinishFailed = (values) => {
        console.log('hello');
      
    };

    // const validateToNextPassword = (rule, value) => {
    //     if (form.getFieldValue('confirmNewPassword')) {
    //         form.validateFields(['confirmNewPassword'], { force: true });
    //     } else {
    //         return Promise.resolve();
    //     }
    // };

    // const compareToFirstPassword = (rule, value, callback) => {
    //     if (value && value !== form.getFieldValue('newPassword')) {
    //         callback("New Password and Confirm Password doesn't match!");
    //     } else {
    //         return Promise.resolve();
    //     }
    // };

    const passwordSuffix = (type) => (
        <span onMouseDown={() => setShowPassword({ [type]: true })} onMouseUp={() => setShowPassword({ [type]: false })} onMouseLeave={() => setShowPassword({ [type]: false })}>
            {!showPassword?.[type] ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
        </span>
    );
    return (
        <Form className={styles.changePasswordForm} form={form} name="change_password" layout="vertical" autoComplete="false" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item label="Old Password" name="oldPassword" rules={[validateRequiredInputField('Old Password')]}>
                        <Input type={showPassword?.oldPassword ? 'text' : 'password'} placeholder="Enter old password" suffix={passwordSuffix('oldPassword')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item label="New Password" name="newPassword" rules={[validateRequiredInputField('New Password'), validateFieldsPassword('New Password')]}>
                        <Input type={showPassword?.newPassword ? 'text' : 'password'} placeholder="Enter new password" suffix={passwordSuffix('newPassword')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                        label="Confirm Password"
                        name="confirmNewPassword"
                        dependencies={['newPassword']}
                        rules={[
                            validateRequiredInputField('Confirm Password'),
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input type={showPassword?.confirmNewPassword ? 'text' : 'password'} placeholder="Enter confirm password" suffix={passwordSuffix('confirmNewPassword')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textCenter}>
                    <Button style={{ marginTop: '6px' }} type="primary" htmlType="submit">
                        Change Password
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const ChangePasswordForm = connect(mapStateToProps, mapDispatchToProps)(ChangePasswordBase);
